'use client';

interface BridgeButtonProps {
  bridgeAmount: string;
  isLoading: boolean;
  currentStep: string;
  fromChain: string;
  toChain: string;
  onBridge: () => void;
}

export default function BridgeButton({
  bridgeAmount,
  isLoading,
  currentStep,
  fromChain,
  toChain,
  onBridge
}: BridgeButtonProps) {
  const isDisabled = !bridgeAmount || isLoading || fromChain === toChain;

  return (
    <button
      onClick={onBridge}
      disabled={isDisabled}
      className="w-full p-3 bg-purple-600 hover:bg-purple-700 disabled:bg-gray-600 disabled:cursor-not-allowed text-white rounded-lg transition-colors font-medium"
    >
      {isLoading ? currentStep || 'Processing...' : `Bridge ${bridgeAmount || '0'} RBT`}
    </button>
  );
}