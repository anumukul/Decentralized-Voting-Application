'use client';

import { useAccount, useReadContract, useChainId } from 'wagmi';
import { contractAddress, contractAbi } from '../lib/contract';
import LoginView from '../components/LoginView';
import VotingDashboard from '../components/VotingDashboard';
import FinishedView from '../components/FinishedView';
import { sepolia } from 'wagmi/chains';

export default function Home() {
  const { isConnected } = useAccount();
  const chainId = useChainId();
  const {
    data: votingOpen,
    isLoading: statusLoading,
    error: statusError,
  } = useReadContract({
    address: contractAddress,
    abi: contractAbi,
    functionName: 'getVotingStatus',
  });

  const isOpen = votingOpen === true;
  const isWrongChain = isConnected && chainId !== sepolia.id;
  const hasContractError = !!statusError;

  if (statusLoading) {
    return (
      <div className="min-h-screen bg-ballot-bg flex items-center justify-center">
        <div className="text-ballot-muted flex items-center gap-2">
          <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
          </svg>
          Loading…
        </div>
      </div>
    );
  }

  if (hasContractError || isWrongChain) {
    return (
      <div className="min-h-screen bg-ballot-bg flex flex-col items-center justify-center px-4">
        <div className="max-w-lg w-full text-center">
          <h1 className="text-xl font-semibold text-white mb-2">Contract not reachable</h1>
          <p className="text-ballot-muted text-sm mb-4">
            {isWrongChain
              ? 'Switch your wallet to Sepolia to use this app.'
              : 'Wrong contract address or RPC issue. If you just redeployed, set NEXT_PUBLIC_CONTRACT_ADDRESS in .env.local to your new contract address and restart (npm run dev).'}
          </p>
          <p className="text-ballot-muted text-xs font-mono break-all mb-6">Contract: {contractAddress}</p>
          <LoginView />
        </div>
      </div>
    );
  }

  if (!isOpen) {
    return <FinishedView />;
  }

  if (!isConnected) {
    return <LoginView />;
  }

  return <VotingDashboard />;
}
