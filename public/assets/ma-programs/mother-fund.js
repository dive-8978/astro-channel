(function () {
  'use strict';
  var COPY = {"navBuyback": {"en": "Buyback plan", "zh": "回购计划"}, "heroJoin": {"en": "Join the initiative", "zh": "参与公益计划"}, "heroAmount": {"en": "20,000,000 MA", "zh": "20,000,000 MA"}, "heroPledge": {"en": "Company-funded. Dedicated to mothers and children.", "zh": "由公司提供，专用于帮助母亲与儿童。"}, "pledgeKicker": {"en": "A purpose that stays", "zh": "一份不变的用途"}, "pledgeTitle": {"en": "Value may change. The purpose stays.", "zh": "价格会变，公益用途不变。"}, "pledgeBody": {"en": "AstroBridge Technology Limited plans to supply 20,000,000 MA for practical assistance to mothers and children facing hardship worldwide. The entire allocation and its realized sale proceeds are intended exclusively for this purpose, regardless of MA’s market price.", "zh": "AstroBridge Technology Limited 计划提供 2,000 万 MA，帮助全球处于困境中的母亲与儿童。无论 MA 价格如何变化，这笔代币及其实际售出所得都专用于这一公益用途。"}, "careTitle": {"en": "Everyday essentials", "zh": "基本生活支持"}, "careBody": {"en": "Work with accountable local organizations on food, safe accommodation and essential family needs.", "zh": "与负责的当地机构合作，支持食物、安全住所及家庭基本生活需求。"}, "healthTitle": {"en": "Care and recovery", "zh": "健康与康复"}, "healthBody": {"en": "Explore documented maternal care, child health and recovery support with qualified organizations.", "zh": "与有资质的机构探讨有据可查的母亲照护、儿童健康及康复援助。"}, "opportunityTitle": {"en": "A more secure future", "zh": "更有保障的未来"}, "opportunityBody": {"en": "Explore education, emergency relief and livelihood support suited to local needs. Eligibility and delivery rules will be published before assistance begins.", "zh": "根据当地需求探索教育、紧急救助与生计支持。援助开始前公开资格和执行规则。"}, "statusNotice": {"en": "Planning-stage company initiative · No public fundraising or aid applications are open on this page. No funded wallet, appointed supervisor or charitable registration is claimed.", "zh": "公司公益项目筹备中 · 本页尚未开放公众募款或援助申请，不宣称钱包已注资、监督方已受聘或已取得慈善登记。"}, "ledgerKicker": {"en": "Public accountability", "zh": "公开可查"}, "ledgerTitle": {"en": "A public wallet. A complete record.", "zh": "公开钱包，完整记录。"}, "ledgerBody": {"en": "After a future MA listing, the company plans to place the allocation in a dedicated public wallet. Listing, wallet funding and the oversight arrangements are not yet confirmed.", "zh": "计划在 MA 未来上市后，将额度转入专用公开钱包。目前上市、钱包注资及监督安排均未确认。"}, "walletPending": {"en": "Wallet publication pending", "zh": "钱包待公布"}, "walletAmountNote": {"en": "Planned allocation — not a verified wallet balance.", "zh": "计划额度，并非已核验钱包余额。"}, "addressLabel": {"en": "Public address", "zh": "公开地址"}, "addressStatus": {"en": "Not published", "zh": "尚未公布"}, "balanceLabel": {"en": "Verified balance", "zh": "已核验余额"}, "balanceStatus": {"en": "Not available", "zh": "暂无核验数据"}, "oversightLabel": {"en": "Independent oversight", "zh": "独立监督"}, "oversightStatus": {"en": "Seeking suitable organizations", "zh": "拟寻求合适机构"}, "paymentsLabel": {"en": "Verified disbursements", "zh": "已核验拨款"}, "paymentsStatus": {"en": "No records published", "zh": "尚无公开记录"}, "walletNoFunds": {"en": "This page does not connect wallets or accept transfers. Only use a fund address after its official publication and verification.", "zh": "本页不连接钱包，也不接受转账。基金地址正式公布并核验后方可使用。"}, "oversightPlanTitle": {"en": "Independent checks, separate responsibilities", "zh": "独立核查，职责分离"}, "oversightPlanBody": {"en": "We intend to approach established charities, relevant United Nations entities and organizations in different countries to explore oversight or delivery roles. No such organization has agreed to participate. An on-chain wallet alone does not prove real-world aid.", "zh": "我们拟联系知名慈善机构、联合国相关机构及各国组织，探讨监督或执行角色；目前尚无此类机构确认参与。链上钱包本身不能证明现实援助已交付。"}, "reconcileTitle": {"en": "Follow the money into real assistance", "zh": "从链上记录追踪到实际援助"}, "reconcileBody": {"en": "Publish deposits, MA sales, prices, transaction IDs, disclosed execution costs, realized proceeds, disbursements and privacy-safe delivery evidence. Reconcile token records with cash accounts and independent reviews. Administration funding and any fees must be disclosed before launch.", "zh": "公开入账、MA 售出数量、价格、交易编号、执行费用、实际所得、拨款及保护隐私的交付凭证。将代币记录与现金账目、独立复核对应。运营经费来源和费用须在启动前披露。"}, "notaryTitle": {"en": "A documented commitment", "zh": "可核验的公益承诺"}, "notaryBody": {"en": "We plan to explore notarizing the company’s signed commitment in the United States. Notarization is not charitable registration, an audit, custody or United Nations approval. The legal structure, supervision agreement and any notarial record will be published only after completion.", "zh": "我们计划探索在美国办理公司公益承诺文件的签署公证。公证不等于慈善登记、审计、资金托管或联合国认可。法律结构、监督协议和公证记录将在实际完成后公布。"}, "joinKicker": {"en": "An open invitation", "zh": "开放联名邀请"}, "joinTitle": {"en": "Many names. One human purpose.", "zh": "汇聚每一份善意。"}, "joinBody": {"en": "Companies of every size, foundations, blockchain teams and individuals are welcome to express interest. The company supplies the MA; no financial contribution is required for a co-signing conversation.", "zh": "欢迎不同规模的公司、基金会、区块链团队和个人表达参与意愿。MA 由公司提供，探讨公益联名无需出资。"}, "wallStatus": {"en": "Supporter wall · Awaiting written participation agreements", "zh": "联名墙 · 等待书面参与确认"}, "pause": {"en": "Pause motion", "zh": "暂停动效"}, "wallCharity": {"en": "Charities & foundations", "zh": "慈善机构与基金会"}, "openPlace": {"en": "A place for future participants", "zh": "为未来参与者预留"}, "wallBlockchain": {"en": "Blockchain teams", "zh": "区块链团队"}, "wallBusiness": {"en": "Businesses, large & small", "zh": "各类企业"}, "wallPeople": {"en": "People who care", "zh": "每一位有心人"}, "wallConsent": {"en": "No signed institutional statements have been published yet. Logos appear only after written permission and an approved public statement are verified. Co-signing supports the humanitarian purpose within the statement’s scope; it does not automatically establish financial oversight, custody or endorsement of MA.", "zh": "目前尚无已公开的机构签署倡议书。取得书面标志授权并核验获准公开的倡议书后，才会上墙。联名支持以文件约定的公益宗旨为限，不自动代表资金监督、托管或对 MA 的背书。"}, "roleSupportTitle": {"en": "Co-sign the purpose", "zh": "公益联名"}, "roleSupportBody": {"en": "Provide an agreed statement on your own letterhead, with optional approved name/logo display. No donation, token purchase, listing, custody or supervision is required for this co-signing invitation.", "zh": "以机构自身抬头提供双方确认的倡议书，并可授权展示名称或标志。本次公益联名不要求捐款、购买代币、安排上市、托管或监督资金。"}, "roleReviewTitle": {"en": "Explore independent oversight", "zh": "探讨独立监督"}, "roleReviewBody": {"en": "Qualified organizations can discuss review standards, conflicts of interest, public reporting and oversight scope under a separate written agreement.", "zh": "有资质机构可另行协商复核标准、利益冲突处理、公开报告及监督范围，并签订独立书面协议。"}, "roleDeliverTitle": {"en": "Help deliver practical support", "zh": "协作开展援助"}, "roleDeliverBody": {"en": "Local maternal and child welfare organizations can discuss eligible cases and verifiable delivery. Receiving aid never requires buying MA or appearing in publicity.", "zh": "各地母婴与儿童公益机构可探讨合适案例及可核验的执行。受助不以购买 MA 或参加宣传为条件。"}, "inviteTitle": {"en": "Let digital value become practical care.", "zh": "让数字价值，成为真实的关爱。"}, "inviteBody": {"en": "Please send your organization name, contact person and proposed wording. We request a signed public statement, approved logo and publication permission, including the scope and duration. Please redact private contact details and identity documents from the public copy.", "zh": "请通过邮件提供机构名称、联系人及建议文字。我们希望收到签署倡议书、获准使用的标志及公开授权，并明确范围和期限。公开版本请遮盖私人联系方式和身份证明等信息。"}, "emailJoin": {"en": "Email the AstroBridge team", "zh": "邮件联系 AstroBridge 团队"}, "cycleKicker": {"en": "A continuing company commitment", "zh": "持续的公司投入"}, "cycleTitle": {"en": "20M for care. A separate 20M for the matching burn.", "zh": "2,000 万用于公益，另备 2,000 万用于对应销毁。"}, "cycleBody": {"en": "After the initial fund allocation is fully sold and reconciled, the company plans to burn an additional 20,000,000 MA from a separate company reserve. The annual plan then allocates 4% of eligible audited net profit: 2% to buy MA for the fund, and 2% to buy MA for burning.", "zh": "初始基金额度全部售出并完成核对后，公司计划从另行准备的公司储备中销毁 2,000 万 MA。此后年度计划投入符合口径的经审计净利润的 4%：2% 回购 MA 补充基金，2% 回购 MA 后销毁。"}, "readBuyback": {"en": "Read the full buyback plan →", "zh": "查看完整回购计划 →"}, "buybackEyebrow": {"en": "MA / A continuing contribution", "zh": "MA / 持续公益投入"}, "buybackTitle": {"en": "Build value.\nBring care.", "zh": "创造价值，\n传递关爱。"}, "buybackLead": {"en": "A company-funded plan that connects annual business profit with practical support for mothers and children — and a separately documented MA burn.", "zh": "由公司出资，将年度经营利润与母亲、儿童的实际援助相连接，并独立记录 MA 销毁。"}, "proposal": {"en": "Company proposal · Not yet active", "zh": "公司方案 · 尚未执行"}, "profitLabel": {"en": "of eligible audited annual net profit", "zh": "符合口径的经审计年度净利润"}, "fundSplit": {"en": "Buy MA for the Mother Fund", "zh": "回购 MA 补充妈妈基金"}, "burnSplit": {"en": "Buy MA and burn it", "zh": "回购 MA 并销毁"}, "stagesKicker": {"en": "The intended sequence", "zh": "计划顺序"}, "stagesTitle": {"en": "Three actions. Separate records.", "zh": "三项行动，分别记账。"}, "stagesBody": {"en": "The fund’s initial tokens, the company’s matching-burn reserve and annual buybacks are distinct allocations. Sold tokens belong to their buyers and cannot be counted as the matching burn.", "zh": "初始基金代币、公司对应销毁储备及年度回购是三项不同的配置。已售代币归买家所有，不能将它们再计为对应销毁。"}, "stageFundTitle": {"en": "Supply the 20M fund", "zh": "提供 2,000 万基金额度"}, "stageFundBody": {"en": "Following a future listing and the publication of funding, custody and oversight rules, place 20,000,000 company-supplied MA in a dedicated public wallet. Its proceeds are restricted to aid.", "zh": "未来上市并公布注资、保管与监督规则后，将公司提供的 2,000 万 MA 转入专用公开钱包，售出所得专用于援助。"}, "stageBurnTitle": {"en": "Match with a separate 20M burn", "zh": "另备 2,000 万对应销毁"}, "stageBurnBody": {"en": "Once all initial 20,000,000 fund MA are sold and the sales ledger is reconciled, burn another 20,000,000 MA supplied separately by the company. Publish reserve funding and transaction evidence; never take this allocation from the aid proceeds.", "zh": "初始基金 2,000 万 MA 全部售出且销售账目核对完成后，销毁公司另外提供的 2,000 万 MA。公开储备注资及交易凭证，不从援助所得中扣取这笔额度。"}, "stageAnnualTitle": {"en": "Continue with 2% + 2% each year", "zh": "此后每年持续投入 2% + 2%"}, "stageAnnualBody": {"en": "After the initial sale and matching-burn reconciliation, allocate 4% of eligible annual net profit: one 2% buys MA for the fund; the other 2% buys MA for burning. Both purchases use company funds and have separate records.", "zh": "完成初始售出及对应销毁核对后，每年投入符合口径净利润的 4%：其中 2% 回购 MA 补充基金，另 2% 回购 MA 后销毁。两部分都由公司出资并分别记录。"}, "basisKicker": {"en": "The annual calculation", "zh": "年度计算"}, "basisTitle": {"en": "A defined profit basis.", "zh": "明确利润口径。"}, "basisBody": {"en": "Eligible profit means the company’s audited annual net profit after tax and recovery of prior losses. Use the currency and accounting period of the audited accounts. A zero or negative eligible result yields a zero allocation under this formula.", "zh": "符合口径的利润，是公司经审计、扣除税费并弥补以往亏损后的年度净利润，采用审计账目的币种和会计期间。按本公式，符合口径利润为零或负数时，当年计算额度为零。"}, "formulaNote": {"en": "P = eligible positive annual net profit. Percentages describe the cash budget, not a fixed MA token quantity. The actual MA purchased depends on execution prices and disclosed costs.", "zh": "P 为符合口径的正年度净利润。百分比代表资金预算，不是固定 MA 数量；实际购得数量取决于执行价格和披露的费用。"}, "scheduleNote": {"en": "Before the first annual cycle, publish the accounts, calculation, first eligible financial year, execution timetable, venues, custody arrangements and treatment of fees. No buyback has started.", "zh": "首次年度执行前，公开审计账目、计算结果、首个适用财年、执行时间表、交易渠道、保管安排及费用处理。目前尚未开始回购。"}, "calcTitle": {"en": "Explore the allocation", "zh": "试算年度分配"}, "calcLabel": {"en": "Illustrative eligible net profit (accounting currency units)", "zh": "示例符合口径净利润（记账币种单位）"}, "calcTotal": {"en": "Total annual budget · 4%", "zh": "年度总预算 · 4%"}, "calcFund": {"en": "Fund replenishment · 2%", "zh": "基金补充 · 2%"}, "calcBurn": {"en": "Buyback and burn · 2%", "zh": "回购销毁 · 2%"}, "calcDisclaimer": {"en": "Illustration only. This is not reported company profit, a token-price estimate or a transaction tool.", "zh": "仅用于说明计算，不是已披露公司利润、代币估价或交易工具。"}, "calcHelp": {"en": "Enter a finite amount. Zero or a loss produces a zero budget; blank or invalid input has no calculated result.", "zh": "输入有效金额。零利润或亏损的预算为零；空白或无效输入不显示计算结果。"}, "proofKicker": {"en": "Evidence before totals", "zh": "先有凭证，再计入总量"}, "proofTitle": {"en": "Every action needs its own receipt.", "zh": "每一项行动，都要有独立凭证。"}, "proofBody": {"en": "Publish an annual reconciliation linking the profit calculation, buyback costs, tokens received, fund deposits and burn transactions. No transaction is counted twice.", "zh": "发布年度核对报告，关联利润计算、回购成本、实际取得代币、基金入账与销毁交易。同一笔交易不重复计数。"}, "burnMeaningTitle": {"en": "What “burn” will mean", "zh": "明确“销毁”的含义"}, "burnMeaningBody": {"en": "The intended route is an irrecoverable destination (“black-hole” address), subject to verification of the token and destination. A transfer there may leave contract totalSupply unchanged. Report inaccessible tokens separately from any contract-level supply reduction.", "zh": "计划使用经核验的不可取回目的地址（“黑洞”地址），须先核实代币及地址。此类转账可能不改变合约 totalSupply；将不可使用的代币与合约总供应量减少分别披露。"}, "separationTitle": {"en": "Keep programs separate", "zh": "不同计划独立记录"}, "separationBody": {"en": "This company matching burn and the annual 2% burn budget are separate from the existing 50,000,000 MA daily-burn proposal. Publish reserve sources and avoid double counting across all programs. Neither a sale nor a planned allocation proves a completed burn.", "zh": "公司对应销毁及年度 2% 销毁预算，独立于原有 5,000 万 MA 每日销毁提案。公开各储备来源，所有计划间不得重复计算。售出或计划配置都不能证明已完成销毁。"}, "noReturns": {"en": "This is a proposed company spending policy. It does not give token holders a right to company profits, a guaranteed return, a guaranteed buyback price or a promise of exchange listing.", "zh": "这是公司拟议的资金使用政策，不赋予代币持有人公司利润分配权，不承诺收益、回购价格或交易所上市。"}, "readinessTitle": {"en": "Current public record", "zh": "当前公开记录"}, "readinessBody": {"en": "Fund wallet: pending. Matching-burn reserve: not verified. Annual accounts and execution schedule: pending. Verified buybacks and matching burns: no published records. The website describes the plan and does not move assets.", "zh": "基金钱包待公布；对应销毁储备尚未核验；年度账目与执行时间表待公布；暂无已公开的经核验回购或对应销毁记录。本网站说明方案，不发起资产转移。"}, "backFund": {"en": "Explore the Mother Fund →", "zh": "了解妈妈基金 →"}, "resume": {"en": "Resume motion", "zh": "继续动效"}, "wallDocuments": {"en": "One institution. One public statement.", "zh": "一家机构，一份公开倡议书。"}, "wallDocumentsBody": {"en": "We invite organizations to provide a signed statement on their own letterhead and separate permission to publish their name, logo and approved document. A notarized statement is welcome if available. Select an authorized logo to open that institution’s statement directly.", "zh": "我们邀请机构提供使用自身抬头的签署倡议书，并明确授权公开名称、标志和文件；如有公证文件，也欢迎提供。点击获授权机构的标志，即可直接打开该机构的倡议书。"}, "formalInvitation": {"en": "Read the invitation & statement template →", "zh": "查看正式邀请函与倡议书模板 →"}};
  function language() { return window.MAPrograms ? window.MAPrograms.getLanguage() : 'en'; }
  function text(key) { return (COPY[key] || {})[language() === 'zh' ? 'zh' : 'en'] || key; }
  function update() {
    var lang = language();
    document.querySelectorAll('[data-fund-copy]').forEach(function (node) { node.textContent = text(node.dataset.fundCopy); node.lang = lang === 'zh' ? 'zh' : 'en'; });
    var note = document.querySelector('[data-fund-language-note]');
    if (note) { note.hidden = lang === 'zh' || lang === 'en'; note.lang = 'en'; note.textContent = 'The October 2026 fund and buyback update is available in English and Chinese. New policy sections below use English for the selected language.'; }
    if (document.body.dataset.page === 'buyback') document.title = lang === 'zh' ? 'MA 回购与妈妈基金 | AstroBridge' : 'MA Buyback & Mother Fund | AstroBridge';
    var button = document.querySelector('[data-wall-pause]');
    if (button) button.textContent = text(button.getAttribute('aria-pressed') === 'true' ? 'resume' : 'pause');
    calculate();
    renderSupporters();
  }
  function calculate() {
    var input = document.getElementById('annual-profit'); if (!input) return;
    var amount = input.valueAsNumber;
    var valid = input.value.trim() !== '' && Number.isFinite(amount);
    input.setAttribute('aria-invalid', String(!valid));
    var formatter = new Intl.NumberFormat(language(), { maximumFractionDigits: 2, minimumFractionDigits: 2 });
    [['total', 0.04], ['fund', 0.02], ['burn', 0.02]].forEach(function (entry) {
      document.querySelector('[data-profit-' + entry[0] + ']').textContent = valid ? formatter.format(Math.max(0, amount) * entry[1]) : '—';
    });
  }

  var supporters = [];
  function approvedDocument(person) {
    var d = person && person.document;
    return !!(d && d.publicationPermission === true && d.verified === true &&
      ['joint-statement', 'notarial-record'].indexOf(d.kind) >= 0 &&
      /^\/fund-records\/[a-zA-Z0-9_-]+\.(pdf|html)$/.test(d.url || '') &&
      /^[a-f0-9]{64}$/.test(d.sha256 || ''));
  }
  function authorizedParticipant(p) {
    // Registry dates use the program's published Asia/Shanghai calendar day.
    var now = new Date(Date.now() + 8 * 60 * 60 * 1000).toISOString().slice(0, 10);
    return !!(p && p.status === 'confirmed' && p.namePermission === true &&
      typeof p.name === 'string' && p.name.trim() && typeof p.role === 'string' && p.role.trim() &&
      /^\d{4}-\d{2}-\d{2}$/.test(p.approvedAt || '') && p.approvedAt <= now &&
      /^\d{4}-\d{2}-\d{2}$/.test(p.permissionExpiresAt || '') && p.permissionExpiresAt >= now && approvedDocument(p));
  }
  function logoAllowed(person) {
    return person.logoPermission === true && /^\/assets\/[a-zA-Z0-9_./-]+\.(png|webp|jpg|svg)$/.test(person.logo || '') && !person.logo.includes('..');
  }
  function documentLabel(person) {
    var notarized = person.document.kind === 'notarial-record';
    return (language() === 'zh' ? (notarized ? '打开公证文件：' : '打开倡议书：') : (notarized ? 'Open notarial record: ' : 'Open public statement: ')) + person.name;
  }
  function appendIdentity(link, person) {
    if (logoAllowed(person)) {
      var logo = document.createElement('img'); logo.src = person.logo; logo.alt = ''; logo.loading = 'lazy'; link.appendChild(logo);
    }
    var name = document.createElement('strong'); name.textContent = person.name; link.appendChild(name);
  }
  function documentLink(person, className) {
    var link = document.createElement('a'); link.className = className; link.href = person.document.url;
    link.setAttribute('aria-label', documentLabel(person));
    return link;
  }
  function renderSupporters() {
    var root = document.querySelector('[data-confirmed-supporters]'); if (!root) return;
    root.replaceChildren();
    var wall = document.querySelector('[data-supporter-wall]');
    var oldStrip = wall && wall.querySelector('.confirmed-carousel'); if (oldStrip) oldStrip.remove();
    var featured = [];
    if (wall) wall.querySelector('.wall-track').hidden = false;
    if (supporters.length) {
      var status = document.querySelector('[data-fund-copy="wallStatus"]');
      if (status) status.textContent = language() === 'zh' ? '联名墙 · 点击机构，阅读其签署文件' : 'Co-signing wall · Select an institution to read its statement';
      var consent = document.querySelector('[data-fund-copy="wallConsent"]');
      if (consent) consent.textContent = language() === 'zh' ? '下方仅展示书面授权且已提供公开文件的参与者。联名范围以各自签署文件为准，不自动代表资金监督、托管或代币背书。' : 'Only authorized participants with approved public documents appear below. Each statement defines its scope; participation does not automatically establish oversight, custody or token endorsement.';
    }
    supporters.forEach(function (person, index) {
      var card = document.createElement('article'); card.className = 'fund-card supporter-confirmed';
      var identity = documentLink(person, 'supporter-document-link'); appendIdentity(identity, person);
      var role = document.createElement('p'); role.textContent = person.role;
      var proof = documentLink(person, 'supporter-proof'); proof.textContent = (language() === 'zh' ? '阅读签署文件 · ' : 'Read signed document · ') + person.approvedAt;
      card.append(identity, role, proof); root.appendChild(card);
      if (person.featured === true) featured.push(person);
    });
    if (wall && featured.length) {
      wall.querySelector('.wall-track').hidden = true;
      var strip = document.createElement('div'); strip.className = 'confirmed-carousel';
      [0, 1].forEach(function (duplicate) {
        var group = document.createElement('div'); group.className = 'carousel-group';
        if (duplicate) group.setAttribute('aria-hidden', 'true');
        featured.forEach(function (person, index) {
          var tile = documentLink(person, 'supporter-slot'); appendIdentity(tile, person);
          tile.style.setProperty('--glow-delay', (index * 1.4) + 's');
          if (duplicate) tile.tabIndex = -1;
          group.appendChild(tile);
        });
        strip.appendChild(group);
      });
      wall.appendChild(strip);
    }
  }
  async function loadSupporters() {
    if (!document.querySelector('[data-confirmed-supporters]')) return;
    try {
      var response = await fetch('/data/ma-fund-supporters.json', {cache:'no-store'}); if (!response.ok) return;
      var data = await response.json();
      supporters = (Array.isArray(data.participants) ? data.participants : []).filter(authorizedParticipant);
      renderSupporters();
    } catch (_) { /* Leave the explicit pending state when the registry is unavailable. */ }
  }

  function init() {
    var button = document.querySelector('[data-wall-pause]');
    if (button) button.addEventListener('click', function () {
      var paused = button.getAttribute('aria-pressed') !== 'true';
      button.setAttribute('aria-pressed', String(paused));
      document.querySelector('[data-supporter-wall]').classList.toggle('is-paused', paused);
      button.textContent = text(paused ? 'resume' : 'pause');
    });
    var input = document.getElementById('annual-profit'); if (input) { input.addEventListener('input', calculate); input.addEventListener('change', calculate); }
    update();
    loadSupporters();
  }
  window.addEventListener('ma:languagechange', update);
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init, {once:true}); else init();
})();
