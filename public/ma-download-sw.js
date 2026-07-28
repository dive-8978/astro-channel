importScripts("/ma-download-manifest.js");

self.addEventListener("install", event => {
  event.waitUntil(self.skipWaiting());
});

self.addEventListener("activate", event => {
  event.waitUntil(self.clients.claim());
});

self.addEventListener("fetch", event => {
  const requestUrl = new URL(event.request.url);
  if (!requestUrl.pathname.startsWith("/ma-download/")) return;

  const filename = decodeURIComponent(requestUrl.pathname.slice("/ma-download/".length));
  const download = self.MA_DOWNLOADS[filename];
  if (!download) {
    event.respondWith(new Response("Download not found.", { status: 404 }));
    return;
  }

  event.respondWith(streamDownload(filename, download));
});

async function streamDownload(filename, download) {
  const stream = new ReadableStream({
    async start(controller) {
      try {
        for (const partUrl of download.parts) {
          const response = await fetch(partUrl, { cache: "force-cache" });
          if (!response.ok || !response.body) {
            throw new Error(`Part download failed: ${response.status}`);
          }

          const reader = response.body.getReader();
          while (true) {
            const { done, value } = await reader.read();
            if (done) break;
            controller.enqueue(value);
          }
        }
        controller.close();
      } catch (error) {
        controller.error(error);
      }
    }
  });

  return new Response(stream, {
    headers: {
      "Content-Type": download.type,
      "Content-Length": String(download.size),
      "Content-Disposition": `attachment; filename="${filename}"`,
      "Cache-Control": "no-store",
      "X-Content-Type-Options": "nosniff"
    }
  });
}
