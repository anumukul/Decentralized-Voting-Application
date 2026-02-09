# Decentralized Voting

On-chain voting dApp. Users connect a wallet on Sepolia, view candidates, and submit votes to a smart contract.

## Repository structure

- **contract/** – Hardhat project (Solidity contract, compile, deploy to Sepolia).
- **frontend/** – Next.js app (wagmi, viem, RainbowKit, Tailwind). This is what you deploy to Vercel.

## Contract (Hardhat)

From the repo root:

```bash
cd contract
npm install
```

Create `contract/.env`:

- `API_URL` – Sepolia RPC (e.g. `https://rpc.sepolia.org`).
- `PRIVATE_KEY` – Deployer private key (no `0x` prefix).

Compile and deploy:

```bash
npm run compile
npm run deploy
```

The script prints the contract address. Use it in the frontend as described below.

## Frontend (Next.js)

From the repo root:

```bash
cd frontend
npm install
```

Create `frontend/.env.local`:

- `NEXT_PUBLIC_CONTRACT_ADDRESS` – The contract address from the deploy step.
- `NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID` – Optional; for WalletConnect (get one at cloud.walletconnect.com).

Run locally:

```bash
npm run dev
```

Open http://localhost:3000 and use Sepolia in your wallet.

Build (for production or Vercel):

```bash
npm run build
```

## Deploying to Vercel

1. Connect the repo to Vercel.
2. Set **Root Directory** to `frontend`.
3. Build command: `npm run build`. Install command: `npm install` (default).
4. Add environment variables in the Vercel project:
   - `NEXT_PUBLIC_CONTRACT_ADDRESS`
   - `NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID` (optional)

Vercel will build and deploy only the `frontend` app.
