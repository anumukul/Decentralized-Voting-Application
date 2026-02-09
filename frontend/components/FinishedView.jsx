'use client';

import { ConnectButton } from '@rainbow-me/rainbowkit';

export default function FinishedView() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 bg-ballot-bg">
      <div className="max-w-lg w-full text-center animate-fade-in">
        <div className="inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-ballot-card border border-ballot-border mb-8">
          <svg className="w-10 h-10 text-ballot-muted" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </div>
        <h1 className="text-3xl md:text-4xl font-bold text-white mb-3 tracking-tight">
          Voting has ended
        </h1>
        <p className="text-ballot-muted text-lg mb-4">
          This round of voting is over. Results are final on-chain.
        </p>
        <p className="text-ballot-muted text-sm mb-8">
          Just redeployed? Add <span className="font-mono text-white">NEXT_PUBLIC_CONTRACT_ADDRESS</span> to .env.local with your new contract address and restart the app.
        </p>
        <div className="flex justify-center" style={{ minHeight: 44 }}>
          <ConnectButton showBalance={false} chainStatus="icon" accountStatus="address" />
        </div>
      </div>
    </div>
  );
}
