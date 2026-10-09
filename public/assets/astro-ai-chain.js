(() => {
  'use strict';
  const nodes = [...document.querySelectorAll('[data-copy]')];
  const en = Object.fromEntries(nodes.map(node => [node.dataset.copy, node.textContent]));
  Object.assign(en, {
    hero: 'An AI-native\nblockchain network.', securityTitle: 'Verified access.\nExplicit trust.',
    feesTitle: 'A simple user experience.\nAn accountable operating model.',
    roadmapTitle: 'Build the foundation.\nEarn the next stage.', closing: 'Build the network\nfor intelligent collaboration.'
  });
  const zh = {
  "skip": "跳至正文",
  "navArchitecture": "网络架构",
  "navProgress": "工程进展",
  "navRoadmap": "发展路线",
  "navCompany": "公司官网 ↗",
  "eyebrow": "ASTROBRIDGE TECHNOLOGY LIMITED / 网络工程",
  "hero": "AI 原生区块链。\n为智能协作而建。",
  "intro": "我们以身份、授权、AI 任务和结果核验来定义 Astro AI Chain。目标架构由兼容 EVM 的主网络与应用侧链组成，MA 内部侧链只是整体网络的一部分。",
  "explore": "探索网络架构 ↗",
  "viewRoadmap": "我们的实施路线 →",
  "phase": "受控工程预览 · 真实资产支付尚未开放",
  "artTitle": "分层网络概念图，不是实时地理部署地图",
  "artNote": "主网络 / 应用侧链 / AI 协议",
  "promise1": "用户自主授权",
  "promise2": "EVM 兼容执行",
  "promise3": "AI 协议设计",
  "promise4": "以验收证据推进扩展",
  "purposeLabel": "01 / 实用的基础网络",
  "purposeTitle": "一个整体网络，清晰的角色分工。",
  "purposeIntro": "AI 原生是我们的设计方向：身份、有界权限、任务和资源预算共同构成协议能力。这些能力正按阶段研发与验收。",
  "purposeMA": "通用主网络",
  "purposeMABody": "目标主网络为个人、机构和开发者提供确定性 EVM 执行、账户、智能合约与 AI 协议状态。独立验证网络尚未完成验收。",
  "purposeDev": "应用侧链",
  "purposeDevBody": "MA 内部侧链是承载其转账场景的应用子网络。各侧链具有独立身份、资源规则和安全模型，主侧链消息与结算分别验收。",
  "purposeLong": "AI 服务生态",
  "purposeLongBody": "逐步建设授权 AI 任务、能力发现、资源计量与可核验结果记录，通过受控开发者试点评估服务质量和实际采用。",
  "architectureLabel": "02 / 整体架构如何协作",
  "architectureTitle": "每一层，都有明确职责。",
  "architectureIntro": "查看目标主网络、AI 任务和 MA 侧链的工作关系。以下路径说明角色与设计，不执行交易，也不代表完整部署已经完成。",
  "pathRead": "网络读取",
  "pathNative": "MA 侧链",
  "pathExternal": "其他网络",
  "layerNoteTitle": "每条链都有自己的身份与信任模型。",
  "layerNoteBody": "MA 是目标生态中的一条应用侧链。侧链不自动继承主网络安全；主侧链核验、防重放与恢复机制通过测试后，才能开放相应互通能力。",
  "advantagesLabel": "03 / 我们优先建设的优势",
  "advantagesTitle": "把实用的优势，做进网络设计。",
  "a1": "主网络与侧链协作",
  "a1b": "建设通用链并保留专门应用子网络。现有接入服务与测试组件经身份、权限及可用性检查后继续复用。",
  "a2": "明确的原生转账费用",
  "a2b": "MA 内自有批准资产的合规转账以用户零手续费为目标。生产资源计量与定向补贴仍需验证，基础设施和外部链 gas 仍有成本。",
  "a3": "权限有边界的 AI 任务",
  "a3b": "围绕签名权限、模型与策略版本、时限及结果承诺设计任务。AI 可以提出计划，但不能扩大授权或绕过确定性交易规则。",
  "a4": "资产与网络边界清晰",
  "a4b": "明确显示网络身份、批准资产与结算状态。接口成功响应或跨链报价，不等于资产已经完成到账。",
  "a5": "为故障恢复而设计",
  "a5b": "采用版本化发布、持久化检查和故障演练指导部署。扩大运行范围前，验证恢复、容量与事件处理流程。",
  "a6": "以公开证据建立信任",
  "a6b": "测量持续吞吐、确认延迟、AI 服务质量、恢复与成本。与其他网络比较时，同时说明独立运营关系及安全假设。",
  "securityLabel": "04 / 信任与安全机制",
  "securityTitle": "连接身份可核验。\n信任边界明确。",
  "securityIntro": "以身份核验、加密连接、明确权限和可追踪运营共同建立网络安全。每项能力只在已批准的范围内启用。",
  "s1": "每次连接核对身份",
  "s1b": "通过加密传输和网络身份核验，防止认证请求被发送给非预期服务。",
  "s2": "让权限保持必要范围",
  "s2b": "请求只可使用明确批准的能力。钱包签名由用户授权；接入服务可用，不代表获得支付权限。",
  "s3": "让故障清楚可见",
  "s3b": "通过时限、容量控制和明确的可用状态，让故障可以观察。所需服务不可用时，应用必须清楚显示。",
  "s4": "验收完整的支付路径",
  "s4b": "真实资产支付上线前，必须具备系统可信证书、批准合约、签名资产许可、手机验收与安全评审。",
  "progressLabel": "05 / 当前工程记录",
  "progressTitle": "进展，可以逐项判断。",
  "progressIntro": "以下是注明日期的工程快照。开发验证、线上接入与产品验收，分别代表不同建设阶段。",
  "metricMAValue": "尚未开放",
  "metricMA": "真实资产支付",
  "component": "工程部分",
  "status": "阶段",
  "meaning": "具体含义",
  "coordName": "网络服务",
  "coordStatus": "受控预览",
  "coordMeaning": "受控认证读取服务已有部署证据。接入位置不等于独立区块链验证者或全球共识。",
  "chainName": "MA 应用侧链原型",
  "chainStatus": "受控测试环境",
  "chainMeaning": "已有面向 MA 的隔离测试链和无价值转账组件，完整主网络与侧链连接尚未交付。",
  "maStatus": "独立应用接入工程",
  "maMeaning": "MA 是生态中的一个应用。网关配置、批准资产规则与实机验收仍需完成，新链付款继续关闭。",
  "bridgeStatus": "独立接入工程",
  "bridgeMeaning": "资产目录、跨链结算与 NFT 规则，由 AstroBridge 工程团队独立验证。",
  "snapshot": "工程快照日期：",
  "snapshotScope": "预览阶段信息；不作 SLA 或性能承诺。",
  "feesLabel": "06 / 费用、资产与持续运营",
  "feesTitle": "让用户体验简单。\n让运营成本有交代。",
  "f1label": "本链原生资产",
  "f1": "以用户零手续费为设计目标",
  "f1b": "零用户手续费针对 MA 内自有批准资产的合规转账。测试网零 gas 不等于公开资源方案，启用前需完成资产规则、预算和端到端验收。",
  "f2label": "其他网络资产",
  "f2": "遵循原网络规则",
  "f2b": "ETH、BNB 等资产保留原网络费用与确认规则。跨链支持需要经过评审的路径；不暗示已经建立官方合作或全资产免手续费。",
  "f3label": "长期运营",
  "f3": "负责任地扩大规模",
  "f3b": "从受控免费接入开始。以后可依据公开条款，通过企业专属部署、额外资源与服务承诺支持运营。",
  "tokenNote": "未来代币支付模式属于路线图决策。本页面不发行代币、不提供投资产品，也不要求用户购买资产。",
  "roadmapLabel": "07 / 实施与发展路线",
  "roadmapTitle": "把基础做好。\n让下一阶段有据可依。",
  "roadmapIntro": "我们的长期方向充满雄心。每一次扩展，都以可证明的工程成果和可持续运行作为前提，不承诺未经验证的上线日期。",
  "r1state": "链核心 / G1–G2",
  "r1": "补齐主网络基础",
  "r1b": "明确链身份与 EVM 兼容范围，建设跨地区持久验证节点，验证交易、资源控制和持续性能，保留 MA 测试账本。",
  "r2state": "AI 协议 / G3",
  "r2": "建设身份与 AI 任务协议",
  "r2b": "验证授权、撤销、能力目录、有界意图与任务状态，接入真实模型试点并明确结果质量核对。",
  "r3state": "开发者试点 / G4",
  "r3": "连接应用与侧链",
  "r3b": "提供版本化 SDK 与租户控制，验收主侧链无价值消息及状态核对；MA 与 AstroBridge 适配由各团队负责。",
  "r4state": "安全与发布 / G5–G6",
  "r4": "真实资产使用前完成审查",
  "r4b": "完成恢复、密钥保护、独立安全审查与持续运营。真实资产、发行和资产桥分别决策开放。",
  "r5state": "持续优化 / G7",
  "r5": "依据实际需求扩容",
  "r5b": "依据采用与证据增加运营方、地区和经过评审的 AI 能力，扩大服务前评估可靠性、质量和成本。",
  "faqLabel": "08 / 使用前值得了解",
  "faqTitle": "先理解网络，再选择使用。",
  "q1": "网络接入扩大，就代表链共识已经去中心化了吗？",
  "q1b": "不代表。网络接入、资产结算与链共识承担不同职责。去中心化需要独立运营方、治理机制和经过验证的恢复能力。",
  "q2": "MA 中任何代币转账都免费吗？",
  "q2b": "不是。零手续费设计只针对我们自有链上已批准原生资产的合规转账。其他网络的 gas、桥接费用与结算条件分别处理。",
  "q3": "现在可以发送真实资产支付吗？",
  "q3b": "新链支付尚未开放。当前采用受控工程预览和测试资产；MA 手机支付路径还需要配置齐全并完成验收。",
  "q4": "怎样判断网络是否可靠？",
  "q4b": "我们评估实测可用性、延迟、容量、恢复能力与运营依赖。未来的服务承诺，必须由经过核验的运行证据支持。",
  "q5": "Astro AI Chain 会比其他网络更好吗？",
  "q5b": "我们的目标，是为实用应用建设优质网络。速度、成本和安全比较必须具备可复现的证据，不承诺未经实测的领先或绝对安全。",
  "q6": "用户保留哪些控制权？",
  "q6b": "钱包签名由用户授权。批准权限、金额、目标地址与网络身份应明确显示。聊天身份本身不是已经核验的收款地址。",
  "closing": "为智能协作，\n建设完整网络。",
  "closingBody": "了解 AI 原生方向、当前工程记录与下一阶段验收条件，让实用能力通过证据建立信任。",
  "closingLink": "探索 AstroBridge 生态 ↗",
  "footerClassic": "经典官网",
  "footerPro": "专业官网",
  "privacy": "隐私政策",
  "previewLabel": "工程预览 · 2026 年 10 月",
  "metricNetworkValue": "预览运行",
  "metricNetwork": "受控网络接入",
  "metricChainValue": "设计阶段",
  "metricChain": "主网络架构",
  "metricIntegrationValue": "规划阶段",
  "metricIntegration": "AI 协议能力",
  "pathMain": "主网络",
  "pathAI": "AI 任务",
  "aiLabel": "AI / 协议方向",
  "aiTitle": "让 AI 拥有可以安全使用的协议。",
  "aiIntro": "把身份、权限、任务与资源纳入网络设计。推理在链外执行，共识验证确定性规则与状态记录。以下为规划能力，不代表 AI 执行已经完成。",
  "ai1": "身份与授权",
  "ai1b": "通过版本化身份、能力范围、有效期及撤销，让服务在明确用户授权内执行。身份登记本身不赋予付款权限。",
  "ai2": "任务与可核验记录",
  "ai2b": "记录请求、接单、结果承诺及接受状态。签名和哈希可帮助核对来源与完整性，本身不证明推理正确或答案真实。",
  "ai3": "资源与服务质量",
  "ai3b": "建设能力目录、有界预算和可测量服务质量。智能调度须遵守策略，并保留经过验证的回退方案。",
  "mainName": "通用主网络",
  "mainStatus": "架构与核心研发",
  "mainMeaning": "以 EVM 兼容核心设计为基础，具有独立链身份的主网络与跨地区独立验证者尚未验收。",
  "aiName": "AI 任务与身份协议",
  "aiStatus": "设计与研发",
  "aiMeaning": "正在规划任务生命周期、身份、能力目录及有界意图。合约草稿与本地原型不代表生产 AI 或已审查的模型执行。",
  "q7": "这里的 AI 原生是什么意思？",
  "q7b": "这是我们的设计方向：身份、有界授权、任务、能力发现和资源预算成为协议能力。推理在链外执行，AI 不能覆盖签名、余额或确定性验证。完整能力尚未交付。",
  "q8": "Astro AI Chain 只是 MA 转账网络吗？",
  "q8b": "不是。目标是具有应用侧链的通用 AI 原生主网络，MA 内部侧链只是一部分。各链有自己的信任模型，主侧链连接需要单独验收。"
};
  const paths = {
  "read": {
    "en": {
      "steps": [
        [
          "Wallet / application",
          "Select the expected network and permitted service."
        ],
        [
          "Astro AI Chain",
          "Verify network identity and request permissions."
        ],
        [
          "Authorized service",
          "Return approved network information and status."
        ],
        [
          "Application",
          "Display the response and its actual availability."
        ]
      ],
      "note": "The network-access preview supports authenticated reads. This interaction explains the product flow; it does not execute a payment."
    },
    "zh": {
      "steps": [
        [
          "钱包 / 应用",
          "选择预期的网络与允许使用的服务。"
        ],
        [
          "Astro AI Chain",
          "核验网络身份和请求权限。"
        ],
        [
          "授权服务",
          "返回权限内的网络信息与状态。"
        ],
        [
          "应用展示",
          "显示响应内容及实际可用状态。"
        ]
      ],
      "note": "网络接入预览支持认证读取。此处说明产品流程，不执行支付。"
    }
  },
  "native": {
    "en": {
      "steps": [
        [
          "MA / wallet",
          "Confirm the asset, network, recipient and amount; sign locally."
        ],
        [
          "Payment gateway",
          "Verify the approved request, asset permission, expiry and nonce."
        ],
        [
          "MA application sidechain",
          "An isolated test-chain foundation exists; main-to-sidechain settlement is not yet accepted."
        ],
        [
          "Receipt / balance",
          "Reconcile the transaction state and accepted chain result."
        ]
      ],
      "note": "This path is not open for real-value payments. Publicly trusted gateway configuration, canonical assets, contracts and phone acceptance remain required. Zero user fees target eligible transfers of our approved native asset."
    },
    "zh": {
      "steps": [
        [
          "MA / 钱包",
          "确认资产、网络、收款人与金额，在手机本地签名。"
        ],
        [
          "支付网关",
          "核验批准请求、资产许可、有效期与 nonce。"
        ],
        [
          "MA 应用侧链",
          "已有隔离试验链基础；主侧链结算尚未验收。"
        ],
        [
          "回执 / 余额",
          "核对交易状态与链上接受结果。"
        ]
      ],
      "note": "这条路径尚未开放真实资产支付。仍需系统可信网关配置、主资产、合约与手机验收。用户零手续费的目标范围，是我们批准原生资产的合规转账。"
    }
  },
  "external": {
    "en": {
      "steps": [
        [
          "MA / wallet",
          "Select an existing supported network and authorize locally."
        ],
        [
          "Existing network RPC",
          "Ordinary transfers are broadcast to the selected chain."
        ],
        [
          "AstroBridge, if crossing chains",
          "Quotes, supported assets and execution gates belong to the separate bridge integration."
        ],
        [
          "Original chain rules",
          "Gas, finality and destination settlement must be checked for each route."
        ]
      ],
      "note": "Adding Astro AI Chain does not migrate balances or remove external gas costs. An available quote does not establish live cross-chain execution. External asset settlement is separately validated."
    },
    "zh": {
      "steps": [
        [
          "MA / 钱包",
          "选择已有支持网络，并在本地授权。"
        ],
        [
          "原网络 RPC",
          "普通转账广播至用户选择的链。"
        ],
        [
          "需要跨链时接入 AstroBridge",
          "报价、支持资产和执行关卡属于独立的桥接工程。"
        ],
        [
          "遵循原链规则",
          "每条路径分别核验 gas、最终性与目标链到账。"
        ]
      ],
      "note": "增加 Astro AI Chain 不会自动迁移余额，也不会消除外链 gas。能够获取报价不代表跨链执行已经开放，外部资产结算需要独立验证。"
    }
  },
  "main": {
    "en": {
      "steps": [
        [
          "User or application",
          "Select the main-network identity and authorize a bounded action."
        ],
        [
          "Main-network interface",
          "Validate network, permissions and resource policy."
        ],
        [
          "EVM and validators",
          "Target deterministic execution and independently operated consensus."
        ],
        [
          "Receipt and state",
          "Verify the original transaction and its confirmed chain result."
        ]
      ],
      "note": "Target architecture, not a completed mainnet. A separately identified main network and independent global validator rollout still require acceptance. Existing test-chain ledgers remain separate."
    },
    "zh": {
      "steps": [
        [
          "用户或应用",
          "选择主网络身份，授权有边界的操作。"
        ],
        [
          "主网络接口",
          "核验网络、权限与资源规则。"
        ],
        [
          "EVM 与验证者",
          "目标为确定性执行及独立运营的共识。"
        ],
        [
          "回执与状态",
          "核对原交易及其链上确认结果。"
        ]
      ],
      "note": "这是目标架构，不是已完成主网。具有独立身份的主网络与全球独立验证者仍需验收，现有测试链账本分别保留。"
    }
  },
  "ai": {
    "en": {
      "steps": [
        [
          "Authorized intent",
          "Bind identity, capabilities, budget and expiry."
        ],
        [
          "Task and worker",
          "Record task state; run permitted inference off-chain."
        ],
        [
          "Result commitment",
          "Submit a versioned result reference and usage record."
        ],
        [
          "Requester review",
          "Check the result and accept, reject or reconcile it."
        ]
      ],
      "note": "Planned protocol. A hash or signature supports integrity and attribution, not proof of correct inference. AI cannot expand permissions or directly authorize a payment."
    },
    "zh": {
      "steps": [
        [
          "已授权意图",
          "绑定身份、能力、预算与有效期。"
        ],
        [
          "任务与工作节点",
          "记录任务状态，在链外执行许可推理。"
        ],
        [
          "结果承诺",
          "提交版本化结果引用与用量记录。"
        ],
        [
          "请求方核对",
          "检查结果并接受、拒绝或继续核对。"
        ]
      ],
      "note": "这是规划协议。哈希和签名帮助核对完整性及来源，不证明推理正确。AI 不能扩大权限或直接授权付款。"
    }
  }
};
  const normalize = value => String(value || '').toLowerCase().split(/[-_]/)[0];
  let language = normalize(new URLSearchParams(location.search).get('lang'));
  if (!language) { try { language = normalize(localStorage.getItem('ma.program.language')); } catch {} }
  language = language === 'zh' ? 'zh' : 'en';
  let path = 'main';
  function displayPath() {
    const copy = paths[path][language];
    copy.steps.forEach(([title, body], index) => {
      document.getElementById(`flow${index + 1}title`).textContent = title;
      document.getElementById(`flow${index + 1}body`).textContent = body;
    });
    document.getElementById('path-detail').textContent = copy.note;
    document.querySelectorAll('[data-path]').forEach(button => button.setAttribute('aria-pressed', String(button.dataset.path === path)));
  }
  function apply(value) {
    language = value === 'zh' ? 'zh' : 'en';
    nodes.forEach(node => { node.textContent = (language === 'zh' ? zh : en)[node.dataset.copy] || en[node.dataset.copy]; });
    document.documentElement.lang = language; document.getElementById('language').value = language;
    document.title = language === 'zh' ? 'Astro AI Chain · AI 原生区块链网络' : 'Astro AI Chain · AI-native blockchain network';
    document.querySelectorAll('h1, .split h2, #fees h2, #roadmap h2, .closing h2').forEach(node => { node.style.whiteSpace = 'pre-line'; });
    document.querySelectorAll('a[href]').forEach(anchor => {
      const url = new URL(anchor.getAttribute('href'), location.href);
      if (url.origin === location.origin && url.pathname.endsWith('.html')) { url.searchParams.set('lang', language); anchor.href = url.pathname + url.search + url.hash; }
    });
    displayPath();
    try { localStorage.setItem('ma.program.language', language); } catch {}
  }
  apply(language);
  document.getElementById('language').addEventListener('change', event => {
    apply(event.target.value);
    const url = new URL(location.href); url.searchParams.set('lang', language);
    history.replaceState(null, '', url);
  });
  document.querySelectorAll('[data-path]').forEach(button => button.addEventListener('click', () => { path = button.dataset.path; displayPath(); }));
})();
