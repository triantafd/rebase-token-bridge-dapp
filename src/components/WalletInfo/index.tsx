'use client';

import { useAccount, useConnect, useDisconnect, useBalance, useReadContract } from 'wagmi';
import { formatEther } from 'viem';
import { CONTRACTS, type ChainKey } from '@/constants';

interface WalletInfoProps {
  fromChain: ChainKey;
}

export default function WalletInfo({ fromChain }: WalletInfoProps) {
  const { address, isConnected, chain } = useAccount();
  const { connect, connectors } = useConnect();
  const { disconnect } = useDisconnect();

  // Get token balance
  const { data: tokenBalance, error: tokenBalanceError } = useReadContract({
    address: CONTRACTS[fromChain].rebaseToken.address as `0x${string}`,
    abi: CONTRACTS[fromChain].rebaseToken.abi,
    functionName: 'balanceOf',
    args: [address],
    query: { enabled: !!address },
  });

  // Get LINK balance
  const { data: linkBalance } = useReadContract({
    address: CONTRACTS[fromChain].linkToken.address as `0x${string}`,
    abi: CONTRACTS[fromChain].linkToken.abi,
    functionName: 'balanceOf',
    args: [address],
    query: { enabled: !!address },
  });

  // Get ETH balance for gas
  const { data: ethBalance } = useBalance({
    address: address,
  });

  if (!isConnected) {
    return (
      <div className="space-y-4 mb-8">
        <h2 className="text-lg font-semibold text-white">Connect Wallet</h2>
        {connectors.map((connector) => (
          <button
            key={connector.uid}
            onClick={() => connect({ connector })}
            className="w-full p-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
          >
            Connect {connector.name}
          </button>
        ))}
      </div>
    );
  }

  return (
    <div className="bg-gray-700 rounded-lg p-4 mb-6">
      <div className="flex justify-between items-center mb-2">
        <span className="text-gray-300">Connected:</span>
        <button
          onClick={() => disconnect()}
          className="text-red-400 hover:text-red-300 text-sm"
        >
          Disconnect
        </button>
      </div>
      <p className="text-white font-mono text-sm">
        {address?.slice(0, 6)}...{address?.slice(-4)}
      </p>
      <p className="text-gray-400 text-sm">
        Chain: {chain?.name || 'Unknown'}
      </p>
      {ethBalance && (
        <p className="text-gray-400 text-sm">
          ETH: {parseFloat(formatEther(ethBalance.value)).toFixed(4)}
        </p>
      )}
      {tokenBalance ? (
        <p className="text-green-400 text-sm">
          RBT: {parseFloat(formatEther(tokenBalance as bigint)).toFixed(4)}
        </p>
      ) : tokenBalanceError ? (
        <p className="text-red-400 text-sm">
          RBT: No tokens found
        </p>
      ) : (
        <p className="text-gray-400 text-sm">
          RBT: 0
        </p>
      )}
      {linkBalance ? (
        <p className="text-gray-400 text-sm">
          LINK: {parseFloat(formatEther(linkBalance as bigint)).toFixed(4)}
        </p>
      ) : null}
    </div>
  );
} 