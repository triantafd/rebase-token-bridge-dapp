# Rebase Token Bridge DApp

🌉 **Frontend DApp for [Cyfrin Foundry Cross-Chain Rebase Token Course](https://github.com/Cyfrin/foundry-cross-chain-rebase-token-cu)**

A Next.js frontend application for bridging rebase tokens across different blockchain networks using Chainlink CCIP (Cross-Chain Interoperability Protocol).

## About

React frontend for the cross-chain rebase token system. Allows users to deposit ETH on Sepolia and bridge rebase tokens to Arbitrum Sepolia using Chainlink CCIP.

## 🏗️ Smart Contracts

**Backend Repository:** [foundry-cross-chain-rebase-token-cu](https://github.com/Cyfrin/foundry-cross-chain-rebase-token-cu)

## Features

- **Wallet Connection**: Connect with MetaMask
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
- MetaMask wallet
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

3. Update contract addresses:
Edit `src/constants/contracts/` with your deployed contract addresses.

4. Run the development server:
```bash
npm run dev
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser.

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

1. **Connect Wallet**: Click "Connect Wallet" and MetaMask will open
2. **Deposit ETH**: Use the Deposit Tab to deposit ETH and mint rebase tokens
3. **Bridge Tokens**: Use the Bridge Tab to transfer tokens from Sepolia to Arbitrum
4. **Monitor Balances**: View real-time balances across both chains

## Supported Networks

- **Sepolia Testnet** (Chain ID: 11155111)
- **Arbitrum Sepolia** (Chain ID: 421614)

## Key Components

### WagmiProvider
Configures Wagmi with supported chains and MetaMask connector.

### Component Organization
- **BridgeTab/**: Cross-chain bridging interface
- **DepositTab/**: ETH deposit and token minting
- **WalletInfo/**: Wallet connection and balance display
- **Header/**: Navigation and chain info
- **InfoSection/**: User guidance and information

### Bridge Logic
Custom hooks handle bridge operations, fee estimation, and transaction status.

## Development

### Project Structure
```
src/
├── app/
│   ├── layout.tsx              # Root layout with providers
│   ├── page.tsx                # Main application interface
│   └── providers/
│       └── WagmiProvider.tsx   # Wagmi configuration (MetaMask only)
├── components/
│   ├── BridgeTab/              # Bridge interface components
│   ├── DepositTab/             # Deposit interface components  
│   ├── WalletInfo/             # Wallet and balance components
│   ├── Header/                 # Header components
│   └── InfoSection/            # Information components
├── hooks/
│   └── useBridgeLogic.ts       # Bridge operations logic
├── constants/
│   ├── chains/                 # Chain configurations
│   ├── contracts/              # Contract addresses and ABIs
│   └── index.ts                # Exported constants
└── globals.css                 # Global styles
```

### Adding New Chains

1. Add chain configuration to `src/constants/chains/`
2. Add contract addresses in `src/constants/contracts/`
3. Update the WagmiProvider configuration
4. Update chain selection UI components

### Extending Functionality

- Add new contract interactions by extending the ABI arrays
- Create new components in the respective directories
- Add transaction history and status tracking
- Implement additional bridge features

## Security Considerations

- Always verify contract addresses before deployment
- Use testnet tokens for development and testing
- Implement proper error handling for failed transactions
- Validate user inputs and transaction parameters

## 🔗 Related

- **Smart Contracts:** [Cyfrin Course Repo](https://github.com/Cyfrin/foundry-cross-chain-rebase-token-cu)
- **Course:** Cyfrin Foundry Solidity Course
- **Technology:** Chainlink CCIP, React, Next.js

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

---

*This frontend implements the user interface for the cross-chain rebase token system from the Cyfrin Foundry course.*
