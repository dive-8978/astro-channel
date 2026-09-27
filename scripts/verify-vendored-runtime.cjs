const crypto = require('node:crypto');
const fs = require('node:fs');
const path = require('node:path');

const root = path.resolve(__dirname, '..');
const publicDir = path.join(root, 'public');
const manifestPath = path.join(publicDir, 'vendor', 'manifest.json');
const manifest = JSON.parse(fs.readFileSync(manifestPath, 'utf8'));

function sha256(file) {
  return crypto.createHash('sha256').update(fs.readFileSync(file)).digest('hex');
}

function walk(dir, predicate = () => true) {
  const result = [];
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const file = path.join(dir, entry.name);
    if (entry.isDirectory()) result.push(...walk(file, predicate));
    else if (predicate(file)) result.push(file);
  }
  return result;
}

let checkedFiles = 0;
for (const component of manifest.components) {
  if (!component.name || !component.version || !component.license || !component.notice) {
    throw new Error(`Incomplete component record: ${JSON.stringify(component)}`);
  }
  const notice = path.join(root, component.notice);
  if (!fs.existsSync(notice)) throw new Error(`Missing license notice: ${component.notice}`);
  for (const record of component.files) {
    const file = path.join(root, record.path);
    if (!fs.existsSync(file)) throw new Error(`Missing vendored file: ${record.path}`);
    const stat = fs.statSync(file);
    if (stat.size !== record.bytes) throw new Error(`Size mismatch: ${record.path}`);
    if (sha256(file) !== record.sha256) throw new Error(`SHA-256 mismatch: ${record.path}`);
    checkedFiles += 1;
  }
  for (const reference of component.references) {
    if (!fs.existsSync(path.join(root, reference))) {
      throw new Error(`Missing component reference file: ${reference}`);
    }
  }
}

for (const asset of manifest.visualAssets) {
  const file = path.join(root, asset.path);
  if (!fs.existsSync(file)) throw new Error(`Missing visual asset: ${asset.path}`);
  if (fs.statSync(file).size !== asset.bytes || sha256(file) !== asset.sha256) {
    throw new Error(`Visual asset integrity mismatch: ${asset.path}`);
  }
  if (!asset.license || !asset.credit || !asset.terms) {
    throw new Error(`Incomplete visual asset rights record: ${asset.path}`);
  }
}

for (const service of manifest.externalServices || []) {
  if (!service.name || !service.purpose || !Array.isArray(service.references) || service.references.length === 0) {
    throw new Error(`Incomplete external service record: ${JSON.stringify(service)}`);
  }
  if (!service.origin && !service.originPattern) {
    throw new Error(`External service has no origin: ${service.name}`);
  }
  for (const reference of service.references) {
    if (!fs.existsSync(path.join(root, reference))) {
      throw new Error(`Missing external-service reference file: ${reference}`);
    }
  }
}

