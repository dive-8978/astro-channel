# MemeAstro (MA) Airdrop Backend

This repository contains the backend and smart contract for the MemeAstro (MA) Triple Airdrop on BNB Chain.

## Project Overview

- Token: **MemeAstro (MA)**
- Total Supply: 1000B MA
- Airdrop Pool: 35% (350B MA)
- Eco / Dev Pool: 65% (650B MA)
- Lockup: 3 months for MA airdrop
- Long-term benefit: Hold MA 6 months → ASTRO mainnet token airdrop (10,000 MA = 1 ASTRO)

## Tech Stack

- Backend: Node.js + Express + TypeScript
- Database: PostgreSQL
- Smart Contract: Solidity (OpenZeppelin ERC20)

## API Endpoints

| Endpoint                  | Method | Description                        |
|----------------------------|--------|------------------------------------|
| `/api/verify-imei`         | POST   | Verify 15-digit IMEI               |
| `/api/verify-x`            | POST   | Verify X (Twitter) follow          |
| `/api/verify-bridge`       | POST   | Verify cross-chain transfer        |
| `/api/reward?wallet=...`  | GET    | Get user reward & verification     |
| `/api/claim`               | POST   | Claim MA airdrop, returns signature |

## Usage

1. Install dependencies:

```bash
npm install
