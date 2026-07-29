importScripts("/ma-download-manifest.js");

const RELEASE_PART_SIZE = 40 * 1024 * 1024;
const NETWORK_CHUNK_SIZE = 2 * 1024 * 1024;
const MAX_RETRIES = 5;

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
        for (let partIndex = 0; partIndex < download.parts.length; partIndex += 1) {
          const partUrl = download.parts[partIndex];
          const bytesRemaining = download.size - (partIndex * RELEASE_PART_SIZE);
          const partSize = Math.min(RELEASE_PART_SIZE, bytesRemaining);

          for (let start = 0; start < partSize; start += NETWORK_CHUNK_SIZE) {
            const end = Math.min(start + NETWORK_CHUNK_SIZE, partSize) - 1;
            controller.enqueue(await fetchRange(partUrl, start, end));
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

async function fetchRange(url, start, end) {
  const expectedLength = end - start + 1;
  let lastError;

  for (let attempt = 1; attempt <= MAX_RETRIES; attempt += 1) {
    try {
      const response = await fetch(url, {
        headers: { Range: `bytes=${start}-${end}` },
        cache: "no-store"
      });
      if (response.status !== 206 && response.status !== 200) {
        throw new Error(`Unexpected response: ${response.status}`);
      }

      const bytes = new Uint8Array(await response.arrayBuffer());
      if (bytes.byteLength !== expectedLength) {
        throw new Error(`Incomplete range: ${bytes.byteLength}/${expectedLength}`);
      }
      return bytes;
    } catch (error) {
      lastError = error;
      if (attempt < MAX_RETRIES) {
        await new Promise(resolve => setTimeout(resolve, attempt * 500));
      }
    }
  }

  throw lastError || new Error("Range download failed.");
}
