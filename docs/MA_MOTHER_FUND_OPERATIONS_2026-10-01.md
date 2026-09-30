# MA Mother Fund — publication and participation operations

Policy revision: 2026-10-01. This is a planning-stage company initiative, not evidence of charity registration, exchange listing, funding, oversight appointment or asset execution.

## Confirmed policy direction

- Company supplies an initial 20,000,000 MA for practical aid to mothers and children worldwide, planned for a dedicated public wallet after a future listing. Wallet, verified balance, listing and oversight are pending.
- Entire allocation and realized proceeds remain dedicated to aid regardless of MA price. Publish sale reconciliation, costs and real-world disbursement evidence; disclose administration funding before activation.
- Once the initial 20,000,000 MA is fully sold and reconciled, the company supplies a separate 20,000,000 MA for a matching burn. Do not burn buyers' tokens, divert aid proceeds or reuse the existing 50M daily-burn reserve for this claim.
- Subsequently allocate 4% of audited annual net profit after tax and prior-loss recovery: 2% buys MA for the fund, 2% buys MA for burning. No eligible positive profit produces no allocation under the formula. First applicable financial year and execution timetable remain to be published.
- A dead-address transfer and a contract totalSupply reduction are different measurements. Publish verified transactions and semantics before claiming completion.

## Site components

- `/ma-mother-love.html`: purpose, planned allocation, wallet status, oversight, invitation, consent-first impact stories.
- `/ma-buyback.html`: separate company reserve, annual split, illustrative calculator, public evidence boundaries.
- `/data/ma-program-policy.json`: planning figures; `/api/ma-program-state`: planning-only fund fields.
- `/data/ma-fund-supporters.json`: approved participant registry; empty at publication.
- `/assets/ma-programs/mother-fund.js`: bundled English/Chinese copy and UI; corresponding `mother-fund-copy.json` is a readable copy inventory. Update both when changing text, and keep static HTML fallback in sync.
- Existing seven-language navigation and program content are retained. New detailed policy sections are English/Chinese; other languages explicitly fall back to English. Professional-page 20M summaries are updated in all seven languages.

## Add a participant only after written consent

1. Record authorization privately, including permitted name/logo, approved wording, purpose, country, role and withdrawal process. An invitation sent, delivered, opened or replied to is not a participation agreement.
2. Publish a privacy-safe role/permission summary under `/fund-records/<slug>.html` after approval. Do not publish private email correspondence or signature documents by default.
3. Add a registry record with `status: "confirmed"`, `namePermission: true`, `name`, `role`, `approvedAt: "YYYY-MM-DD"`, and `publicRecord: "/fund-records/<slug>.html"`.
4. Optional approved local logo: `logoPermission: true`, `logo: "/assets/<approved-file>.png"`. Use `featured: true` for the looping strip. Keep names/roles readable in the accessible static record grid. Respect logo licence and expiry.
5. Preview both languages and mobile. Verify role record URL and consent scope, then deploy. Remove display authorization on withdrawal through a separately reviewed update while retaining required private audit records.

The wall currently uses neutral placeholders with looping ripples. No exchange, charity or United Nations logo is displayed. Future featured participants use the looping strip; animation supports pause, hover and reduced-motion preferences.

## Before asset operations

Publish verified token contract/network, dedicated addresses, reserve funding, custody and approval controls, oversight scope, accounting currency, costs, eligibility, partner due diligence, privacy and reporting rules. A proposed U.S. notarization is only a possible signing record, not a claim of charitable status, audit, custody or UN approval. No signing key or token transfer is part of this website release.

## Rollback

Use an additive `git revert <release-commit>` on an up-to-date production branch, then push and verify the Vercel deployment and URLs. Do not force-push or reset unrelated news commits. No PM2 change is required for this website.

## Co-signing wall update — 2026-10-01

The current invitation prioritizes a written humanitarian joint statement. Funding, custody and supervision are not requirements of this invitation. Each institution should issue its own letterhead document and authorize the public version separately from the logo.

Public invitation and unsigned discussion template: `/ma-mother-fund-invitation.html`. This is not an executed certificate. Do not place any third-party signature, seal or logo on the template.

Registry schema version 2 adds these required fields before a participant appears:

- `permissionExpiresAt`: YYYY-MM-DD, inclusive through that Asia/Shanghai calendar day; expired authorization is not displayed. Approval dates use the same program calendar.
- `document.kind`: `joint-statement` or `notarial-record`.
- `document.url`: `/fund-records/<slug>.pdf` or `.html`, the approved redacted statement itself. Clicking either logo or name opens this URL directly.
- `document.sha256`: SHA-256 of the exact published document.
- `document.publicationPermission: true` and `document.verified: true`: set only after manually verifying the issuer, signatory's authority and publication permission. These fields are editorial verification records, not digital signature certification.

Existing name/logo permissions, role, approval date and optional `featured` flag remain applicable. Obtain confirmation through a verified institutional channel; an email acknowledgement, unsigned template or co-signing request cannot satisfy the checks. Give each institution its own document and archive source verification privately. Public documents must not contain private contact details, identity documents or unapproved signatures/seals.

`npm run test:fund-documents` checks approval/expiry/path rules and the exact hashes of documents admitted to the public registry. A manual issuer and consent review is still essential. Featured logos link directly to their documents and use staggered illumination, light sweeps and the shared ripple. The motion can be paused and respects reduced-motion settings.

## English institutional invitation

The invitation and unsigned statement template at `/ma-mother-fund-invitation.html` are English-only as requested on 2026-10-01. The legacy `#chinese` fragment now targets the English invitation so existing links continue to work. The prior bilingual page is preserved in Git and in the local English-outreach archive; the fund page retains its language selector.
