const PLANNED_INITIAL_SUPPLY = "1000000000";
const PLANNED_CARD_POOL = "30000000";
const PLANNED_MOTHER_FUND = "30000000";
const PLANNED_BURN_RESERVE = "100000000";
const PLANNED_DAILY_BURN = "273972";

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
      startDate: null,
      verifiedBurnedMA: null,
      verifiedRemainingMA: null,
      latestTransaction: null
    },
    motherFund: {
      plannedAllocationMA: PLANNED_MOTHER_FUND,
      initialSupplySharePercent: "3",
      verifiedReferenceValueUSD: null,
      disbursementsEnabled: false
    },
    missingForLiveMode: [
      "published MA token address and ABI",
      "funded reserve and vault addresses",
      "audited burn execution contract",
      "final burn semantics and 220 MA remainder policy",
      "verified MA market-price source",
      "server-issued card ownership ledger and replay-safe claim service"
    ]
  });
}
