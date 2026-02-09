'use client';

import { ConnectButton } from '@rainbow-me/rainbowkit';
import { useAccount, useReadContract, useWriteContract, useWaitForTransactionReceipt } from 'wagmi';
import { contractAddress, contractAbi } from '../lib/contract';
import { useEffect, useState } from 'react';

function formatRemaining(seconds) {
  if (seconds === undefined || seconds === null) return '—';
  const s = Number(seconds);
  if (s <= 0) return 'Ended';
  const m = Math.floor(s / 60);
  const sec = s % 60;
  return `${m}m ${sec}s`;
}

export default function VotingDashboard() {
  const { address } = useAccount();
  const [selectedIndex, setSelectedIndex] = useState('');

  const { data: candidatesData, refetch: refetchCandidates } = useReadContract({
    address: contractAddress,
    abi: contractAbi,
    functionName: 'getAllVotesOfCandiates',
  });

  const { data: remainingTime, refetch: refetchTime } = useReadContract({
    address: contractAddress,
    abi: contractAbi,
    functionName: 'getRemainingTime',
  });

  const { data: hasVoted } = useReadContract({
    address: contractAddress,
    abi: contractAbi,
    functionName: 'voters',
    args: address ? [address] : undefined,
  });

  const {
    writeContract: vote,
    data: hash,
    isPending: isWritePending,
    error: writeError,
  } = useWriteContract();

  const { isLoading: isConfirming, isSuccess } = useWaitForTransactionReceipt({ hash });

  useEffect(() => {
    if (isSuccess) {
      refetchCandidates();
      refetchTime();
      setSelectedIndex('');
    }
  }, [isSuccess, refetchCandidates, refetchTime]);

  const candidates = candidatesData
    ? candidatesData.map((c, i) => ({
        index: i,
        name: c.name,
        voteCount: c.voteCount ? Number(c.voteCount) : 0,
      }))
    : [];

  const totalVotes = candidates.reduce((sum, c) => sum + c.voteCount, 0);
  const voted = hasVoted === true;
  const isBusy = isWritePending || isConfirming;

  const handleVote = () => {
    const idx = parseInt(selectedIndex, 10);
    if (isNaN(idx) || idx < 0 || idx >= candidates.length) return;
    vote({
      address: contractAddress,
      abi: contractAbi,
      functionName: 'vote',
      args: [BigInt(idx)],
    });
  };

  return (
    <div className="min-h-screen bg-ballot-bg text-white">
      <header className="border-b border-ballot-border bg-ballot-card/50 backdrop-blur">
        <div className="max-w-4xl mx-auto px-4 py-4 flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-ballot-accent/20 flex items-center justify-center">
              <svg className="w-5 h-5 text-ballot-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <span className="font-semibold text-lg">Decentralized Voting</span>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-ballot-muted text-sm hidden sm:inline">Sepolia</span>
            <ConnectButton showBalance={false} chainStatus="icon" accountStatus="address" />
          </div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 py-8 md:py-12">
        <div className="grid gap-6 md:gap-8 animate-slide-up">
          <div className="rounded-2xl border border-ballot-border bg-ballot-card p-6">
            <h2 className="text-sm font-medium text-ballot-muted uppercase tracking-wider mb-1">Status</h2>
            <div className="flex flex-wrap items-center gap-4 mt-2">
              <span className="inline-flex items-center gap-1.5 text-ballot-success">
                <span className="w-2 h-2 rounded-full bg-ballot-success animate-pulse" />
                Voting open
              </span>
              <span className="text-ballot-muted">Time left: {formatRemaining(remainingTime)}</span>
              {address && (
                <span className="text-ballot-muted text-sm truncate max-w-[200px]" title={address}>
                  {address.slice(0, 6)}…{address.slice(-4)}
                </span>
              )}
            </div>
          </div>

          {voted ? (
            <div className="rounded-2xl border border-ballot-border bg-ballot-card p-6 text-center">
              <p className="text-ballot-muted">You have already voted in this round.</p>
            </div>
          ) : (
            <div className="rounded-2xl border border-ballot-border bg-ballot-card p-6">
              <h2 className="text-sm font-medium text-ballot-muted uppercase tracking-wider mb-4">Cast your vote</h2>
              <div className="flex flex-wrap gap-3 items-end">
                <div>
                  <label className="block text-sm text-ballot-muted mb-1">Candidate index</label>
                  <input
                    type="number"
                    min={0}
                    max={candidates.length - 1}
                    value={selectedIndex}
                    onChange={(e) => setSelectedIndex(e.target.value)}
                    placeholder="0"
                    className="w-28 px-4 py-2.5 rounded-xl bg-ballot-bg border border-ballot-border text-white placeholder:text-ballot-muted focus:outline-none focus:ring-2 focus:ring-ballot-accent"
                  />
                </div>
                <button
                  onClick={handleVote}
                  disabled={isBusy || selectedIndex === '' || candidates.length === 0}
                  className="px-5 py-2.5 rounded-xl bg-ballot-accent hover:bg-ballot-accentHover disabled:opacity-50 disabled:cursor-not-allowed font-medium transition-colors"
                >
                  {isBusy ? 'Confirming…' : 'Vote'}
                </button>
              </div>
              {writeError && (
                <p className="mt-3 text-sm text-ballot-error">{writeError.message}</p>
              )}
            </div>
          )}

          <div className="rounded-2xl border border-ballot-border bg-ballot-card overflow-hidden">
            <div className="px-6 py-4 border-b border-ballot-border">
              <h2 className="text-sm font-medium text-ballot-muted uppercase tracking-wider">Candidates</h2>
              <p className="text-sm text-ballot-muted mt-0.5">{totalVotes} total votes</p>
            </div>
            <div className="divide-y divide-ballot-border">
              {candidates.length === 0 ? (
                <div className="px-6 py-12 text-center text-ballot-muted">No candidates yet.</div>
              ) : (
                candidates.map((c) => (
                  <div
                    key={c.index}
                    className="px-6 py-4 flex flex-wrap items-center justify-between gap-4 hover:bg-ballot-bg/50 transition-colors"
                  >
                    <div className="flex items-center gap-4">
                      <span className="w-8 h-8 rounded-lg bg-ballot-accent/20 flex items-center justify-center text-sm font-medium text-ballot-accent">
                        {c.index}
                      </span>
                      <span className="font-medium">{c.name}</span>
                    </div>
                    <div className="flex items-center gap-4">
                      <span className="text-ballot-muted">{c.voteCount} votes</span>
                      <div className="w-24 h-2 rounded-full bg-ballot-border overflow-hidden">
                        <div
                          className="h-full rounded-full bg-ballot-accent transition-all"
                          style={{
                            width: totalVotes > 0 ? `${(c.voteCount / totalVotes) * 100}%` : '0%',
                          }}
                        />
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
