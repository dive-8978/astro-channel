# MA public program pages

This document defines the safety and publication boundary for:

- `/ma-card-redemption.html`
- `/ma-burn.html`
- `/ma-mother-love.html`

The pages are public, read-only program explainers until the required contracts,
addresses, server records, audits and governance decisions are complete. A
visual animation or a displayed card image is never evidence of a token action.

## Language contract

English is the fresh-visit default. A manual choice is persisted for the seven
supported codes: `en`, `zh`, `es`, `fr`, `de`, `ja`, `ko`. The `?lang=` query
parameter takes precedence so the MA Secure Browser can open the matching
language without exposing account data.

## Card redemption boundary

The app may navigate to the official HTTPS page with only `lang` and a generic
`source=ma-app` marker. It must not place a wallet address, card identifier,
inventory, signature or bearer credential in the URL.

The public catalog is aligned with the current MA registry in
`src/config/GameFiCardAssets.js`: 98 exclusive card IDs and avatar codes
`115`–`212`. `phoenix-cosmic` is the canonical ID for the third Phoenix image.
The four Purple Blue Whale images are not four cards: they are artwork choices
(`jelly-dream`, `coral-family`, `ocean-leap`, `happy-spray`) for the single MA
card ID `blue-whale-purple`. They remain migration-pending and ineligible.

Future redemption must treat every browser-supplied card ID as untrusted. The
server must resolve the authenticated account's immutable draw/inventory record,
compare its canonical card ID and artwork ID with the versioned registry, and
bind that server record to the one-time challenge. A matching display label is
never sufficient evidence of ownership.

The claim button remains disabled until all of the following exist:

1. Server-issued card inventory with an immutable draw record.
2. A single-use challenge bound to account, card, destination wallet, quote,
   expiry and chain ID.
3. Atomic replay prevention and an auditable claim ledger.
4. A funded 30,000,000 MA pool and audited settlement contract.
5. Published eligibility, migration and dispute rules.

The four legacy purple-whale cards are marked migration-pending. They must not
become MA-eligible until the existing ASTRO claim path is reconciled so the same
card cannot be claimed twice.

The displayed rarity values are a proposed reference schedule, not a guaranteed
live quote. The target redemption window is three to five years, with a
five-year baseline daily budget of `30,000,000 / (5 × 365) = 16,438.356 MA`.
For comparison, a three-year pace is `30,000,000 / (3 × 365) = 27,397.260 MA`.
The active governance rule will publish one of these schedules before launch
and uses this multiplier:

```
min(1, daily budget / total accepted reference value)
```

The final payout for a verified card is its reference value multiplied by that
day's published multiplier.

## Burn boundary

The planning figures are:

- Planned reserve: 100,000,000 MA
- Planned daily amount: 273,972 MA
- 365 scheduled actions: 99,999,780 MA
- Unallocated remainder: 220 MA

Before activation, governance must publish the start time, token and vault
addresses, execution contract, destination, pause model and treatment of the
220 MA remainder. Sending ERC-20 tokens to a dead address often makes them
inaccessible without reducing `totalSupply`; the public definition of “burned”
must therefore match the final contract behavior.

The browser never holds an operator key. A live dashboard may update only from
independently readable, confirmed BNB Smart Chain data. Each counted action must
include a transaction hash, block number, amount and confirmation time.

## Mother Fund story records

`public/data/ma-impact-stories.json` intentionally starts empty. Never add a
fictional beneficiary or use a stock portrait as if it depicted a recipient.
A publishable record must satisfy this shape and pass the renderer's validation:

```json
{
  "id": "MF-YYYY-NNNN",
  "status": "verified",
  "consent": { "publication": true, "recordedAt": "ISO-8601" },
  "name": { "en": "Approved alias", "zh": "经同意的化名" },
  "region": { "en": "Country or broad region" },
  "story": { "en": "Respectful, reviewed account of the support and outcome." },
  "supportUse": { "en": "Housing, health, food, childcare or another verified use." },
  "amountMA": "0",
  "supportedAt": "YYYY-MM-DD",
  "image": {
    "src": "/assets/ma-programs/stories/MF-YYYY-NNNN.jpg",
    "alt": { "en": "Consent-approved description" }
  },
  "verification": {
    "partner": "Accountable partner name",
    "reference": "Public-safe record identifier"
  }
}
```

Publication permission is separate from eligibility for help and must be
withdrawable. Use an approved alias and broad region whenever possible. Do not
publish a precise home address, identity document, phone number, child identity,
wallet address or sensitive medical detail.

The fixed allocation statement is “30,000,000 MA, equal to 3% of the planned
initial 1,000,000,000 MA supply.” It must not be described as 3% of the current
supply after burns. A fiat reference value appears only when a verified MA price
source is available.

## Public state endpoint

`GET /api/ma-program-state` exposes no secret and currently reports
`mode: planning`, `verified: false` with null live fields. Frontend code must not
convert missing values to zero. Live mode requires a separate reviewed change
that reads the published contracts or a verifiable indexer and validates block
finality; changing an environment variable alone is not sufficient.
