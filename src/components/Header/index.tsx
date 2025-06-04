interface HeaderProps {
  title?: string;
  subtitle?: string;
}

export default function Header({ 
  title = "Rebase Token DApp", 
  subtitle = "Deposit ETH, earn interest, bridge across chains" 
}: HeaderProps) {
  return (
    <div className="text-center mb-8">
      <h1 className="text-3xl font-bold text-white mb-2">{title}</h1>
      <p className="text-gray-400">{subtitle}</p>
    </div>
  );
} 