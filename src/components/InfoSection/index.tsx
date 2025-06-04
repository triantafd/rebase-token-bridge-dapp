interface InfoItem {
  text: string;
  description: string;
}

interface InfoSectionProps {
  title?: string;
  icon?: string;
  items?: InfoItem[];
}

export default function InfoSection({ 
  title = "How it works:",
  icon = "💡",
  items = [
    { text: "Deposit ETH", description: "Get rebase tokens (1:1 ratio)" },
    { text: "Earn interest", description: "Tokens automatically rebase" },
    { text: "Bridge tokens", description: "Move to other chains via CCIP" },
    { text: "Redeem anytime", description: "Convert back to ETH" }
  ]
}: InfoSectionProps) {
  return (
    <div className="mt-6 p-4 bg-gray-700 rounded-lg">
      <h3 className="text-white font-medium mb-2">
        {icon} {title}
      </h3>
      <ul className="text-gray-300 text-sm space-y-1">
        {items.map((item, index) => (
          <li key={index}>
            • <strong>{item.text}</strong> → {item.description}
          </li>
        ))}
      </ul>
    </div>
  );
} 