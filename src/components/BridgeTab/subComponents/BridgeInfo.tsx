'use client';

export default function BridgeInfo() {
  return (
    <div className="bg-gray-800/50 border border-gray-600/30 rounded-lg p-4">
      <h4 className="text-gray-300 font-medium mb-2">ℹ️ Bridge Process:</h4>
      <div className="text-xs text-gray-400 space-y-1">
        <p>• Step 1: Approve tokens (if needed)</p>
        <p>• Step 2: Approve LINK for fees (if needed)</p>
        <p>• Step 3: Execute cross-chain transfer</p>
        <p className="text-yellow-400 mt-2">
          💡 Each step requires a separate MetaMask signature
        </p>
      </div>
    </div>
  );
}