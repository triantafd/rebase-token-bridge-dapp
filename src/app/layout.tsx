import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { WagmiProvider } from './providers/WagmiProvider';

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Cross-Chain Rebase Token Bridge",
  description: "Bridge rebase tokens across chains using CCIP",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <WagmiProvider>
          {children}
        </WagmiProvider>
      </body>
    </html>
  );
}
