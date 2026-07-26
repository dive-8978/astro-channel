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

Do not publish claims of audits, partnerships, mainnet status, adoption,
privacy guarantees or financial returns without independently verifiable
evidence.
