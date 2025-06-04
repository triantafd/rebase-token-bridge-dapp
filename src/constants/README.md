# Constants Organization

This directory contains all contract addresses, ABIs, and chain configurations organized in a modular structure.

## Structure

```
constants/
├── chains/                     # Chain-specific configurations
│   ├── index.ts               # Combined chain config exports
│   ├── sepolia.ts             # Sepolia chain configuration
│   └── arbitrumSepolia.ts     # Arbitrum Sepolia configuration
├── contracts/                 # Contract-specific configurations
│   ├── index.ts               # Combined contract exports
│   ├── rebaseToken.ts         # Rebase token contracts
│   ├── vault.ts               # Vault contracts (Sepolia only)
│   ├── ccipRouter.ts          # CCIP router contracts
│   └── linkToken.ts           # LINK token contracts
├── index.ts                   # Main exports
└── README.md                  # This file
```

## Usage

### Import Everything (Recommended)
```typescript
import { CONTRACTS, CHAIN_CONFIG, ChainKey } from '@/constants';
```

### Import Specific Chain Config
```typescript
import { CHAIN_CONFIG } from '@/constants/chains';
```

## Key Features

1. **Modularity**: Each contract type has its own file
2. **Chain Separation**: Easy to add new chains
3. **Type Safety**: Better TypeScript support
4. **No Duplication**: Contracts are only defined once

## Important Notes

- **Vault contracts**: Only available on Sepolia (Arbitrum doesn't have a vault)
- **Addresses**: Using the correct provided contract addresses
- **Structure**: Simplified to avoid duplication between chain and contract files

## Contract Addresses

### Sepolia
- Rebase Token: `0x671dBEe3bA15eF789ba7c0Fc0db912C41C2DB764`
- Vault: `0xe72D410E445A432B09d0d2978b53d09b2b43A7ba`
- CCIP Router: `0x0BF3dE8c5D3e8A2B34D2BEeB17ABfCeBaf363A59`
- LINK Token: `0x779877A7B0D9E8603169DdbD7836e478b4624789`

### Arbitrum Sepolia
- Rebase Token: `0xEF1d5a4C1B3D5Cac3A20B7E10e5F146998C09Aa6`
- CCIP Router: `0x2a9C5afB0d0e4BAb2BCdaE109EC4b0c4Be15a165`
- LINK Token: `0xb1D4538B4571d411F07960EF2838Ce337FE1E80E`

## Adding New Chains

1. Create new file in `chains/` directory (e.g., `mainnet.ts`)
2. Export chain config
3. Add to `chains/index.ts`
4. Update contract files to include new chain addresses

## Adding New Contracts

1. Create new file in `contracts/` directory
2. Export ABI, addresses, and combined contracts object
3. Add to `contracts/index.ts`
4. Update main `CONTRACTS` object

## Examples

### Using Contracts
```typescript
import { CONTRACTS } from '@/constants';

// Sepolia contracts (includes vault)
const sepoliaRebaseToken = CONTRACTS.sepolia.rebaseToken;
const sepoliaVault = CONTRACTS.sepolia.vault;

// Arbitrum contracts (no vault)
const arbitrumRebaseToken = CONTRACTS.arbitrumSepolia.rebaseToken;
// CONTRACTS.arbitrumSepolia.vault; // ❌ This doesn't exist
```

### Using Chain Config
```typescript
import { CHAIN_CONFIG } from '@/constants';

const sepoliaChainId = CHAIN_CONFIG.sepolia.id; // 11155111
const arbitrumChainId = CHAIN_CONFIG.arbitrumSepolia.id; // 421614
``` 