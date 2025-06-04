import { REBASE_TOKEN_CONTRACTS } from './rebaseToken';
import { VAULT_CONTRACTS } from './vault';
import { CCIP_ROUTER_CONTRACTS } from './ccipRouter';
import { LINK_TOKEN_CONTRACTS } from './linkToken';

// Combined contracts object
export const CONTRACTS = {
  sepolia: {
    rebaseToken: REBASE_TOKEN_CONTRACTS.sepolia,
    vault: VAULT_CONTRACTS.sepolia,
    ccipRouter: CCIP_ROUTER_CONTRACTS.sepolia,
    linkToken: LINK_TOKEN_CONTRACTS.sepolia,
  },
  arbitrumSepolia: {
    rebaseToken: REBASE_TOKEN_CONTRACTS.arbitrumSepolia,
    // No vault on Arbitrum
    ccipRouter: CCIP_ROUTER_CONTRACTS.arbitrumSepolia,
    linkToken: LINK_TOKEN_CONTRACTS.arbitrumSepolia,
  },
} as const;

export type ContractKey = keyof typeof CONTRACTS.sepolia; 