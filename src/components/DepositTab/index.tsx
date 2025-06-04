'use client';

import { useState } from 'react';
import { useAccount, useBalance, useWriteContract, useSwitchChain } from 'wagmi';
import { parseEther, formatEther } from 'viem';
import { CONTRACTS, CHAIN_CONFIG, type ChainKey } from '@/constants';

interface DepositTabProps {
  fromChain: ChainKey;
  setFromChain: (chain: ChainKey) => void;
}

export default function DepositTab({ fromChain, setFromChain }: DepositTabProps) {
  const [depositAmount, setDepositAmount] = useState('');

  const { address, chain } = useAccount();
  const { switchChain } = useSwitchChain();

  // Use the wagmi hook properly
  const {
    data: hash,
    isPending: isLoading,
    error,
    writeContract
  } = useWriteContract({
    mutation: {
      onSuccess: (data) => {
        console.log('✅ Deposit transaction submitted successfully!');
        console.log('📝 Transaction hash:', data);
        // Clear the deposit amount after successful submission
        setDepositAmount('');
      },
      onError: (error) => {
        console.error('❌ Deposit failed:', error);
        // Simple error handling without complex property access
        alert(`Deposit failed: ${String(error)}`);
      }
    }
  });

  // Get ETH balance for gas
  const { data: ethBalance } = useBalance({
    address: address,
  });

  const handleMaxDepositAmount = () => {
    if (ethBalance) {
      // Leave some ETH for gas fees (0.005 ETH - smaller reserve)
      const maxDeposit = ethBalance.value - parseEther('0.005');
      if (maxDeposit > BigInt(0)) {
        setDepositAmount(formatEther(maxDeposit));
      } else {
        setDepositAmount('0');
      }
    }
  };

  const handleDeposit = async () => {
    console.log('🔍 Deposit button clicked!');

    if (!address || !depositAmount) {
      console.log('❌ Missing address or deposit amount');
      return;
    }

    // Only allow deposits on Sepolia since Arbitrum doesn't have a vault
    if (fromChain !== 'sepolia') {
      console.error('Deposits are only available on Sepolia');
      return;
    }

    try {
      // Switch to Sepolia if needed
      if (chain?.id !== CHAIN_CONFIG[fromChain].id) {
        console.log('🔄 Switching to Sepolia...');
        await switchChain({ chainId: CHAIN_CONFIG[fromChain].id });
        await new Promise(resolve => setTimeout(resolve, 1000));
      }

      const amountWei = parseEther(depositAmount);
      console.log('💰 Depositing:', depositAmount, 'ETH');

      // Simple contract call
      writeContract({
        address: '0xe72D410E445A432B09d0d2978b53d09b2b43A7ba',
        abi: CONTRACTS.sepolia.vault.abi,
        functionName: 'deposit',
        value: amountWei,
      });

    } catch (error) {
      console.error('❌ Setup failed:', error);
      alert(`Setup failed: ${error}`);
    }
  };

  return (
    <div className="space-y-6">
      <div className="bg-blue-900/20 border border-blue-500/30 rounded-lg p-4">
        <h3 className="text-blue-300 font-medium mb-2">💰 Step 1: Get Rebase Tokens</h3>
        <p className="text-gray-300 text-sm">
          Deposit ETH into the vault to mint rebase tokens. These tokens earn interest over time!
        </p>
      </div>

      {/* Chain Selection for Deposit */}
      <div>
        <label className="block text-white text-sm font-medium mb-2">Chain</label>
        <select
          className="w-full p-3 bg-gray-700 text-white rounded-lg border border-gray-600 focus:border-blue-500 focus:outline-none"
          value={fromChain}
          onChange={(e) => setFromChain(e.target.value as ChainKey)}
        >
          <option value="sepolia">Sepolia</option>
          <option value="arbitrumSepolia">Arbitrum Sepolia</option>
        </select>
        {fromChain === 'arbitrumSepolia' && (
          <p className="text-yellow-400 text-sm mt-1">
            ⚠️ Deposits are only available on Sepolia. Switch to Sepolia to deposit ETH.
          </p>
        )}
      </div>

      {/* ETH Amount Input */}
      <div>
        <div className="flex justify-between items-center mb-2">
          <label className="text-white text-sm font-medium">ETH Amount</label>
          <button
            onClick={handleMaxDepositAmount}
            className="text-blue-400 hover:text-blue-300 text-sm"
            disabled={fromChain === 'arbitrumSepolia'}
          >
            Max
          </button>
        </div>
        <input
          type="number"
          className="w-full p-3 bg-gray-700 text-white rounded-lg border border-gray-600 focus:border-blue-500 focus:outline-none disabled:bg-gray-600 disabled:cursor-not-allowed"
          placeholder="0.0 ETH"
          value={depositAmount}
          onChange={(e) => {
            console.log('Input changed to:', e.target.value);
            setDepositAmount(e.target.value);
          }}
          disabled={fromChain === 'arbitrumSepolia'}
        />

        <p className="text-gray-400 text-xs mt-1">
          You&apos;ll receive {depositAmount || '0'} rebase tokens (1:1 ratio)
        </p>
      </div>

      {/* Debug Info */}
      <div className="bg-yellow-900/20 border border-yellow-500/30 rounded-lg p-3">
        <h4 className="text-yellow-300 font-medium mb-2">🐛 Button State Debug:</h4>
        <div className="text-xs text-gray-300 space-y-1">
          <p>Deposit Amount: "{depositAmount}" (empty: {!depositAmount ? 'YES' : 'NO'})</p>
          <p>Is Loading: {isLoading ? 'YES' : 'NO'}</p>
          <p>From Chain: {fromChain}</p>
          <p>Is Arbitrum: {fromChain === 'arbitrumSepolia' ? 'YES' : 'NO'}</p>
          <p>Address: {address ? 'Connected' : 'Not connected'}</p>
          <p>Button Disabled: {(!depositAmount || isLoading || fromChain === 'arbitrumSepolia') ? 'YES' : 'NO'}</p>
          <p>Transaction Hash: {hash || 'None'}</p>
          <p>Error: {error ? error.message : 'None'}</p>
        </div>
      </div>

      <button
        onClick={(e) => {
          console.log('🔍 Button clicked - raw event');
          console.log('Event:', e);
          console.log('Button disabled?', !depositAmount || isLoading || fromChain === 'arbitrumSepolia');
          console.log('Calling handleDeposit...');
          handleDeposit();
        }}
        disabled={!depositAmount || isLoading || fromChain === 'arbitrumSepolia'}
        className="w-full p-3 bg-green-600 hover:bg-green-700 disabled:bg-gray-600 disabled:cursor-not-allowed text-white rounded-lg transition-colors font-medium"
      >
        {isLoading ? 'Processing...' : fromChain === 'arbitrumSepolia' ? 'Deposits only available on Sepolia' : `Deposit ${depositAmount || '0'} ETH`}
      </button>
    </div>
  );
} 