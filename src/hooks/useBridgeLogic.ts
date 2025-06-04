'use client';

import { useState } from 'react';
import { useAccount, useReadContract, useWriteContract, useSwitchChain } from 'wagmi';
import { parseEther, formatEther, createPublicClient, http, encodeAbiParameters } from 'viem';
import { sepolia, arbitrumSepolia } from 'wagmi/chains';
import { CONTRACTS, CHAIN_CONFIG, type ChainKey } from '@/constants';

export function useBridgeLogic(fromChain: ChainKey, toChain: ChainKey) {
    const [bridgeAmount, setBridgeAmount] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [currentStep, setCurrentStep] = useState('');
    const [estimatedFee, setEstimatedFee] = useState<string>('');
    const [isLoadingFee, setIsLoadingFee] = useState(false);

    const { address, chain } = useAccount();
    const { switchChain } = useSwitchChain();
    const { writeContract } = useWriteContract();

    // Contract reads
    const { data: tokenBalance, error: tokenBalanceError } = useReadContract({
        address: CONTRACTS[fromChain].rebaseToken.address as `0x${string}`,
        abi: CONTRACTS[fromChain].rebaseToken.abi,
        functionName: 'balanceOf',
        args: [address],
        query: { enabled: !!address },
    });

    const { data: linkBalance } = useReadContract({
        address: CONTRACTS[fromChain].linkToken.address as `0x${string}`,
        abi: CONTRACTS[fromChain].linkToken.abi,
        functionName: 'balanceOf',
        args: [address],
        query: { enabled: !!address },
    });

    const { data: tokenApproval } = useReadContract({
        address: CONTRACTS[fromChain].rebaseToken.address as `0x${string}`,
        abi: CONTRACTS[fromChain].rebaseToken.abi,
        functionName: 'allowance',
        args: [address, CONTRACTS[fromChain].ccipRouter.address],
        query: { enabled: !!address && !!bridgeAmount },
    });

    const { data: linkApproval } = useReadContract({
        address: CONTRACTS[fromChain].linkToken.address as `0x${string}`,
        abi: CONTRACTS[fromChain].linkToken.abi,
        functionName: 'allowance',
        args: [address, CONTRACTS[fromChain].ccipRouter.address],
        query: { enabled: !!address },
    });

    const handleMaxBridgeAmount = () => {
        if (tokenBalance) {
            try {
                const formattedAmount = formatEther(tokenBalance as bigint);
                setBridgeAmount(formattedAmount);
            } catch (error) {
                console.error('Error formatting token balance:', error);
                setBridgeAmount('0');
            }
        } else {
            setBridgeAmount('0');
        }
    };

    const previewFee = async () => {
        if (!address || !bridgeAmount) return;

        setIsLoadingFee(true);
        try {
            const amountWei = parseEther(bridgeAmount);
            const destinationChainSelector = CHAIN_CONFIG[toChain].ccipChainSelector;

            // Correct CCIP message structure according to Chainlink docs
            const ccipMessage = {
                receiver: encodeAbiParameters([{ type: 'address' }], [address]), // Proper ABI encoding
                data: '0x',
                tokenAmounts: [{
                    token: CONTRACTS[fromChain].rebaseToken.address,
                    amount: amountWei
                }],
                feeToken: CONTRACTS[fromChain].linkToken.address,
                extraArgs: '0x' // Use default gas limit (200k)
            };

            const publicClient = createPublicClient({
                chain: fromChain === 'sepolia' ? sepolia : arbitrumSepolia,
                transport: http(),
            });

            const fee = await publicClient.readContract({
                address: CONTRACTS[fromChain].ccipRouter.address as `0x${string}`,
                abi: CONTRACTS[fromChain].ccipRouter.abi,
                functionName: 'getFee',
                args: [destinationChainSelector, ccipMessage],
            });
            console.log('💰 Fee:', fee, formatEther(fee as bigint));
            setEstimatedFee(formatEther(fee as bigint));
        } catch (error) {
            console.error('Fee estimation failed:', error);
            setEstimatedFee('');
        } finally {
            setIsLoadingFee(false);
        }
    };

    // Step functions for better flow control - each step waits for previous to complete
    const executeTokenApproval = async (amountWei: bigint): Promise<void> => {
        return new Promise((resolve, reject) => {
            setCurrentStep('Step 1/3: Approving tokens...');
            writeContract({
                address: CONTRACTS[fromChain].rebaseToken.address as `0x${string}`,
                abi: CONTRACTS[fromChain].rebaseToken.abi,
                functionName: 'approve',
                args: [CONTRACTS[fromChain].ccipRouter.address, amountWei],
            }, {
                onSuccess: (hash) => {
                    console.log('✅ Token approval transaction submitted:', hash);
                    setCurrentStep('Step 1/3: Waiting for token approval confirmation...');
                    // Wait longer for blockchain confirmation before proceeding
                    setTimeout(() => {
                        console.log('✅ Token approval confirmed, proceeding to LINK approval');
                        resolve();
                    }, 3000);
                },
                onError: (error) => {
                    console.error('❌ Token approval failed:', error);
                    reject(new Error(`Token approval failed: ${error}`));
                }
            });
        });
    };

    const executeLinkApproval = async (fee: bigint): Promise<void> => {
        return new Promise((resolve, reject) => {
            setCurrentStep('Step 2/3: Approving LINK for fees...');
            writeContract({
                address: CONTRACTS[fromChain].linkToken.address as `0x${string}`,
                abi: CONTRACTS[fromChain].linkToken.abi,
                functionName: 'approve',
                args: [CONTRACTS[fromChain].ccipRouter.address, fee],
            }, {
                onSuccess: (hash) => {
                    console.log('✅ LINK approval transaction submitted:', hash);
                    setCurrentStep('Step 2/3: Waiting for LINK approval confirmation...');
                    // Wait longer for blockchain confirmation before proceeding
                    setTimeout(() => {
                        console.log('✅ LINK approval confirmed, proceeding to bridge execution');
                        resolve();
                    }, 3000);
                },
                onError: (error) => {
                    console.error('❌ LINK approval failed:', error);
                    reject(new Error(`LINK approval failed: ${error}`));
                }
            });
        });
    };

    const executeBridgeTransaction = async (destinationChainSelector: string, ccipMessage: any): Promise<string> => {
        return new Promise((resolve, reject) => {
            setCurrentStep('Step 3/3: Executing bridge transaction...');
            writeContract({
                address: CONTRACTS[fromChain].ccipRouter.address as `0x${string}`,
                abi: CONTRACTS[fromChain].ccipRouter.abi,
                functionName: 'ccipSend',
                args: [destinationChainSelector, ccipMessage],
                value: BigInt(0),
            }, {
                onSuccess: (hash) => {
                    console.log('✅ Bridge transaction submitted:', hash);
                    console.log(`🔗 View on Sepolia Etherscan: https://sepolia.etherscan.io/tx/${hash}`);
                    resolve(hash);
                },
                onError: (error) => {
                    console.error('❌ Bridge transaction failed:', error);
                    reject(new Error(`Bridge transaction failed: ${error}`));
                }
            });
        });
    };

    const handleBridge = async () => {
        if (!address || !bridgeAmount) return;

        setIsLoading(true);
        setCurrentStep('Preparing...');

        try {
            // Switch chain if needed
            if (chain?.id !== CHAIN_CONFIG[fromChain].id) {
                setCurrentStep('Switching chain...');
                await switchChain({ chainId: CHAIN_CONFIG[fromChain].id });
                await new Promise(resolve => setTimeout(resolve, 1000));
            }

            const amountWei = parseEther(bridgeAmount);
            const destinationChainSelector = CHAIN_CONFIG[toChain].ccipChainSelector;

            // Correct CCIP message structure according to Chainlink docs
            const ccipMessage = {
                receiver: encodeAbiParameters([{ type: 'address' }], [address]), // Proper ABI encoding
                data: '0x',
                tokenAmounts: [{
                    token: CONTRACTS[fromChain].rebaseToken.address,
                    amount: amountWei
                }],
                feeToken: CONTRACTS[fromChain].linkToken.address,
                extraArgs: '0x' // Use default gas limit (200k)
            };

            // Calculate fees
            setCurrentStep('Calculating fees...');
            const publicClient = createPublicClient({
                chain: fromChain === 'sepolia' ? sepolia : arbitrumSepolia,
                transport: http(),
            });

            const fee = await publicClient.readContract({
                address: CONTRACTS[fromChain].ccipRouter.address as `0x${string}`,
                abi: CONTRACTS[fromChain].ccipRouter.abi,
                functionName: 'getFee',
                args: [destinationChainSelector, ccipMessage],
            });

            // SEQUENTIAL EXECUTION - Each step waits for previous to complete

            // Step 1: Token approval (MUST complete before step 2)
            const needsTokenApproval = !tokenApproval || (tokenApproval as bigint) < amountWei;
            if (needsTokenApproval) {
                console.log('🔄 Starting token approval...');
                await executeTokenApproval(amountWei);
                console.log('✅ Token approval completed, moving to LINK approval');
            } else {
                console.log('✅ Token already approved, skipping to LINK approval');
            }

            // Step 2: LINK approval (MUST complete before step 3)
            const needsLinkApproval = !linkApproval || (linkApproval as bigint) < (fee as bigint);
            if (needsLinkApproval) {
                console.log('🔄 Starting LINK approval...');
                await executeLinkApproval(fee as bigint);
                console.log('✅ LINK approval completed, moving to bridge execution');
            } else {
                console.log('✅ LINK already approved, skipping to bridge execution');
            }

            // Step 3: Execute bridge (Only after both approvals are confirmed)
            console.log('🔄 Starting bridge execution...');
            const bridgeHash = await executeBridgeTransaction(destinationChainSelector, ccipMessage);
            console.log('✅ Bridge execution completed');

            // Success flow
            setCurrentStep('✅ Bridge completed successfully!');
            console.log('🎉 Bridge completed successfully!');
            alert(`Bridge transaction submitted successfully!\n\nTransaction Hash: ${bridgeHash}\n\nView on Etherscan: https://sepolia.etherscan.io/tx/${bridgeHash}`);
            setBridgeAmount('');

        } catch (error: any) {
            console.error('❌ Bridge process failed:', error);
            setCurrentStep(`❌ Failed: ${error.message || error}`);
            alert(`Bridge failed: ${error.message || error}`);
        } finally {
            setIsLoading(false);
            setTimeout(() => setCurrentStep(''), 3000);
        }
    };

    return {
        bridgeAmount,
        setBridgeAmount,
        isLoading,
        currentStep,
        estimatedFee,
        isLoadingFee,
        tokenBalance,
        tokenBalanceError,
        handleMaxBridgeAmount,
        previewFee,
        handleBridge
    };
}