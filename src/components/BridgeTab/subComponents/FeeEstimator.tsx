'use client';

interface FeeEstimatorProps {
  bridgeAmount: string;
  estimatedFee: string;
  isLoadingFee: boolean;
  onPreviewFee: () => void;
}

export default function FeeEstimator({
  bridgeAmount,
  estimatedFee,
  isLoadingFee,
  onPreviewFee
}: FeeEstimatorProps) {
  if (!bridgeAmount) return null;

  return (
    <div className="mt-3 p-3 bg-gray-700 rounded-lg">
      <div className="flex justify-between items-center mb-2">
        <span className="text-gray-300 text-sm">Bridge Fee:</span>
        <button
          onClick={onPreviewFee}
          disabled={isLoadingFee || !bridgeAmount}
          className="text-blue-400 hover:text-blue-300 text-sm disabled:text-gray-500"
        >
          {isLoadingFee ? 'Calculating...' : 'Preview Fee'}
        </button>
      </div>
      {estimatedFee && (
        <p className="text-white text-sm">
          ~{parseFloat(estimatedFee).toFixed(6)} LINK
        </p>
      )}
    </div>
  );
}