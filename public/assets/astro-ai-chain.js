(() => {
  'use strict';
  const nodes = [...document.querySelectorAll('[data-copy]')];
  const en = Object.fromEntries(nodes.map(node => [node.dataset.copy, node.textContent]));
  Object.assign(en, {
    hero: 'Built for the next\nera of connection.', securityTitle: 'Verified access.\nExplicit trust.',
    feesTitle: 'A simple user experience.\nAn accountable operating model.',
    roadmapTitle: 'Build the foundation.\nEarn the next stage.', closing: 'A larger network begins\nwith a foundation you can trust.'
  });
  const zh = {
  "skip": "跳至正文",
  "navArchitecture": "网络架构",
  "navProgress": "工程进展",
  "navRoadmap": "发展路线",
  "navCompany": "公司官网 ↗",
  "eyebrow": "ASTROBRIDGE TECHNOLOGY LIMITED / 网络工程",
  "hero": "连接当下。\n为下一时代而建。",
  "intro": "我们正在建设 Astro AI Chain，让日常应用、用户自主授权的价值流转与可靠的网络服务相连，为 MA 和与我们一起建设的开发者提供长期基础。",
  "explore": "探索网络架构 ↗",
  "viewRoadmap": "我们的实施路线 →",
  "phase": "受控工程预览 · 真实资产支付尚未开放",
  "artTitle": "分层网络概念图，不是实时地理部署地图",
  "artNote": "接入 / 身份核验与协调 / 结算",
  "promise1": "用户自主授权",
  "promise2": "连接身份可核验",
  "promise3": "原生资产转账补贴",
  "promise4": "以验收记录推动扩展",
  "purposeLabel": "01 / 实用的基础网络",
  "purposeTitle": "一张网络，承载日常可能。",
  "purposeIntro": "我们的目标，是通过实用产品、可测量的可靠性与公开技术证据，成为世界上最值得信赖的网络之一。",
  "purposeMA": "服务 MA 用户",
  "purposeMABody": "增加一条资产规则明确的自有网络，提供签名请求与交易凭证。现有钱包网络继续遵循各自的结算规则。",
  "purposeDev": "服务应用开发者",
  "purposeDevBody": "为服务发现、请求验证、状态与回执提供清晰的接入边界。在受控预览中完成验证，再进入真实价值阶段。",
  "purposeLong": "面向未来五到十年",
  "purposeLongBody": "让架构能够逐步增加地区、运营方与经过评审的能力。兼容性、治理机制和恢复能力随网络共同发展。",
  "architectureLabel": "02 / 整体架构如何协作",
  "architectureTitle": "每一层，都有明确职责。",
  "architectureIntro": "选择一条路径，了解预期的工作流程。下方是架构说明，不会执行网络请求或转账。",
  "pathRead": "网络读取",
  "pathNative": "原生资产转账",
  "pathExternal": "其他网络",
  "layerNoteTitle": "网络接入与资产结算，职责明确。",
  "layerNoteBody": "接入服务返回权限内的信息。资产结算需要批准资产、用户签名和核验后的交易结果。网络可用，不等于支付已经完成。",
  "advantagesLabel": "03 / 我们优先建设的优势",
  "advantagesTitle": "把实用的优势，做进网络设计。",
  "a1": "可以持续扩展的网络",
  "a1b": "在保持 MA 和 AstroBridge 现有产品的基础上扩展接入与经过评审的能力。每次发布都以兼容性和验收结果为依据。",
  "a2": "明确的原生转账费用",
  "a2b": "在 MA 内，本网已批准原生资产的合规转账以用户零手续费为目标。基础设施和补贴仍有成本；容量规则须在签名前明示。",
  "a3": "请求处理可以核验",
  "a3b": "工程预览核验身份、有效期、权限与重放防护。请求编号和回执支持全程追踪及对账。",
  "a4": "资产与网络边界清晰",
  "a4b": "明确显示网络身份、批准资产与结算状态。接口成功响应或跨链报价，不等于资产已经完成到账。",
  "a5": "为故障恢复而设计",
  "a5b": "采用版本化发布、持久化检查和故障演练指导部署。扩大运行范围前，验证恢复、容量与事件处理流程。",
  "a6": "以公开证据建立信任",
  "a6b": "具备可复现结果后，公布吞吐、延迟、可用性与成本。与其他链比较时，使用等价工作负载和测试条件。",
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
  "metricMAValue": "待验收",
  "metricMA": "MA 手机支付验收",
  "component": "工程部分",
  "status": "阶段",
  "meaning": "具体含义",
  "coordName": "网络服务",
  "coordStatus": "受控预览",
  "coordMeaning": "认证网络接入已部署并完成验收。真实资产支付尚未开放。",
  "chainName": "原生支付链",
  "chainStatus": "本地开发网",
  "chainMeaning": "开发阶段已进行测试资产转账、持久化与恢复验证，尚未发布支付主网。",
  "maStatus": "接入工作进行中",
  "maMeaning": "客户端已完成接入准备。支付网关、资产参数与真实手机验收仍是上线条件。",
  "bridgeStatus": "独立接入工程",
  "bridgeMeaning": "资产目录、跨链结算与 NFT 规则，由 AstroBridge 工程团队独立验证。",
  "snapshot": "工程快照日期：",
  "snapshotScope": "预览阶段信息；不作 SLA 或性能承诺。",
  "feesLabel": "06 / 费用、资产与持续运营",
  "feesTitle": "让用户体验简单。\n让运营成本有交代。",
  "f1label": "本链原生资产",
  "f1": "以用户零手续费为设计目标",
  "f1b": "MA 内使用我们已批准原生代币的合规转账，是零手续费的目标范围。公布资产规则、容量控制并完成手机验收后才能启用。",
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
  "r1state": "受控开发阶段",
  "r1": "验证核心能力",
  "r1b": "身份权限、测试资产记账、回执、持久化与故障恢复。现有本地验证是后续建设的起点。",
  "r2state": "当前扩展阶段",
  "r2": "展开网络接入",
  "r2b": "在身份核验和部署验收的基础上扩展网络接入。依据实际连通性、容量与恢复能力逐步扩大规模。",
  "r3state": "产品接入关卡",
  "r3": "连接 MA 与 AstroBridge",
  "r3b": "批准主资产与合约、协调多设备 nonce，完成网关、状态和手机测试。跨链与 NFT 具有各自独立的上线关卡。",
  "r4state": "有限生产关卡",
  "r4": "按实测结果运行",
  "r4b": "在有限真实价值试运行前，完成独立安全评审、恢复演练、资源预算、事件响应与真实手机验收。",
  "r5state": "长期发展方向",
  "r5": "建设更广泛的开发者网络",
  "r5b": "增加独立运营方、公开接口、经过评审的互操作与可持续服务选项。让网络质量在日常使用中得到证明。",
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
  "closing": "更大的网络，\n从值得信任的基础开始。",
  "closingBody": "了解架构、验收记录与下一阶段条件。我们为长期实用而建设。",
  "closingLink": "探索 AstroBridge 生态 ↗",
  "footerClassic": "经典官网",
  "footerPro": "专业官网",
  "privacy": "隐私政策",
  "previewLabel": "工程预览 · 2026 年 10 月",
  "metricNetworkValue": "已核验",
  "metricNetwork": "认证网络接入",
  "metricChainValue": "测试阶段",
  "metricChain": "原生资产结算",
  "metricIntegrationValue": "接入中",
  "metricIntegration": "MA / AstroBridge 产品接入"
};
  const paths = {
  "read": {
    "en": {
      "steps": [
        [
          "MA / application",
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
          "MA / 应用",
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
          "Own payment chain",
          "Proposed native settlement; consensus currently runs in the local development network."
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
          "自有支付链",
          "原生资产结算设计；共识当前运行于本地开发网。"
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
  }
};
  const normalize = value => String(value || '').toLowerCase().split(/[-_]/)[0];
  let language = normalize(new URLSearchParams(location.search).get('lang'));
  if (!language) { try { language = normalize(localStorage.getItem('ma.program.language')); } catch {} }
  language = language === 'zh' ? 'zh' : 'en';
  let path = 'read';
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
    document.title = language === 'zh' ? 'Astro AI Chain · 网络、信任与日常价值' : 'Astro AI Chain · Network, trust and everyday value';
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
