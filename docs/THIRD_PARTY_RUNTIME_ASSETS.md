# Third-party runtime asset freeze

Status: **technical preparation; designated legal review and release approval are pending**

Inventory date: 2026-09-27

Machine-readable record: `public/vendor/manifest.json`

This record freezes the executable, stylesheet, font, and approved visual bytes
used by the current public website. It is preparation evidence only. It is not
an OpenChain conformance claim, an independent audit, or legal approval.

## Resolved in this preparation branch

| Runtime item | Frozen version | License record | Website use |
|---|---:|---|---|
| Tailwind browser runtime | 3.4.17 | MIT, local `LICENSE` | AstroSwap, console, fast, products, roadmap |
| Font Awesome Free | 7.3.1 | icons CC BY 4.0; fonts OFL 1.1; code MIT, local `LICENSE.txt` | console, fast, products |
| Inter | Fontsource 5.3.0 | OFL 1.1 with upstream copyright notice | general site typography |
| Space Grotesk | Fontsource 5.3.0 | OFL 1.1 with upstream copyright notice | MA program and roadmap pages |
| Orbitron | Fontsource 5.3.0 | OFL 1.1 with upstream copyright notice | bridge and console headings |
| Exo 2 | Fontsource 5.3.0 | OFL 1.1 with upstream copyright notice | bridge and console body text |
| Three.js | 0.134.0, 0.150.1, 0.168.0 | MIT, one local notice per version | home and developer visualizations |
| Ethers | 5.7.2, 6.13.2 | MIT, one local notice per version | wallet/transfer pages |
| Leaflet | 1.9.4 | BSD-2-Clause, local `LICENSE` | global console |
| particles.js | 2.0.0 | MIT, local `LICENSE.md` | community, MemeAstro, technology |
| Lucide | 0.468.0 | ISC, local `LICENSE` | pain-points page |
| Chart.js | 4.5.1 | MIT, local `LICENSE.md` | legacy bridge source page |

All files above are served from `/vendor/`. The manifest records the SHA-256
and byte size of every supplied file. `npm run test:vendor` checks those bytes,
their license records, page references, local CSS URLs, and rejects remote
runtime scripts, stylesheets, and images from the deployed HTML surface. The
deployment CSP no longer permits the retired CDN and Google Fonts origins.

The previous Google Fonts requests were replaced by exact WOFF2 files from
Fontsource 5.3.0. All subsets supplied for each selected weight were preserved,
including Inter Cyrillic and Greek coverage used by the multilingual interface.

The Tailwind file is the exact immutable 3.4.17 browser artifact to which the
former floating URL redirected on 2026-09-27. This removes release drift, but a
future approved release should still prefer build-time compiled Tailwind CSS to
remove the browser compiler.

## Approved visual asset

The three terminal pages now serve a frozen 489,369-byte ESA/Webb screensize
JPEG with SHA-256
`fd1e98f53a2e6574a1329267d6295822dc63dd16b6e9540c7e61ba1d0b4019ac`.
The source page identifies it as “Pillars of Creation (NIRCam and MIRI Composite
Image).” ESA/Webb publishes the image under CC BY 4.0 and requires the full image
credit to remain clearly visible. Each page now renders this exact linked credit:

> NASA, ESA, CSA, STScI, J. DePasquale (STScI), A. Pagan (STScI), A. M. Koekemoer (STScI)

Sources:

- https://esawebb.org/images/pillarsofcreation_composite/
- https://esawebb.org/copyright/

The prior ESA asset URL returned HTTP 404 on 2026-09-27. The local derivative
therefore also repairs a missing production background without changing the
chosen image.

## Removed remote wallet marks

`public/console.html` no longer downloads wallet logos from Wikimedia or
Flaticon. The “Coinbase Wallet” card previously displayed a Bitcoin.com logo
and used a Flaticon fallback. Both wallet cards now use neutral Font Awesome
icons already covered by the vendored Font Awesome record. This avoids a false
brand association and removes three mutable remote image requests.

## Remaining blockers and boundaries

1. **OpenStreetMap tiles remain an external service.** Leaflet is now local,
   the page uses the policy-required `tile.openstreetmap.org` URL and links
   visible OpenStreetMap copyright attribution. Tile bytes and availability are
   intentionally not frozen or bulk-downloaded because OSMF prohibits scraping
   and offline prefetch on its community service. Company review of the service
   policy, expected traffic, privacy boundary, and production provider is still
   required. Policy: https://operations.osmfoundation.org/policies/tiles/
2. **The legacy `astro-bridge/bridge.html` LiFi SDK URL returns HTTP 404.** It is
   outside the Vite deployment artifact and was not replaced because LiFi 2.7.0
   does not supply the referenced UMD file; migration is a functional code
   change requiring bridge tests.
3. **`src/utils/lifiHelper.js` uses a non-existent `@latest` UMD widget URL.**
   The helper is not part of the current static entry, but it must be removed or
   migrated before that React source is admitted to the supported release.
4. **`src/Home.jsx` references an Unsplash URL.** The component is not imported
   by the current static entry and the image is absent from the built artifact.
   Rights/provenance review or an approved local replacement is required before
   activating it.
5. Package metadata and upstream license texts have been preserved, but the
   designated compliance/legal reviewer must still approve the final license
   obligations, notices, trademark treatment, and release record.

## Blocker mapping

- B-001: floating Tailwind bytes resolved technically; build-time compilation
  remains a recommended improvement.
- B-002: Font Awesome version, CSS, fonts, hashes, and multi-license notice are
  frozen; final legal approval remains pending.
- B-003: Google Fonts runtime calls are removed from the deploy surface and
  exact OFL font files/notices are supplied.
- B-004: listed CDN components are vendored and represented in the runtime
  manifest; the two unused/broken LiFi source references remain open and a final
  release SBOM merge is still required.
- B-014: the ESA image and wallet-logo requests are resolved; OpenStreetMap is
  documented but remains an external-service blocker until company approval or
  migration to an approved provider.
