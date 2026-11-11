const LOOKUP_ORIGIN = "https://130.94.65.212";
const REFERENCE = /^(?:0x[0-9a-f]{64}|[a-z0-9_-]{1,64})$/i;

export default async function handler(request, response) {
  response.setHeader("Cache-Control", "no-store");
  response.setHeader("X-Content-Type-Options", "nosniff");
  if (request.method !== "GET") {
    response.setHeader("Allow", "GET");
    return response.status(405).json({ error: "METHOD_NOT_ALLOWED" });
  }
  const ref = request.query?.ref;
  if (typeof ref !== "string" || !REFERENCE.test(ref)) {
    return response.status(400).json({ error: "INVALID_REFERENCE" });
  }
  try {
    const upstream = await fetch(LOOKUP_ORIGIN + "/v1/directory/resolve/" + encodeURIComponent(ref), {
      headers: { Accept: "application/json" },
      signal: AbortSignal.timeout(8000),
      redirect: "error"
    });
    if (!upstream.ok) {
      const errors = { 404: "RECORD_NOT_FOUND", 409: "RECORD_PROOF_FAILED", 410: "RECORD_UNAVAILABLE", 429: "RATE_LIMITED" };
      return response.status(errors[upstream.status] ? upstream.status : 502).json({
        error: errors[upstream.status] || "LOOKUP_UNAVAILABLE"
      });
    }
    const record = await upstream.json();
    const item = record.kind === "robot" ? record.robot : record.part;
    const hash = record.proof?.hash;
    if (!item || !/^0x[0-9a-f]{64}$/i.test(hash || "") || record.proof?.status !== "verified") {
      return response.status(502).json({ error: "LOOKUP_UNAVAILABLE" });
    }
    if (/^0x/i.test(ref) && hash.toLowerCase() !== ref.toLowerCase()) {
      return response.status(502).json({ error: "LOOKUP_UNAVAILABLE" });
    }
    return response.status(200).json({
      name: String(item.name || item.model || "").slice(0, 240),
      manufacturer: String(record.manufacturer?.name || "").slice(0, 240),
      registrationHash: hash,
      integrityVerified: true,
      chainReceiptStatus: "INTEGRATION_PENDING"
    });
  } catch {
    return response.status(503).json({ error: "LOOKUP_UNAVAILABLE" });
  }
}
