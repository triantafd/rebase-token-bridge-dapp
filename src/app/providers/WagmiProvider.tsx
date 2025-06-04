'use client';

import { WagmiProvider as WagmiProviderBase } from 'wagmi';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { createConfig, http } from 'wagmi';
import { sepolia, arbitrumSepolia } from 'wagmi/chains';
import { metaMask, walletConnect } from 'wagmi/connectors';
import { useState } from 'react';

const config = createConfig({
  chains: [sepolia, arbitrumSepolia],
  connectors: [
    metaMask(),
  ],
  transports: {
    [sepolia.id]: http(),
    [arbitrumSepolia.id]: http(),
  },
});

export function WagmiProvider({ children }: { children: React.ReactNode }) {
  const [queryClient] = useState(() => new QueryClient());

  return (
    <WagmiProviderBase config={config}>
      <QueryClientProvider client={queryClient}>
        {children}
      </QueryClientProvider>
    </WagmiProviderBase>
  );
} 