'use client';

import { formatEther } from 'viem';
import { type ChainKey } from '@/constants';

interface ChainSelectorProps {
  fromChain: ChainKey;
  setFromChain: (chain: ChainKey) => void;
  toChain: ChainKey;
  setToChain: (chain: ChainKey) => void;
  tokenBalance?: bigint;
  tokenBalanceError?: Error | null;
}

export default function ChainSelector({
  fromChain,
  setFromChain,
  toChain,
  setToChain,
  tokenBalance,
  tokenBalanceError
}: ChainSelectorProps) {
  const handleSwapChains = () => {
    setFromChain(toChain);
    setToChain(fromChain);
  };

  return (
    <div className="space-y-4">
      <div>
        <label className="block text-white text-sm font-medium mb-2">From</label>
        <select
          className="w-full p-3 bg-gray-700 text-white rounded-lg border border-gray-600 focus:border-blue-500 focus:outline-none"
          value={fromChain}
          onChange={(e) => setFromChain(e.target.value as ChainKey)}
        >
          <option value="sepolia">Sepolia</option>
          <option value="arbitrumSepolia">Arbitrum Sepolia</option>
        </select>
        {tokenBalance ? (
          <p className="text-green-400 text-sm mt-1">
            Available: {parseFloat(formatEther(tokenBalance as bigint)).toFixed(4)} RBT
          </p>
        ) : tokenBalanceError ? (
          <p className="text-red-400 text-sm mt-1">
            ⚠️ No tokens found
          </p>
        ) : (
          <p className="text-gray-400 text-sm mt-1">
            Available: 0 RBT
          </p>
        )}
      </div>

      <div className="flex justify-center">
        <button
          onClick={handleSwapChains}
          className="p-2 bg-gray-700 hover:bg-gray-600 rounded-full transition-colors"
          title="Swap chains"
        >
          <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16V4m0 0L3 8m4-4l4 4m6 0v12m0 0l4-4m-4 4l-4-4" />
          </svg>
        </button>
      </div>

      <div>
        <label className="block text-white text-sm font-medium mb-2">To</label>
        <select
          className="w-full p-3 bg-gray-700 text-white rounded-lg border border-gray-600 focus:border-blue-500 focus:outline-none"
          value={toChain}
          onChange={(e) => setToChain(e.target.value as ChainKey)}
        >
          <option value="sepolia">Sepolia</option>
          <option value="arbitrumSepolia">Arbitrum Sepolia</option>
        </select>
      </div>
    </div>
  );
}