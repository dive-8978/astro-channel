# Astro Open Infrastructure Newsroom

This directory contains the official article registry and the attributed Global
Web3 Wire used by `../newsroom.html`.

## Refresh the wire

```bash
npm ci
npm run refresh
```

The crawler reads public RSS or Atom feeds declared in `sources.json`. It stores
only publisher name, headline, short publisher-provided excerpt, publication
time and original URL. It does not copy full article text or hotlink publisher
images.

A source failure is isolated. A refresh is written when at least one source
succeeds, and each source status is recorded in `feed.json`.

## Automation

`../.github/workflows/refresh-news.yml` runs every six hours and commits a changed
`news/feed.json`. A connected Vercel project can redeploy that commit.

## Editorial boundary

Official Astro articles are declared in `articles.js` and carry an explicit
content type and byline. External headlines remain in the Global Web3 Wire and
always link to their original publishers.

The Company Update Stream combines those articles with concise program records
from `official-updates.js`. Every official record must include a project, date,
plain-language phase and inspectable evidence. Use the status tones consistently:

- `verified`: published evidence or a reproducible completed milestone;
- `active`: a working beta, reference build or development milestone;
- `planned`: a proposal or program page that is not yet operational.

MA burn, Mother Fund and card-redemption records must stay `planned` until the
relevant contract address, transaction or privacy-safe support record can be
verified. Never infer a live amount from a design mockup or program page.

Do not publish claims of audits, partnerships, mainnet status, adoption,
privacy guarantees or financial returns without independently verifiable
evidence.
