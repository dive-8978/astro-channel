const PLANNED_INITIAL_SUPPLY = "1000000000";
const PLANNED_CARD_POOL = "7000000";
const PLANNED_MOTHER_FUND = "10000000";
const PLANNED_BURN_RESERVE = "50000000";
const PLANNED_DAILY_BURN = "136986";

export default function handler(request, response) {
  response.setHeader("Access-Control-Allow-Origin", "https://astrochannel.one");
  response.setHeader("Cache-Control", "public, max-age=0, s-maxage=60, stale-while-revalidate=300");

  if (request.method !== "GET") {
    response.setHeader("Allow", "GET");
    return response.status(405).json({ ok: false, error: "method_not_allowed" });
  }

  return response.status(200).json({
    ok: true,
    schemaVersion: 1,
    mode: "planning",
    verified: false,
    chain: {
      id: 56,
      name: "BNB Smart Chain",
      tokenAddress: null,
      burnVaultAddress: null,
      burnDestinationAddress: null,
      verifiedBlock: null
    },
    supply: {
      plannedInitialMA: PLANNED_INITIAL_SUPPLY,
      verifiedCurrentMA: null,
      verifiedPriceUSD: null
    },
    cardRedemption: {
      plannedPoolMA: PLANNED_CARD_POOL,
      claimsEnabled: false,
      verifiedRemainingMA: null
    },
    burn: {
      plannedReserveMA: PLANNED_BURN_RESERVE,
      plannedDailyMA: PLANNED_DAILY_BURN,
      plannedFinalDayMA: "137096",
      startDate: null,
      verifiedBurnedMA: null,
      verifiedRemainingMA: null,
      latestTransaction: null
    },
    motherFund: {
      plannedAllocationMA: PLANNED_MOTHER_FUND,
      policyRevision: "2026-10-01",
      publicWallet: null,
      matchingBurnMA: "20000000",
      matchingBurnSource: "separate-company-reserve",
      matchingBurnStatus: "prior-proposal-under-review-not-funded",
      annualProfitPercent: { total: 4, fund: 2, burn: 2 },
      annualBuybackStatus: "prior-proposal-under-review-not-active",
      initialSupplySharePercent: "1",
      verifiedReferenceValueUSD: null,
      disbursementsEnabled: false
    },
    missingForLiveMode: [
      "published MA token address and ABI",
      "funded reserve and vault addresses",
      "audited burn execution contract",
      "final burn semantics and last-day adjustment policy",
      "verified MA market-price source",
      "server-issued card ownership ledger and replay-safe claim service"
    ]
  });
}
