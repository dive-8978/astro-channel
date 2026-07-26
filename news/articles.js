window.ASTRO_ARTICLES = [
  {
    slug: "building-open-infrastructure-in-public",
    title: "Why We Are Building Astro Open Infrastructure in Public",
    dek: "A founder’s note on turning separate products into an inspectable, non-custodial protocol framework.",
    type: "Founder Note",
    section: "Institution",
    date: "2026-07-26",
    displayDate: "July 26, 2026",
    byline: "Founder’s Office",
    image: "/assets/news-astrobridge.png",
    body: [
      "We began with practical products: a system for expressing and checking intent, a wallet for authorization, a conversational interface, a reference ledger and a mobile world for edge participation. The next responsibility is to make the rules between those products public. That is why we formed Astro Open Infrastructure as an unincorporated international open-protocol initiative.",
      "The institution is not presented as a registered company, foundation, charity or recognized standards body. Its purpose is narrower and more useful today: publish the charter, define an RFC process, document interoperability boundaries and keep claims tied to evidence. A public specification can be challenged, implemented independently and improved without requiring trust in a private roadmap.",
      "Our core position is simple. Human authorization must remain above autonomous execution. Wallets should retain custody. Safety decisions should be explainable. Intent fingerprints and signed receipts should make important steps verifiable without publishing unnecessary private information.",
      "We are building this record in stages. Some components are running public services, some are tested reference implementations and others remain research. We will state those differences directly. The credibility of open infrastructure comes from reproducible work, not from calling an unfinished system complete.",
      "The invitation is open to engineers, security researchers, node operators, writers and translators. Contribution does not promise a token, return or governance right. It creates a public technical record that the wider internet can inspect and reuse."
    ],
    facts: [
      "Founding charter version 0.1 is published.",
      "RFC-0002 and RFC-0003 are marked implemented at version 0.1.",
      "The initiative explicitly discloses its unincorporated status."
    ],
    status: "Institutional framework in public draft. It is not a government-recognized standards organization.",
    links: [
      { label: "Charter and RFC framework", url: "https://www.astrochannel.one/open-infrastructure.html" },
      { label: "Official website", url: "https://www.astrochannel.one/" }
    ]
  },
  {
    slug: "open-safety-layer-public-beta",
    title: "Astro Open Safety Layer Public Beta Is Live",
    dek: "A free, non-custodial API now provides deterministic intent checks, fingerprints and signed safety receipts.",
    type: "Engineering Update",
    section: "Engineering",
    date: "2026-07-25",
    displayDate: "July 25, 2026",
    byline: "Astro Open Infrastructure Engineering",
    image: "/assets/news-open-safety-layer.png",
    body: [
      "The Astro Open Safety Layer public beta is available as a free protocol service and an Apache-2.0 reference implementation. It accepts a structured intent, applies deterministic checks and returns an explainable decision without taking custody of funds or requesting a private key.",
      "Every assessment is bound to an intent fingerprint. The service can issue an Ed25519-signed safety receipt that links that fingerprint to simulation and assessment hashes. A client can retrieve the current public key and verify the receipt independently instead of trusting a screenshot or a dashboard state.",
      "The public endpoint also exposes OpenAPI discovery and a TypeScript SDK. Rate limits, request size controls and an open safety-feed workflow are included in the current implementation. The automated test suite covers five core behaviors, and the build and tests pass in the verified local release.",
      "This beta is a starting point, not a security certification. It has not completed an independent production audit. The current public health response discloses that the service is non-custodial, uses a persistent signing key and has no configured RPC chains or active external safety-feed entries at the time of publication.",
      "Developers can use the hosted endpoint or self-host the code. Our next work is to widen reproducible test vectors, add reviewed evidence sources and gather implementation feedback before any stability claim."
    ],
    facts: [
      "Public health endpoint returns status “ok” and custody “false.”",
      "Local build and five automated tests pass.",
      "Code is published under Apache-2.0.",
      "Receipts use Ed25519 signatures."
    ],
    status: "Public beta. No claim of independent audit, production certification or universal chain coverage.",
    links: [
      { label: "Public API", url: "https://astro-open-safety-layer.vercel.app" },
      { label: "Source code", url: "https://github.com/dive-8978/astro-open-safety-layer" },
      { label: "Product page", url: "https://www.astrochannel.one/open-safety-layer.html" }
    ]
  },
  {
    slug: "aoi-intent-envelope",
    title: "AOI Intent Envelope: A Portable Identity for Web3 Intent",
    dek: "RFC-0002 defines a chain-neutral structure for actors, actions, constraints and deterministic fingerprints.",
    type: "Protocol Brief",
    section: "Protocol",
    date: "2026-07-24",
    displayDate: "July 24, 2026",
    byline: "Astro Open Infrastructure Protocol Group",
    image: "/assets/news-astrobridge.png",
    body: [
      "Web3 applications often describe the same action in incompatible ways. A swap request in a wallet, an agent instruction in a chat and an execution request in a bridge may carry equivalent meaning but produce different records. The Astro Open Intent Envelope is our first public attempt to give that meaning a portable identity.",
      "The envelope separates the actor, requested action, target chain, assets and enforceable constraints. Fields are normalized before fingerprinting so that equivalent documents can produce a stable identifier. The fingerprint can then connect safety assessment, routing, authorization and execution records without placing a private key or full personal history on a public ledger.",
      "Portability matters because no single Astro product should own the intent. MA can originate a conversational request. AstroWallet AI can attach authorization. AstroBridge can assess and route it. AstroAI Chain can retain a fingerprint and proof record. Other implementations should be able to join the same flow by following the published structure.",
      "RFC-0002 is marked implemented at version 0.1 in the current framework, but implementation does not mean final standardization. Field naming, canonicalization rules and cross-language test vectors need broader review. We expect adversarial input, encoding differences and chain-specific semantics to expose weaknesses.",
      "The protocol group is publishing the envelope early so those weaknesses can be found in public. The goal is not a new token dependency. It is a small interoperability primitive that wallets, agents and execution systems can reproduce."
    ],
    facts: [
      "RFC-0002 is published as implemented version 0.1.",
      "The envelope is chain-neutral and does not contain private keys.",
      "Deterministic normalization precedes fingerprinting."
    ],
    status: "Version 0.1 interoperability primitive. Cross-language compatibility review remains future work.",
    links: [
      { label: "Open Infrastructure RFC index", url: "https://www.astrochannel.one/open-infrastructure.html#rfc" },
      { label: "Safety Layer API", url: "https://astro-open-safety-layer.vercel.app" }
    ]
  },
  {
    slug: "signed-safety-receipts",
    title: "Signed Safety Receipts: Verification After Assessment",
    dek: "RFC-0003 links an intent fingerprint to the exact assessment evidence returned by a safety service.",
    type: "Protocol Brief",
    section: "Protocol",
    date: "2026-07-23",
    displayDate: "July 23, 2026",
    byline: "Astro Open Infrastructure Protocol Group",
    image: "/assets/news-open-safety-layer.png",
    body: [
      "A safety result is useful only if a client can prove which intent was assessed and whether the result was altered. The Astro Safety Receipt addresses that boundary with a compact signed statement.",
      "The receipt binds an intent fingerprint to hashes representing simulation and safety assessment output. The reference service signs the statement with Ed25519 and exposes its current public key. A wallet, agent or independent verifier can check the signature after receiving the response. This makes the assessment record portable across interfaces and easier to audit after an execution decision.",
      "A signed receipt does not make an unsafe action safe. It does not guarantee that every chain state was observed, that an RPC provider was honest or that the underlying rules detected every exploit. It proves a narrower fact: a particular service key signed a particular assessment record for a particular fingerprint.",
      "Keeping that claim narrow is important. Security infrastructure becomes dangerous when cryptographic proof is used to imply more than it actually establishes. RFC-0003 therefore belongs beside explicit service status, key rotation policy, test vectors and disclosure of data sources.",
      "The current reference implementation demonstrates receipt creation and verification. Future work includes independent implementations, stable key-history discovery and broader compatibility tests. We welcome review focused on canonicalization, replay boundaries and operational key management."
    ],
    facts: [
      "RFC-0003 is published as implemented version 0.1.",
      "The reference receipt uses Ed25519.",
      "The public service exposes its current verification key."
    ],
    status: "A receipt proves authorship and record integrity; it is not an audit or guarantee of transaction safety.",
    links: [
      { label: "Current public key endpoint", url: "https://astro-open-safety-layer.vercel.app/v1/keys/current" },
      { label: "Reference implementation", url: "https://github.com/dive-8978/astro-open-safety-layer" }
    ]
  },
  {
    slug: "astroai-chain-core-flow-tests",
    title: "AstroAI Chain Reference Ledger Passes Core Flow Tests",
    dek: "The TypeScript service now covers hash-linked records, edge tasks, contribution consensus and execution proofs.",
    type: "Engineering Update",
    section: "Engineering",
    date: "2026-07-22",
    displayDate: "July 22, 2026",
    byline: "Astro Open Infrastructure Engineering",
    image: "/assets/news-astroai-chain.png",
    body: [
      "AstroAI Chain has moved beyond its whitepaper into a working TypeScript reference service. The current implementation creates privacy-preserving intent fingerprints, appends hash-linked blocks, assigns work to edge AI nodes and records micro-contributions through a threshold-based consensus flow.",
      "The service also stores execution receipts and exposes world-state data designed for AstroRealms. Snapshot restore is covered so a reference node can persist and recover its state. In the latest local verification, the TypeScript build completed and all three core integration tests passed.",
      "Those tests cover three connected paths: fingerprint creation with block linking; edge contribution with micro-consensus; and execution receipt storage with snapshot recovery. This is meaningful engineering progress because the components now operate as one service rather than isolated examples.",
      "It is equally important to state what has not been built. AstroAI Chain is not a completed public mainnet. It does not yet have independently operated validators, authenticated production node identities, replicated consensus storage, an external security audit or a published genesis policy. The present release is a reference root-chain service for protocol development and integration.",
      "Our next milestone is to harden network identity and replication while keeping the data model compatible with the intent envelope and safety receipts. Public test vectors and independently reproducible nodes will matter more than a premature mainnet label."
    ],
    facts: [
      "TypeScript build passes.",
      "Three core integration tests pass.",
      "World-state, receipt and snapshot APIs are implemented.",
      "The README explicitly identifies the release as a reference service."
    ],
    status: "Working reference implementation, not a completed public mainnet.",
    links: [
      { label: "Protocol framework", url: "https://www.astrochannel.one/open-infrastructure.html" },
      { label: "Official website", url: "https://www.astrochannel.one/" }
    ]
  },
  {
    slug: "community-built-superchain",
    title: "What We Mean by a Community-Built Superchain",
    dek: "The network starts at the edge: each installation can become a small contributor to a system that grows in capability over time.",
    type: "Founder Note",
    section: "Institution",
    date: "2026-07-21",
    displayDate: "July 21, 2026",
    byline: "Founder’s Office",
    image: "/assets/news-astroai-chain.png",
    body: [
      "Most blockchain stories begin with a network that is already defined and ask people to join it. Our research begins in the opposite direction. We imagine software that can activate a constrained edge node when a person installs it, then gradually assemble useful network capacity from many independent participants.",
      "A phone should not pretend to be a data-center validator. It can contribute smaller things: availability, bounded inference tasks, signed observations, test participation or relay capacity under clear battery, bandwidth and consent controls. Stronger home and server nodes can accept heavier roles. Contribution records should reflect verifiable work rather than passive installation.",
      "At a large scale, this model could create a community-built superchain whose capability emerges as participation grows. The number ten million is a long-term design target, not a current user count or guaranteed completion threshold. Reaching it would require robust identity, Sybil resistance, privacy protection, replicated consensus, sustainable incentives and governance that independent operators can trust.",
      "AstroAI Chain is the current reference ledger for exploring that architecture. AstroRealms turns selected contribution states into a mobile game experience so participation can be understandable rather than hidden in a background process.",
      "We are publishing the idea as research because architecture should be tested before economics are promised. The first proof is not a token price. It is whether independent devices can perform bounded work, produce verifiable records and leave the user in control."
    ],
    facts: [
      "The ten-million-node concept is a long-term research target.",
      "Current software is a reference implementation.",
      "No active token economics or participation return is promised."
    ],
    status: "Architecture and research roadmap. No claim of a live superchain or current global node count.",
    links: [
      { label: "Astro Open Infrastructure", url: "https://www.astrochannel.one/open-infrastructure.html" }
    ]
  },
  {
    slug: "astrorealms-mobile-game-loop",
    title: "AstroRealms Turns Edge Contribution Into a Mobile Game Loop",
    dek: "A Three.js world connects node activation, shards, contributions and flagship construction to AstroAI Chain state.",
    type: "Product Update",
    section: "Products",
    date: "2026-07-20",
    displayDate: "July 20, 2026",
    byline: "AstroRealms Product Team",
    image: "/assets/news-astrorealms.png",
    body: [
      "Infrastructure is usually invisible. AstroRealms explores a different interface: a mobile 3D world where edge-node participation becomes a visible construction process.",
      "A player can activate a node, receive a shard, submit a hashed contribution and use verified progress to assemble flagship modules. The vessel in the center is not intended as a decorative progress bar. Its world state is designed to consume AstroAI Chain data so construction reflects recorded contribution events.",
      "The current Vite, React and Three.js frontend builds successfully. It supports Kids, Explorer and Data modes for different levels of detail. The experience is designed around touch input and a game-like visual hierarchy rather than a desktop protocol dashboard.",
      "The product still has a clear boundary between interface and network reality. A rendered module does not by itself prove valuable distributed work. That proof must come from authenticated tasks, accepted contributions and ledger records. The game should visualize those facts, not replace them.",
      "The next release path includes deeper Android device testing, stronger world-state synchronization and more meaningful construction tasks. AstroRealms will remain honest about simulated state while the underlying edge network advances from reference implementation toward independently operated testing."
    ],
    facts: [
      "Vite production build passes.",
      "Frontend uses React and Three.js.",
      "Kids, Explorer and Data modes are implemented.",
      "World-state integration targets AstroAI Chain."
    ],
    status: "Working 3D frontend and reference integration. Network-scale contribution is not yet claimed.",
    links: [
      { label: "Open protocol framework", url: "https://www.astrochannel.one/open-infrastructure.html" }
    ]
  },
  {
    slug: "ma-human-ai-intent-interface",
    title: "MA: The Human and AI Intent Interface",
    dek: "MA connects person-to-person and person-to-agent conversation with wallet-aware intent and mobile control.",
    type: "Product Update",
    section: "Products",
    date: "2026-07-19",
    displayDate: "July 19, 2026",
    byline: "MA Product Team",
    image: "/assets/news-ma.png",
    body: [
      "The public name of our conversational product is MA. Its role in the Astro system is to help a person express intent naturally before any asset-affecting action reaches authorization or execution.",
      "Conversation can connect people to people and people to AI agents, but language alone is not a transaction approval. MA is designed to pass structured, wallet-aware intent into the wider stack. AstroBridge can assess and route that intent, while AstroWallet AI remains responsible for the user’s authorization boundary.",
      "This separation matters as agents become more capable. An agent may help compare routes, prepare an action or explain a warning. It should not silently inherit custody or turn conversational ambiguity into an irreversible transaction. The open intent envelope gives the interface a defined handoff rather than an opaque internal command.",
      "The current MA project passes its local asset and source diagnostics. The application has already been developed as a separate product, so this newsroom update does not announce a rewrite or a new independent audit. It clarifies MA’s public name and its responsibility inside Astro Open Infrastructure.",
      "Future work will focus on interoperability at the intent boundary: consistent fingerprints, explainable safety results and receipts that can be carried back into a conversation. The goal is a calmer human interface for complex networks without pretending that a chat window can remove every risk."
    ],
    facts: [
      "MA is the public product name.",
      "Local project diagnostics pass.",
      "Wallet authorization remains separate from conversational intent."
    ],
    status: "Product integration update. No claim of independent security audit or universal agent compatibility.",
    links: [
      { label: "MA product page", url: "https://www.astrochannel.one/painpoints.html" },
      { label: "Official website", url: "https://www.astrochannel.one/" }
    ]
  },
  {
    slug: "astrowallet-authorization-at-edge",
    title: "AstroWallet AI Keeps Assets and Authorization at the Edge",
    dek: "The wallet acts as the asset and signature entry point while intent assessment and routing remain separate services.",
    type: "Product Update",
    section: "Products",
    date: "2026-07-18",
    displayDate: "July 18, 2026",
    byline: "AstroWallet AI Product Team",
    image: "/assets/news-astrowallet.png",
    body: [
      "AstroWallet AI is the asset and signature entry point in the Astro architecture. That wording is deliberate: the wallet authorizes, while other components can prepare, assess and route an intent.",
      "A user may begin in MA, a compatible agent or another application. AstroBridge can normalize the request and evaluate possible execution paths. The Open Safety Layer can provide a fingerprint, deterministic checks and a signed receipt. None of those services should receive the user’s private key. The final asset-affecting approval returns to the wallet boundary.",
      "The current project includes local wallet control, multi-chain interfaces, biometric authorization paths and intent routing integration. Its TypeScript type check passes in the verified local version. That is an engineering status statement, not a claim that every supported network or device has received independent production review.",
      "We believe wallets become more useful when they can consume open evidence instead of presenting an unexplained confirm button. A portable intent fingerprint and receipt can help a person compare what was requested, what was assessed and what is being signed.",
      "The next work is to strengthen interoperability with the public intent and receipt specifications, expand device testing and publish clearer compatibility boundaries. Custody remains with the user; automation remains subordinate to authorization."
    ],
    facts: [
      "TypeScript type check passes.",
      "The wallet is designed as a non-custodial authorization boundary.",
      "Intent assessment and routing are separate from signature approval."
    ],
    status: "Active product development. No claim of complete chain coverage or independent production audit.",
    links: [
      { label: "AstroWallet AI overview", url: "https://www.astrochannel.one/roadmap.html" },
      { label: "Open Infrastructure charter", url: "https://www.astrochannel.one/open-infrastructure.html" }
    ]
  },
  {
    slug: "charter-governance-rfc-framework",
    title: "Astro Open Infrastructure Publishes Charter, Governance and RFC Framework",
    dek: "The public institutional record defines principles, decision bodies, contribution rules and the first three protocol specifications.",
    type: "Institutional News",
    section: "Institution",
    date: "2026-07-17",
    displayDate: "July 17, 2026",
    byline: "Astro Open Infrastructure Secretariat",
    image: "/assets/astrobridge-open-infrastructure.png",
    body: [
      "Astro Open Infrastructure has published its founding charter version 0.1, initial governance model, RFC process and contribution guidance. The framework places AstroBridge, MA, AstroWallet AI, AstroAI Chain, AstroRealms and the Open Safety Layer within one public technical institution.",
      "The charter establishes six principles: human control, non-custodial operation, privacy by proof, open specifications, interoperability and verifiable claims. These principles are intended to constrain both software design and public communication.",
      "The initial governance model names a Protocol Council, Security Council, Node Operator Assembly and Contributor Community. These are responsibility definitions, not a claim that representative membership or voting authority is already active. Membership and voting records must be published before any body can claim that authority.",
      "Three RFC entries define the first protocol surface. RFC-0001 describes the reference architecture and remains a draft. RFC-0002 specifies the open intent envelope and RFC-0003 specifies the signed safety receipt; both are marked implemented at version 0.1.",
      "Contribution is open across engineering, security, nodes, SDKs, research, translation and education. The guidance explicitly rejects submission of private keys and does not promise market value or investment return for contribution. The framework will evolve through recorded proposals, public review and versioned compatibility tests."
    ],
    facts: [
      "Founding charter version 0.1 is public.",
      "Four initial governance responsibilities are defined.",
      "Three RFC entries are published.",
      "Contribution guidance includes security and economic disclaimers."
    ],
    status: "Public founding framework. Representative governance bodies are not yet claimed as active.",
    links: [
      { label: "Published charter and RFCs", url: "https://www.astrochannel.one/open-infrastructure.html" },
      { label: "Astro Open Safety Layer", url: "https://www.astrochannel.one/open-safety-layer.html" }
    ]
  }
];
