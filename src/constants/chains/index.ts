import { ARBITRUM_SEPOLIA_CONFIG } from './arbitrumSepolia';
import { SEPOLIA_CONFIG } from './sepolia';

// Combined chain configuration
export const CHAIN_CONFIG = {
  sepolia: SEPOLIA_CONFIG,
  arbitrumSepolia: ARBITRUM_SEPOLIA_CONFIG,
};

export type ChainKey = keyof typeof CHAIN_CONFIG; 