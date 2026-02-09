'use client';

import { ConnectButton } from '@rainbow-me/rainbowkit';

export default function LoginView() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 bg-ballot-bg">
      <div className="max-w-lg w-full text-center animate-fade-in">
        <div className="inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-ballot-card border border-ballot-border mb-8">
          <svg className="w-10 h-10 text-ballot-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </div>
        <h1 className="text-3xl md:text-4xl font-bold text-white mb-3 tracking-tight">
          Decentralized Voting
        </h1>
        <p className="text-ballot-muted text-lg mb-10">
          Connect your wallet to view candidates and cast your vote on-chain.
        </p>
        <div className="flex justify-center">
          <ConnectButton
            showBalance={false}
            chainStatus="icon"
            accountStatus="address"
          />
        </div>
        <p className="text-ballot-muted text-sm mt-8">
          Supports MetaMask, WalletConnect, and more. Sepolia network.
        </p>
      </div>
    </div>
  );
}
