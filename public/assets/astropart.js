(() => {
  "use strict";
  const isProjectPage = document.body.classList.contains("ap-page");
  const nodes = [...document.querySelectorAll("[data-ap]")];
  const english = Object.fromEntries(nodes.map(node => [node.dataset.ap, node.innerText]));
  const entries = {
    en: ["ROBOTICS / REPAIR & IDENTITY", "Make robot repair easier. A connected identity for robots, components and the people who keep them working.", "Explore AstroPart"],
    zh: ["机器人 / 维修与身份", "让机器人维修更便捷。连接整机、部件和维修服务，迈向机器人与配件免费上链。", "了解 AstroPart 星件链"],
    es: ["ROBÓTICA / REPARACIÓN E IDENTIDAD", "Facilitar la reparación de robots. Una identidad conectada para máquinas, componentes y las personas que los mantienen.", "Descubrir AstroPart"],
    fr: ["ROBOTIQUE / RÉPARATION ET IDENTITÉ", "Faciliter la réparation des robots. Relier les machines, leurs composants et les équipes qui les entretiennent.", "Découvrir AstroPart"],
    de: ["ROBOTIK / REPARATUR UND IDENTITÄT", "Roboter einfacher reparieren. Eine gemeinsame Identität für Maschinen, Komponenten und die Menschen, die sie instand halten.", "AstroPart entdecken"],
    ja: ["ロボット / 修理と識別", "ロボットの修理をもっと身近に。機体、部品、整備を担う人々をつなぐ仕組み。", "AstroPart を知る"],
    ko: ["로봇 / 수리와 식별", "로봇 수리를 더 편리하게. 기체, 부품, 그리고 이를 유지하는 사람들을 연결합니다.", "AstroPart 알아보기"]
  };
  const chinese = {
    skip: "跳至正文", ecosystem: "项目生态", navHow: "维修体验", navChain: "上链愿景", navHorizon: "地球与星际",
    heroLabel: "ASTROPART 星件链 / 连接机器人世界",
    heroTitle: "让每台机器人，\n都能便捷维修。",
    heroIntro: "找到适配的部件，连接需要的服务，让每一次维修留下可追溯的记录。AstroPart 正在连接支撑机器人世界持续运转的每一个环节。",
    tryPilot: "体验配件查询试点", exploreVision: "了解项目愿景",
    pilotNote: "试点提供样例机器人档案与演示供货数据。", artLabel: "让机器人持续工作",
    ribbon1: "识别整机与部件", ribbon2: "查找适配配件", ribbon3: "保留维修历史",
    purposeLabel: "01 / 让好机器，继续发挥价值", purposeTitle: "多一段使用寿命。\n少一道维修难题。",
    purposeBody: "缺少一个部件，不应成为一台机器人故事的终点。AstroPart 正为机主、厂家与维修团队建立共同入口，帮助大家确认什么能装、哪里有货、如何联系。",
    purposeDetail: "从家庭中的陪伴机器人，到工厂里的工作伙伴，我们希望维修知识更容易理解，配件和服务更容易找到，机器的历史更值得信赖。",
    experienceLabel: "02 / 缩短通往维修的距离", experienceTitle: "扫一扫。找到配件。继续运行。",
    experienceIntro: "用一个持续的身份，连接机器、部件和能够提供帮助的人。",
    step1Title: "识别你的机器人", step1Body: "通过二维码或受支持的 NFC 标签打开整机、配件档案，查看型号、制造商及该设备已公开的信息。",
    step2Title: "找到适配的部件", step2Body: "核对适配配件与地区供货信息，查看联系方式、服务范围及库存最近确认时间。",
    step3Title: "留下维修的故事", step3Body: "机主可以授权登记维修与换件记录，让下一次服务从更了解这台机器开始。",
    chainLabel: "03 / ASTRO AI CHAIN 生态的一部分", chainTitle: "每台机器人都有故事。\n让它拥有长久的记录。",
    chainIntro: "我们的愿景是让机器人免费上链、机器人部件免费上链，将身份与可核验的维修历史带入 Astro AI Chain 生态。",
    free1Title: "机器人免费登记上链", free1Body: "为整机建立共同的身份基础，陪伴机器走过完整生命周期。",
    free2Title: "机器人部件免费上链", free2Body: "重要部件拥有单件身份，小件通过型号与批次关联。",
    free3Title: "连接起来的维修记录", free3Body: "帮助获授权的机主和维修团队核对机器背后的历史。",
    chainStatus: "上链服务 / 开发与对接中",
    chainNote: "免费上链是计划中的服务。目前试点提供查询和应用侧记录，实际链上登记将在对接验收后开放。配件、维修和配送由相应服务方确认费用。",
    meetChain: "了解 Astro AI Chain",
    peopleLabel: "04 / 一个生态，连接每一份专业", peopleTitle: "为机器人世界，\n连接每一份专业。",
    ownerTitle: "机主", ownerBody: "了解自己的机器，更清楚地找到适配部件和供货联系人。",
    makerTitle: "制造商", makerBody: "发布产品与适配资料，及时维护供货信息。",
    repairTitle: "维修团队", repairBody: "从机器身份和机主授权的维修资料开始工作。",
    horizonLabel: "我们的长期远景", horizonTitle: "立足地球。\n远望火星。",
    horizonBody: "从地球的一间车间，到未来的火星基地，可靠的机器人都需要可靠的维护。我们设想一种共同的语言，让机器身份、部件和维修知识，伴随人类走向更远的地方。",
    horizonNote: "未来愿景 · 概念插画",
    nextLabel: "宏大的旅程，从一个部件开始", nextTitle: "让下一台机器人，\n继续前行。",
    nextBody: "体验配件查询试点，关注项目进展，了解 Astro 生态如何一步步成形。",
    readNews: "阅读项目进展", backEcosystem: "探索 Astro 项目生态", newsroom: "新闻频道"
  };

  const translations = window.ASTROPART_TRANSLATIONS || {};
  const isSupported = value => Object.prototype.hasOwnProperty.call(entries, value);
  let dictionary = {};
  const lookupState = { message: "", record: null, busy: false };

  function normalize(value) {
    return String(value || "en").toLowerCase().split(/[-_]/)[0];
  }
  function renderLookup() {
    const status = document.querySelector("#ap-lookup-status");
    const result = document.querySelector("#ap-lookup-result");
    if (!status || !result) return;
    status.textContent = dictionary[lookupState.message] || "";
    result.hidden = !lookupState.record;
    if (lookupState.record) {
      const record = lookupState.record;
      const values = {
        name: record.name,
        manufacturer: record.manufacturer,
        hash: record.registrationHash,
        integrity: dictionary[record.integrityVerified ? "integrityVerified" : "integrityReview"]
      };
      Object.entries(values).forEach(([key, value]) => {
        result.querySelector('[data-result="' + key + '"]').textContent = value || "—";
      });
    }
    document.querySelector("#ap-lookup-form button").disabled = lookupState.busy;
  }
  function apply(requested) {
    const normalized = normalize(requested);
    const language = isSupported(normalized) ? normalized : "en";
    const [entryLabel, entrySummary, entryCTA] = entries[language];
    dictionary = {
      ...english,
      ...(language === "zh" ? chinese : {}),
      ...(translations[language] || {}),
      entryLabel, entrySummary, entryCTA
    };
    nodes.forEach(node => {
      if (dictionary[node.dataset.ap] !== undefined) node.textContent = dictionary[node.dataset.ap];
    });
    document.querySelectorAll("[data-ap-link], .ap-entry").forEach(link => {
      const url = new URL(link.getAttribute("href"), location.href);
      url.searchParams.set("lang", language);
      link.href = url.pathname + url.search + url.hash;
    });
    if (isProjectPage) {
      document.documentElement.lang = language === "zh" ? "zh-CN" : language;
      document.title = dictionary.pageTitle;
      document.querySelector('meta[name="description"]').content = dictionary.pageDescription;
      document.querySelector('meta[property="og:title"]').content = dictionary.pageTitle;
      document.querySelector('meta[property="og:description"]').content = dictionary.pageDescription;
      document.querySelector("#ap-language-select").value = language;
      document.querySelector(".ap-hero-art img").alt = dictionary.robotAlt;
      document.querySelector("#ap-lookup-result").setAttribute("aria-label", dictionary.resultLabel);
      document.querySelectorAll("[data-ap-placeholder]").forEach(node => {
        node.placeholder = dictionary[node.dataset.apPlaceholder];
      });
      document.querySelectorAll('a[href^="/"]').forEach(link => {
        const url = new URL(link.href, location.href);
        if (url.pathname.endsWith(".html")) {
          url.searchParams.set("lang", language);
          link.href = url.pathname + url.search + url.hash;
        }
      });
      const url = new URL(location.href);
      url.searchParams.set("lang", language);
      history.replaceState(null, "", url);
      try { localStorage.setItem("ma.program.language", language); } catch (_) {}
      renderLookup();
    }
  }

  let language = new URLSearchParams(location.search).get("lang");
  if (!language) {
    try { language = localStorage.getItem("ma.program.language"); } catch (_) {}
  }
  apply(language || "en");
  document.querySelector("#ap-language-select")?.addEventListener("change", event => apply(event.target.value));
  document.querySelector("#language")?.addEventListener("change", event => apply(event.target.value));

  document.querySelector("#ap-lookup-form")?.addEventListener("submit", async event => {
    event.preventDefault();
    if (lookupState.busy) return;
    const input = document.querySelector("#ap-hash").value.trim();
    lookupState.record = null;
    if (!/^(?:0x[0-9a-f]{64}|[a-z0-9_-]{1,64})$/i.test(input)) {
      lookupState.message = "lookupInvalid";
      renderLookup();
      return;
    }
    lookupState.message = "lookupChecking";
    lookupState.busy = true;
    renderLookup();
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), 12000);
    try {
      const response = await fetch("/api/astropart-lookup?ref=" + encodeURIComponent(input), {
        headers: { Accept: "application/json" },
        signal: controller.signal,
        cache: "no-store"
      });
      const result = await response.json();
      if (!response.ok) {
        const errors = {
          INVALID_REFERENCE: "lookupInvalid", RECORD_NOT_FOUND: "lookupMissing",
          RECORD_UNAVAILABLE: "lookupRevoked", RECORD_PROOF_FAILED: "lookupProofFailed",
          RATE_LIMITED: "lookupBusy"
        };
        lookupState.message = errors[result.error] || "lookupUnavailable";
      } else {
        if (!/^0x[0-9a-f]{64}$/i.test(result.registrationHash || "") ||
            typeof result.integrityVerified !== "boolean" ||
            result.chainReceiptStatus !== "INTEGRATION_PENDING") throw new Error("Invalid lookup result");
        lookupState.record = result;
        lookupState.message = "lookupFound";
      }
    } catch {
      lookupState.message = "lookupUnavailable";
    } finally {
      clearTimeout(timer);
      lookupState.busy = false;
      renderLookup();
    }
  });
})();
