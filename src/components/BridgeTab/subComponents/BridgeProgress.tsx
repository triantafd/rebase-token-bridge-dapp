'use client';

interface BridgeProgressProps {
  currentStep: string;
}

export default function BridgeProgress({ currentStep }: BridgeProgressProps) {
  if (!currentStep) return null;

  return (
    <div className="bg-blue-900/20 border border-blue-500/30 rounded-lg p-4">
      <div className="flex items-center space-x-2">
        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-400"></div>
        <span className="text-blue-300 text-sm font-medium">{currentStep}</span>
      </div>
      {currentStep.includes('Step') && (
        <div className="mt-2 text-xs text-gray-400">
          Each step requires a separate MetaMask transaction
        </div>
      )}
    </div>
  );
}