# Decentralized Voting

On-chain voting dApp. Users connect a wallet (Sepolia), view candidates, and submit votes to a smart contract.

**Stack:** Next.js 14, wagmi, viem, RainbowKit, Tailwind CSS.

## Setup

```bash
npm install
```

## Deploy the contract

Uses Hardhat. Set `.env` with `API_URL` (Sepolia RPC) and `PRIVATE_KEY`.

```bash
npx hardhat compile
npm run hardhat:deploy
```

Log output includes the contract address. Put it in `.env.local` as:

```
NEXT_PUBLIC_CONTRACT_ADDRESS=0x...
```

Optional: `NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID` for WalletConnect (get one at cloud.walletconnect.com).

## Run locally

```bash
npm run dev
```

Open http://localhost:3000. Use Sepolia in your wallet.

## Deploy to Vercel

```bash
npm run build
```

Add `NEXT_PUBLIC_CONTRACT_ADDRESS` and optionally `NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID` in the Vercel project environment variables. Connect the repo and deploy.
