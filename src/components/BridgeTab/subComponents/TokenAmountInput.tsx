'use client';

interface TokenAmountInputProps {
  bridgeAmount: string;
  setBridgeAmount: (amount: string) => void;
  onMaxClick: () => void;
}

export default function TokenAmountInput({
  bridgeAmount,
  setBridgeAmount,
  onMaxClick
}: TokenAmountInputProps) {
  return (
    <div>
      <div className="flex justify-between items-center mb-2">
        <label className="text-white text-sm font-medium">Token Amount</label>
        <button
          onClick={onMaxClick}
          className="text-blue-400 hover:text-blue-300 text-sm"
        >
          Max
        </button>
      </div>
      <input
        type="number"
        className="w-full p-3 bg-gray-700 text-white rounded-lg border border-gray-600 focus:border-blue-500 focus:outline-none"
        placeholder="0.0 RBT"
        value={bridgeAmount}
        onChange={(e) => setBridgeAmount(e.target.value)}
      />
    </div>
  );
}