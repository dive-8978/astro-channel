const HEALTH_URL = "https://api.astrochannel.one/health";
const READINESS_URL = "https://api.astrochannel.one/api/integrations/readiness";

async function readResponse(response) {
  const contentType = response.headers.get("content-type") || "";
  if (contentType.includes("application/json")) return response.json();
  return response.text();
}

export default async function handler(request, response) {
  response.setHeader("Cache-Control", "public, max-age=0, s-maxage=30, stale-while-revalidate=90");
  if (request.method !== "GET") {
    response.setHeader("Allow", "GET");
    return response.status(405).json({ ok: false, error: "method_not_allowed" });
  }

  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 5000);
  try {
    const [healthResponse, readinessResponse] = await Promise.all([
      fetch(HEALTH_URL, { headers: { accept: "text/plain, application/json" }, signal: controller.signal }),
      fetch(READINESS_URL, { headers: { accept: "application/json" }, signal: controller.signal })
    ]);
    const health = await readResponse(healthResponse);
    const readiness = await readResponse(readinessResponse);
    const ok = healthResponse.ok && readinessResponse.ok && readiness?.success === true;
    return response.status(ok ? 200 : 503).json({
      ok,
      checkedAt: new Date().toISOString(),
      health: typeof health === "string" ? health : health?.status || null,
      release: readiness?.release || null,
      maRequestAuthVersion: readiness?.maRequestAuth?.version || null,
      routes: readiness?.routes || null
    });
  } catch (error) {
    return response.status(503).json({
      ok: false,
      checkedAt: new Date().toISOString(),
      error: error?.name === "AbortError" ? "upstream_timeout" : "upstream_unavailable"
    });
  } finally {
    clearTimeout(timeout);
  }
}