// Every URL emitted by vendored CSS must resolve to a supplied local file.
for (const cssFile of walk(path.join(publicDir, 'vendor'), (file) => file.endsWith('.css'))) {
  const css = fs.readFileSync(cssFile, 'utf8');
  for (const match of css.matchAll(/url\(([^)]+)\)/g)) {
    const value = match[1].trim().replace(/^['"]|['"]$/g, '');
    if (/^(?:data:|https?:)/.test(value)) {
      throw new Error(`Remote or embedded URL in vendored CSS: ${path.relative(root, cssFile)} -> ${value}`);
    }
    const target = path.resolve(path.dirname(cssFile), value.split(/[?#]/, 1)[0]);
    if (!fs.existsSync(target)) {
      throw new Error(`Broken vendored CSS URL: ${path.relative(root, cssFile)} -> ${value}`);
    }
  }
}

const deployHtml = [path.join(root, 'index.html'), ...walk(publicDir, (file) => file.endsWith('.html'))];
// Keep the inventory aligned with the deployed pages and the retained bridge
// source pages, without treating the latter as part of the deployment artifact.
const referenceHtml = [...deployHtml];
for (const sourceDir of ['astro-bridge', 'bridge']) {
  const dir = path.join(root, sourceDir);
  if (fs.existsSync(dir)) referenceHtml.push(...walk(dir, (file) => file.endsWith('.html')));
}
for (const component of manifest.components) {
  const localPrefix = `/${path.relative(publicDir, path.dirname(path.join(root, component.notice))).split(path.sep).join('/')}/`;
  const actualReferences = referenceHtml
    .filter((file) => fs.readFileSync(file, 'utf8').includes(localPrefix))
    .map((file) => path.relative(root, file).split(path.sep).join('/'))
    .sort();
  if (JSON.stringify([...component.references].sort()) !== JSON.stringify(actualReferences)) {
    throw new Error(`Stale component references for ${component.name}@${component.version}: expected ${actualReferences.join(', ')}`);
  }
}

for (const htmlFile of deployHtml) {
  const html = fs.readFileSync(htmlFile, 'utf8');
  for (const match of html.matchAll(/<script\b[^>]*\bsrc=["']([^"']+)["'][^>]*>/gi)) {
    if (/^https?:/.test(match[1])) {
      throw new Error(`Remote executable script: ${path.relative(root, htmlFile)} -> ${match[1]}`);
    }
  }
  for (const match of html.matchAll(/<link\b[^>]*>/gi)) {
    const tag = match[0];
    if (!/\brel=["'][^"']*stylesheet/i.test(tag)) continue;
    const href = tag.match(/\bhref=["']([^"']+)["']/i)?.[1];
    if (href && /^https?:/.test(href)) {
      throw new Error(`Remote stylesheet: ${path.relative(root, htmlFile)} -> ${href}`);
    }
  }
  for (const match of html.matchAll(/<img\b[^>]*\bsrc=["']([^"']+)["'][^>]*>/gi)) {
    if (/^https?:/.test(match[1])) {
      throw new Error(`Remote image: ${path.relative(root, htmlFile)} -> ${match[1]}`);
    }
  }
  for (const match of html.matchAll(/(?:src|href)=["'](\/(?:vendor|assets\/third-party)\/[^"']+)["']/gi)) {
    const target = path.join(publicDir, match[1].replace(/^\//, '').split(/[?#]/, 1)[0]);
    if (!fs.existsSync(target)) {
      throw new Error(`Broken frozen-asset reference: ${path.relative(root, htmlFile)} -> ${match[1]}`);
    }
  }
  for (const match of html.matchAll(/url\(["']?(https?:\/\/[^)'"\s]+)/gi)) {
    throw new Error(`Remote CSS image: ${path.relative(root, htmlFile)} -> ${match[1]}`);
  }
}

const mapPage = fs.readFileSync(path.join(publicDir, 'global-console.html'), 'utf8');
for (const requiredMapReference of [
  'https://tile.openstreetmap.org/{z}/{x}/{y}.png',
  '/vendor/leaflet/1.9.4/leaflet.css',
  '/vendor/leaflet/1.9.4/leaflet.js',
  'https://www.openstreetmap.org/copyright',
  'OpenStreetMap contributors',
]) {
  if (!mapPage.includes(requiredMapReference)) {
    throw new Error(`Missing map asset or attribution: ${requiredMapReference}`);
  }
}
if (!/attribution\s*:\s*['"][^\n]*https:\/\/www\.openstreetmap\.org\/copyright[^\n]*OpenStreetMap contributors/.test(mapPage)) {
  throw new Error('The Leaflet map must display linked OpenStreetMap attribution.');
}
const mapService = (manifest.externalServices || []).find((service) => service.origin === 'https://tile.openstreetmap.org');
if (!mapService || !mapService.references.includes('public/global-console.html') ||
    mapService.copyright !== 'https://www.openstreetmap.org/copyright' ||
    mapService.usagePolicy !== 'https://operations.osmfoundation.org/policies/tiles/') {
  throw new Error('Missing OpenStreetMap tile-service provenance or usage-policy record.');
}

const vercelConfig = fs.readFileSync(path.join(root, 'vercel.json'), 'utf8');
for (const forbiddenOrigin of [
  'cdn.tailwindcss.com',
  'cdn.jsdelivr.net',
  'cdnjs.cloudflare.com',
  'fonts.googleapis.com',
  'fonts.gstatic.com',
  'unpkg.com',
]) {
  if (vercelConfig.includes(forbiddenOrigin)) {
    throw new Error(`Obsolete runtime origin remains in CSP: ${forbiddenOrigin}`);
  }
}

console.log(`Vendored runtime verified: ${manifest.components.length} components, ${checkedFiles} files, ${manifest.visualAssets.length} visual asset.`);
