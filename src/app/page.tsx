'use client';

import { useState } from 'react';
import { useAccount } from 'wagmi';
import { type ChainKey } from '@/constants';
import WalletInfo from '@/components/WalletInfo';
import DepositTab from '@/components/DepositTab';
import BridgeTab from '@/components/BridgeTab';
import Header from '@/components/Header';
import InfoSection from '@/components/InfoSection';

export default function Home() {
  const [fromChain, setFromChain] = useState<ChainKey>('sepolia');
  const [toChain, setToChain] = useState<ChainKey>('arbitrumSepolia');
  const [activeTab, setActiveTab] = useState<'deposit' | 'bridge'>('deposit');

  const { isConnected } = useAccount();

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 flex items-center justify-center p-4">
      <div className="bg-gray-800 rounded-2xl shadow-2xl p-8 w-full max-w-md border border-gray-700">
        {/* Header */}
        <Header />

        {/* Wallet Connection */}
        <WalletInfo fromChain={fromChain} />

        {isConnected && (
          <>
            {/* Tab Navigation */}
            <div className="flex mb-6 bg-gray-700 rounded-lg p-1">
              <button
                onClick={() => setActiveTab('deposit')}
                className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors ${
                  activeTab === 'deposit'
                    ? 'bg-blue-600 text-white'
                    : 'text-gray-300 hover:text-white'
                }`}
              >
                1. Deposit ETH
              </button>
              <button
                onClick={() => setActiveTab('bridge')}
                className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors ${
                  activeTab === 'bridge'
                    ? 'bg-blue-600 text-white'
                    : 'text-gray-300 hover:text-white'
                }`}
              >
                2. Bridge Tokens
              </button>
            </div>

            {/* Tab Content */}
            {activeTab === 'deposit' && (
              <DepositTab 
                fromChain={fromChain} 
                setFromChain={setFromChain} 
              />
            )}

            {activeTab === 'bridge' && (
              <BridgeTab 
                fromChain={fromChain} 
                setFromChain={setFromChain}
                toChain={toChain}
                setToChain={setToChain}
              />
            )}

            {/* Info */}
            <InfoSection />
          </>
        )}
      </div>
    </div>
  );
}
