# Cross-Chain Rebase Token Bridge Frontend

A Next.js frontend application for bridging rebase tokens across different blockchain networks using Chainlink CCIP (Cross-Chain Interoperability Protocol).

## Features

- **Wallet Connection**: Connect with MetaMask and WalletConnect
- **Multi-Chain Support**: Bridge between Sepolia and Arbitrum Sepolia testnets
- **Rebase Token Management**: Deposit ETH to mint rebase tokens that earn interest
- **Cross-Chain Bridging**: Transfer tokens between supported chains using CCIP
- **Real-time Balances**: View token and ETH balances across chains
- **Modern UI**: Beautiful, responsive interface built with Tailwind CSS

## Tech Stack

- **Next.js 14**: React framework with App Router
- **TypeScript**: Type-safe development
- **Wagmi**: React hooks for Ethereum
- **Viem**: TypeScript interface for Ethereum
- **TanStack Query**: Data fetching and caching
- **Tailwind CSS**: Utility-first CSS framework

## Getting Started

### Prerequisites

- Node.js 18+ and npm
- MetaMask or compatible wallet
- Testnet ETH on Sepolia and/or Arbitrum Sepolia

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd frontend
```

2. Install dependencies:
```bash
npm install
```

3. Configure environment variables:
Create a `.env.local` file with:
```env
NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID=your_walletconnect_project_id
NEXT_PUBLIC_INFURA_KEY=your_infura_key
```

4. Update contract addresses:
Edit `src/constants/contracts.ts` with your deployed contract addresses.

5. Run the development server:
```bash
npm run dev
```

6. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Contract Integration

The frontend integrates with the following smart contracts:

### RebaseToken
- Mint tokens by depositing ETH
- Earn interest on deposited amounts
- Transfer and approve token operations

### Vault
- Deposit ETH to mint rebase tokens
- Redeem tokens for underlying ETH
- Manage user deposits and withdrawals

### CCIP Router
- Cross-chain message and token transfers
- Fee estimation for bridge operations
- Secure cross-chain communication

## Usage

1. **Connect Wallet**: Click "Connect Wallet" and select your preferred wallet
2. **Deposit ETH**: Use the "Deposit ETH to Vault" button to mint rebase tokens
3. **Select Chains**: Choose source and destination chains for bridging
4. **Enter Amount**: Specify the amount of tokens to bridge
5. **Bridge Tokens**: Execute the cross-chain transfer

## Supported Networks

- **Sepolia Testnet** (Chain ID: 11155111)
- **Arbitrum Sepolia** (Chain ID: 421614)

## Key Components

### WagmiProvider
Configures Wagmi with supported chains and wallet connectors.

### Contract Constants
Centralized configuration for contract addresses, ABIs, and chain settings.

### Bridge Interface
Main UI component handling wallet connection, chain selection, and bridge operations.

## Development

### Project Structure
```
src/
├── app/
│   ├── layout.tsx          # Root layout with providers
│   ├── page.tsx            # Main bridge interface
│   └── providers/
│       └── WagmiProvider.tsx # Wagmi configuration
├── constants/
│   └── contracts.ts        # Contract addresses and ABIs
└── globals.css             # Global styles
```

### Adding New Chains

1. Add chain configuration to `CHAIN_CONFIG` in `contracts.ts`
2. Add contract addresses for the new chain
3. Update the chain selection UI in `page.tsx`
4. Configure the new chain in `WagmiProvider.tsx`

### Extending Functionality

- Add new contract interactions by extending the ABI arrays
- Implement additional UI components for advanced features
- Add transaction history and status tracking
- Integrate with additional wallet providers

## Security Considerations

- Always verify contract addresses before deployment
- Use testnet tokens for development and testing
- Implement proper error handling for failed transactions
- Validate user inputs and transaction parameters

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly on testnets
5. Submit a pull request

## License

This project is licensed under the MIT License.

## Support

For questions and support, please refer to the documentation or create an issue in the repository.
