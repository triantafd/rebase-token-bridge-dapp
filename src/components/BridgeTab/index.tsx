'use client';

import { type ChainKey } from '@/constants';
import { useBridgeLogic } from '@/hooks/useBridgeLogic';

import TokenAmountInput from './subComponents/TokenAmountInput';
import FeeEstimator from './subComponents/FeeEstimator';
import BridgeProgress from './subComponents/BridgeProgress';
import BridgeButton from './subComponents/BridgeButton';
import BridgeInfo from './subComponents/BridgeInfo';
import ChainSelector from './subComponents/ChainSelector';

interface BridgeTabProps {
  fromChain: ChainKey;
  setFromChain: (chain: ChainKey) => void;
  toChain: ChainKey;
  setToChain: (chain: ChainKey) => void;
}

export default function BridgeTab({ fromChain, setFromChain, toChain, setToChain }: BridgeTabProps) {
  const {
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
  } = useBridgeLogic(fromChain, toChain);

  return (
    <div className="space-y-6">
      <div className="bg-purple-900/20 border border-purple-500/30 rounded-lg p-4">
        <h3 className="text-purple-300 font-medium mb-2">🌉 Step 2: Bridge Your Tokens</h3>
        <p className="text-gray-300 text-sm">
          Move your rebase tokens to another chain. You need tokens first!
        </p>
      </div>

      <ChainSelector
        fromChain={fromChain}
        setFromChain={setFromChain}
        toChain={toChain}
        setToChain={setToChain}
        tokenBalance={tokenBalance as bigint | undefined}
        tokenBalanceError={tokenBalanceError}
      />

      <TokenAmountInput
        bridgeAmount={bridgeAmount}
        setBridgeAmount={setBridgeAmount}
        onMaxClick={handleMaxBridgeAmount}
      />

      <FeeEstimator
        bridgeAmount={bridgeAmount}
        estimatedFee={estimatedFee}
        isLoadingFee={isLoadingFee}
        onPreviewFee={previewFee}
      />

      <BridgeProgress currentStep={currentStep} />

      <BridgeButton
        bridgeAmount={bridgeAmount}
        isLoading={isLoading}
        currentStep={currentStep}
        fromChain={fromChain}
        toChain={toChain}
        onBridge={handleBridge}
      />

      <BridgeInfo />
    </div>
  );
} 