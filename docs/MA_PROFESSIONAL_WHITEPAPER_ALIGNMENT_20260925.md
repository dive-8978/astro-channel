# Professional homepage — whitepaper alignment

Updated 2026-09-25. This is a content change, not a backend deployment or security certification.

## Sources

- User-supplied `astrobridge-whitepaper-latest_2026-7-12.md`, AstroBridge v7, July 2026: signed-intent API, source/signature/time checks, route coordination, non-custodial authorization, AstroChannel, P2P, cached market data, node scheduling and phased roadmap.
- User-supplied `AstroChat_MemeAstro_MA_官方白皮书_V2_上线与上币版.docx`, MA V2, July 2026: MA conversations, wallet tools, QR payment, local records, reading, games, seven languages and community utility. Read-only text extraction; originals unchanged.
- September 25 allocation policy in `public/data/ma-program-policy.json` supersedes older allocation proposals: 7 million MA cards, 10 million MA Mother Fund, 50 million MA / 365-day planned burn.

## Public presentation

- Product benefits lead; the professional page no longer opens with a detailed implementation-risk checklist. Existing readiness and privacy links remain available.
- Signed intent → authorization/risk checks → route coordination → execution tracking is an architecture explanation, not proof that every production integration is enabled.
- Current BSC/EVM validation and phased expansion are distinguished. Future ASTRO fees, staking and burns are separate from MA supply stewardship.
- Mother Fund support, consent-led image/story publication and verifiable assistance records describe the proposed operating model. No completed aid cases or volunteer events are invented.
- MA Supply Stewardship presents the allocation, schedule and future transaction evidence. It makes no price, return or completed-burn claim.
- The transfer warning states that MA/AstroBridge cannot cancel confirmed on-chain transfers and wrong-address funds may be unrecoverable. It does not claim that every mistaken payment is permanently unrecoverable or compare unrelated payment platforms.
- No global-first, hardware-cold-wallet, absolute-security or absolute-privacy claim is introduced.

## Verification

- `node scripts/test-ma-policy.cjs`: allocation arithmetic and seven-language content assertions passed.
- `npm run build`: production build passed.
- Browser checked at 1280 px desktop and 390 px mobile; all seven language selections rendered new technology and community content without horizontal page overflow.
- App companion change adds the same localized transfer warning to the confirmation dialog. Both Android editions are built and installed separately; this does not validate an actual funds transfer.
