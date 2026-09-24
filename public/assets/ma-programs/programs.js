(function () {
  'use strict';

  var LANGUAGES = ['en', 'zh', 'es', 'fr', 'de', 'ja', 'ko'];
  var STORAGE_KEY = 'ma.program.language';
  var DEFAULT_LANGUAGE = 'en';

  var EN = {
    navHome: 'Home', navRedeem: 'Card Redemption', navBurn: 'Daily Burn', navMeaning: 'Meaning of MA', navStories: 'Impact Stories',
    language: 'Language', statusPlanned: 'Planned', statusAwaitingChain: 'Awaiting on-chain connection', noVerifiedStories: 'No verified stories yet',
    dataUnavailable: 'Verified data unavailable', policies: 'Policies', privacy: 'Privacy', readOnly: 'Read-only', noWalletKeys: 'No wallet keys', noTokenMovement: 'No token movement',
    redeemEyebrow: 'MA Card Utility', redeemTitle: 'Card Redemption', redeemSubtitle: 'Turn eligible in-app cards into MA rewards through a secure, verifiable redemption flow.',
    redeemPoolLabel: 'Planned redemption pool', redeemPoolGuard: 'Ring-fenced target allocation. No token transfer is active on this page.',
    redeemLinkTitle: 'App-to-web verification', redeemNavigationOnly: 'App navigation connected · ownership verification not yet active', redeemReadinessTitle: 'A protected route, built in stages.',
    redeemReadinessBody: 'The MA app can open this official page in its Secure Browser. Redemption remains locked until the ownership ledger, one-time challenge and audited settlement contract are live.',
    redeemStepOneTitle: 'Open from MA', redeemStepOneBody: 'Launch this page from the MA Secure Browser to begin on the official domain.',
    redeemStepTwoTitle: 'Verify ownership', redeemStepTwoBody: 'The future service will confirm account identity, server-issued card ownership and redemption eligibility.',
    redeemStepThreeTitle: 'Review quote', redeemStepThreeBody: 'The user reviews the reference value, daily multiplier and destination wallet before signing.',
    redeemStepFourTitle: 'Settle on-chain', redeemStepFourBody: 'A confirmed transaction and an immutable receipt complete the redemption.',
    redeemGalleryCta: 'Explore all cards', redeemAction: 'Start redemption', redeemActionDisabled: 'Available after secure app linkage and on-chain settlement are enabled.',
    redeemPricingPending: 'Proposed launch schedule', redeemPricingTitle: 'Transparent card valuation', redeemPricingBody: 'Each rarity has a published reference value. The final daily payout scales fairly when verified demand exceeds the daily pool budget.',
    redeemFormula: 'Five-year baseline daily budget = 7,000,000 MA ÷ (5 × 365) = 3,835.616 MA', redeemFormulaNote: 'Final payout = card reference value × daily multiplier. This proposal requires governance approval before activation.', redeemThreeYear: '3-year pace', redeemFiveYear: '5-year baseline', redeemScheduleNote: 'Target window', redeemYears: 'years',
    tier: 'Tier', referenceValue: 'Proposed reference', poolProtection: 'Pool protection', dailyMultiplier: 'Daily multiplier',
    redeemProposalTitle: 'These values are a proposal, not a live promise.', redeemProposalBody: 'They activate only after the 7M pool is funded, card ownership is server-verifiable, settlement is audited and final rules are published. The four legacy purple-whale cards remain outside MA redemption until migration rules prevent double claims.',
    redeemGalleryTitle: 'Card gallery', redeemCatalogTitle: 'Every configured MA card.', redeemGalleryBody: 'Artwork is shown for identification. Display alone does not establish ownership, eligibility or a guaranteed redemption value.', redeemRegistryTitle: 'Matched to the MA app registry', redeemRegistryBody: '98 app cards use the same card IDs and avatar codes as MA. The four Purple Blue Whale images share one app card ID and remain excluded from redemption while migration is pending.', redeemLoadMore: 'Load more cards',
    redeemSecurityTitle: 'Security by design', redeemSecurityHeading: 'The browser never holds the keys.', redeemSecurityBody: 'Wallet private keys will never be stored in the page. Claims require server-issued inventory, single-use challenges, replay protection and auditable on-chain settlement.',
    redeemCurrentBoundary: 'Current safety boundary', redeemCurrentBoundaryBody: 'Today this page is read-only. It cannot inspect local app cards, sign for a user, connect a wallet or transfer MA.',
    burnEyebrow: 'Transparent Supply Action', burnTitle: 'Daily MA Burn', burnSubtitle: 'A planned, publicly verifiable schedule for reducing the designated MA burn reserve.', burnNotStarted: 'Not started · no burn counted',
    burnSeeMethod: 'See the schedule', burnSeeProof: 'View proof standard', burnReserveLabel: 'Planned burn reserve', burnReserveCaveat: 'Target reserve allocation. Funding and custody are not yet verified.',
    burnDailyLabel: 'Planned daily burn', burnDurationLabel: 'Planned duration', burnDurationValue: '365 scheduled days', burnTotalLabel: 'Verified total burned', burnRemainingLabel: 'Verified reserve remaining', burnFlowEyebrow: 'From reserve to irreversible proof', burnFlowTitle: 'A visible route, backed by transactions.',
    burnExecutionBody: 'The website visualizes only verified transactions; it never stores a private key or initiates burns from the browser.', burnWarehouse: 'Reserve warehouse', burnBlackHole: 'Burn destination', burnAnimationCaveat: 'Animation explains the intended flow. It is not evidence that a transaction occurred.',
    burnMethodTitle: 'Schedule calculation', burnMethodHeading: 'One transparent daily rule.', burnMethodBody: 'Days 1–364: 136,986 MA daily. Day 365: 137,096 MA. Total: exactly 50,000,000 MA; the final day includes a 110 MA rounding adjustment.',
    burnRemainderLabel: 'Final-day adjustment', burnRemainderNote: 'Included on day 365', burnSemanticsTitle: 'Burn semantics must be fixed before launch.', burnSemanticsBody: 'Sending to a dead address generally makes tokens inaccessible but may not reduce ERC-20 totalSupply. The final contract, destination and definition of “burned” will be published before counting begins.',
    burnSafeEyebrow: 'Safety gates', burnSafeTitle: 'Nothing starts on a promise alone.', burnGateOne: '1. Reserve funded', burnGateOneBody: 'The public reserve or vault balance matches the declared allocation.', burnGateTwo: '2. Rules locked', burnGateTwoBody: 'Token, amount, cap, schedule and destination are immutable or timelocked.', burnGateThree: '3. Transaction confirmed', burnGateThreeBody: 'The daily action is independently readable on BNB Smart Chain.', burnGateFour: '4. Dashboard updated', burnGateFourBody: 'Only confirmed chain data changes the public totals.',
    burnProofTitle: 'On-chain proof', burnProofHeading: 'Every counted burn needs a receipt.', burnProofBody: 'Each completed burn will be linked to its transaction hash, block, amount and confirmation time.', burnNoProofTitle: 'No verified burns yet.', burnDisclaimer: 'No burn is counted until an on-chain transaction is independently verifiable.', burnStartPending: 'Start date: pending', burnAddressPending: 'Burn destination: awaiting verified configuration',
    meaningEyebrow: 'Purpose Beyond Technology', meaningTitle: 'The Meaning of MA', meaningTagline: 'MA symbolizes a mother’s love.', meaningSubtitle: 'A planned transparent fund for low-income mothers around the world.', meaningReadStandards: 'Publication standards', meaningVisionCaption: 'Program vision illustration — not a beneficiary photograph.', motherVisionAlt: 'Abstract global network of mothers surrounding the MA symbol',
    meaningMissionTitle: 'Our intended mission', meaningMissionHeading: 'Practical support, recorded with dignity.', meaningMissionBody: 'The MA Mother Fund is being designed to support eligible mothers with practical, documented assistance delivered through accountable partners.', meaningSymbolTitle: 'Why MA', meaningSymbolBody: 'MA represents care, courage and the unconditional strength associated with a mother’s love across cultures.', meaningNoDisbursementTitle: 'No assistance has been claimed yet.', meaningNoDisbursementBody: 'Funding, eligibility, partner checks and reporting rules must be published before the first disbursement.',
    meaningCalculationTitle: 'Transparent calculation', meaningAllocationHeading: 'A 10 million MA target allocation.', meaningCalculationBodyCorrected: '10,000,000 MA equals 1% of the planned initial 1,000,000,000 MA launch supply. Its reference value will be 10,000,000 × a verified live MA price.', meaningAllocationLabel: 'Planned token allocation', meaningSupplyShareLabel: 'Share of planned initial supply', meaningSupplyShareNote: 'Based on 1,000,000,000 MA initial supply', meaningReferenceValueLabel: 'Verified reference value', meaningPricePending: 'Live price: awaiting verified market data', meaningAfterBurnNote: 'If total supply later decreases through a true burn, 10 million MA would represent a larger percentage of then-current supply. This page therefore uses the initial launch supply as its fixed reference.',
    meaningGovernanceTitle: 'Accountable support', impactTitle: 'Impact Stories', impactHeading: 'One mother helped. One accountable story.', impactSubtitle: 'Every verified case will pair a respectful, authorized photo with a concise account of the support provided and its outcome.', impactEmptyTitle: 'No verified stories yet', impactEmptyBody: 'The first story will appear only after consent, identity checks, support records and publication review are complete.', impactPrivacyBody: 'Stories use informed consent, data minimization and location masking when needed. Safety takes priority over promotion.', impactVerified: 'Verified story',
    impactStandardHeading: 'Consent before visibility.', impactConsent: 'Informed consent', impactConsentBody: 'Publication permission is recorded separately from receiving assistance and can be withdrawn.', impactMinimize: 'Minimum personal data', impactMinimizeBody: 'Use an approved alias and broad region whenever a full identity or exact location is unnecessary.', impactProof: 'Documented assistance', impactProofBody: 'Amount, use, date and partner evidence are checked before a record is marked verified.', impactReview: 'Safety review', impactReviewBody: 'Images and text are reviewed for dignity, child safety, coercion and re-identification risk.', impactPublicFields: 'Every published card will show', impactPublicFieldsBody: 'authorized photo, approved name or alias, country or region, story, support use, MA amount, support date, verification status and record identifier.', allocationAlt: 'Ten million MA represents one percent of the planned initial supply'
  };

  var OVERRIDES = {
    zh: {
      navHome: '首页', navRedeem: '卡片兑换', navBurn: '每日销毁', navMeaning: 'MA 的意义', navStories: '帮助故事', language: '语言', statusPlanned: '规划中', statusAwaitingChain: '等待链上连接', noVerifiedStories: '暂无已核验故事', dataUnavailable: '暂无已核验数据', policies: '政策', privacy: '隐私', readOnly: '只读', noWalletKeys: '不接触钱包私钥', noTokenMovement: '不发起代币转移',
      redeemEyebrow: 'MA 卡片权益', redeemTitle: '卡片兑换', redeemSubtitle: '通过安全、可核验的流程，将符合条件的应用内卡片兑换为 MA 奖励。', redeemPoolLabel: '计划兑换池', redeemPoolGuard: '计划配置额度。本页面不会发起代币转移。', redeemLinkTitle: '应用与网页核验', redeemNavigationOnly: '应用入口已连接 · 所有权核验尚未启用', redeemReadinessTitle: '分阶段建立的安全入口', redeemReadinessBody: 'MA 可以在安全浏览器中打开官方页面。所有权账本、一次性挑战和审计结算合约上线前，兑换保持锁定。', redeemStepOneTitle: '从 MA 打开', redeemStepTwoTitle: '核验所有权', redeemStepThreeTitle: '确认报价', redeemStepFourTitle: '链上结算', redeemGalleryCta: '查看全部卡片', redeemAction: '开始兑换', redeemActionDisabled: '安全应用连接和链上结算启用后开放。', redeemPricingPending: '拟议上线方案', redeemPricingTitle: '透明的卡片定价', redeemPricingBody: '每个稀有度都有公开参考值。当核验需求超过每日额度时，实际发放按比例调整。', redeemFormula: '五年基准每日额度 = 700 万 MA ÷（5 × 365）= 3,835.616 MA', redeemFormulaNote: '最终发放 = 卡片参考值 × 每日倍率。方案须经治理批准后启用。', redeemThreeYear: '3 年节奏', redeemFiveYear: '5 年基准', redeemScheduleNote: '目标周期', redeemYears: '年', tier: '等级', referenceValue: '拟议参考值', poolProtection: '额度保护', dailyMultiplier: '每日倍率', redeemProposalTitle: '这些数值是提案，不是实时承诺。', redeemProposalBody: '只有在 700 万 MA 资金池、服务端卡片所有权、审计结算和最终规则全部就绪后才会启用。四张旧紫鲸卡在迁移规则防止重复领取前不属于 MA 兑换范围。', redeemGalleryTitle: '卡片画廊', redeemCatalogTitle: '全部已配置的 MA 卡片', redeemGalleryBody: '图片用于识别。展示不代表拥有、符合资格或保证兑换值。', redeemRegistryTitle: '已与 MA 应用卡片表对齐', redeemRegistryBody: '98 张应用卡片使用与 MA 相同的卡片编号和头像代码。4 张紫色蓝鲸图片共用一个应用卡片编号，迁移完成前不参与兑换。', redeemSecurityTitle: '安全优先', redeemSecurityHeading: '浏览器不会持有私钥。', redeemSecurityBody: '页面不会保存钱包私钥。兑换需要服务端库存、一次性挑战、防重放和可审计的链上结算。', redeemCurrentBoundary: '当前安全边界', redeemCurrentBoundaryBody: '目前页面只读，不能读取应用卡片、替用户签名、连接钱包或转移 MA。',
      burnEyebrow: '透明供应量行动', burnTitle: 'MA 每日销毁', burnSubtitle: '针对指定 MA 销毁储备的公开、可核验计划。', burnNotStarted: '尚未开始 · 未计入销毁', burnSeeMethod: '查看计划', burnSeeProof: '查看核验标准', burnReserveLabel: '计划销毁储备', burnReserveCaveat: '目标储备配置，资金和托管尚未核验。', burnDailyLabel: '计划每日销毁', burnTotalLabel: '已核验累计销毁', burnRemainingLabel: '已核验剩余储备', burnFlowEyebrow: '从储备到不可逆证明', burnFlowTitle: '用交易支撑可见流程', burnExecutionBody: '网页只展示已核验交易，不保存私钥，也不会由浏览器发起销毁。', burnWarehouse: '储备仓', burnBlackHole: '销毁目的地', burnAnimationCaveat: '动画只解释计划流程，不代表已经发生交易。', burnMethodTitle: '计划计算', burnMethodHeading: '一条透明的每日规则', burnMethodBody: '第 1–364 天每天 136,986 MA，第 365 天 137,096 MA，共 50,000,000 MA；最后一天包含 110 MA 整数补差。', burnRemainderLabel: '最后一天补差', burnRemainderNote: '已计入第 365 天', burnSemanticsTitle: '启动前必须确定销毁语义。', burnSemanticsBody: '转入黑洞地址通常会使代币无法使用，但不一定减少 ERC-20 总供应量。最终合约、地址和“已销毁”定义会在计数前公布。', burnSafeEyebrow: '安全关卡', burnSafeTitle: '不会只凭承诺开始', burnGateOne: '1. 储备到账', burnGateTwo: '2. 规则锁定', burnGateThree: '3. 交易确认', burnGateFour: '4. 看板更新', burnProofTitle: '链上证明', burnProofHeading: '每笔计入的销毁都要有凭证', burnProofBody: '每次完成的销毁都会关联交易哈希、区块、数量和确认时间。', burnNoProofTitle: '暂无已核验销毁。', burnDisclaimer: '只有可独立核验的链上交易才会计入销毁。', burnStartPending: '开始日期：待定', burnAddressPending: '销毁目的地：等待核验配置',
      meaningEyebrow: '超越技术的使命', meaningTitle: 'MA 的意义', meaningTagline: 'MA 象征母爱。', meaningSubtitle: '一个面向全球低收入母亲、正在规划中的透明基金。', meaningReadStandards: '发布标准', meaningVisionCaption: '项目愿景插画 — 不是受助者照片。', motherVisionAlt: '围绕 MA 标志的全球母亲网络抽象插画', meaningMissionTitle: '我们的目标', meaningMissionHeading: '有尊严地记录务实帮助', meaningMissionBody: 'MA 妈妈基金计划通过负责的合作伙伴，为符合条件的母亲提供有记录的实际帮助。', meaningSymbolTitle: '为什么是 MA', meaningSymbolBody: 'MA 代表不同文化中母爱所象征的关爱、勇气和无条件力量。', meaningNoDisbursementTitle: '目前没有已申领的援助。', meaningNoDisbursementBody: '在首次发放前，资金、资格、合作伙伴核验和报告规则必须公开。', meaningCalculationTitle: '透明计算', meaningAllocationHeading: '1000 万 MA 的目标配置', meaningCalculationBodyCorrected: '10,000,000 MA 等于计划初始 1,000,000,000 MA 供应量的 1%。参考价值为 10,000,000 × 已核验的 MA 实时价格。', meaningAllocationLabel: '计划代币配置', meaningSupplyShareLabel: '占计划初始供应量', meaningSupplyShareNote: '以 1,000,000,000 MA 初始供应量为基准', meaningReferenceValueLabel: '已核验参考价值', meaningPricePending: '实时价格：等待已核验市场数据', meaningAfterBurnNote: '若通过真实销毁减少总供应量，1000 万 MA 占当时供应量的比例会增加，因此本页固定使用初始发行量作为参考。', meaningGovernanceTitle: '负责任的帮助', impactTitle: '帮助故事', impactHeading: '帮助一位妈妈，记录一份负责的故事', impactSubtitle: '每个已核验案例都会配有尊重当事人的授权图片，以及帮助内容和结果的简短记录。', impactEmptyTitle: '暂无已核验故事', impactEmptyBody: '取得同意、完成身份核验、确认帮助记录并通过发布审核后，首个故事才会展示。', impactPrivacyBody: '故事发布遵循知情同意、数据最小化，并在需要时隐藏位置。安全优先于宣传。', impactStandardHeading: '先取得同意，再公开故事', impactConsent: '知情同意', impactMinimize: '最少个人数据', impactProof: '有记录的帮助', impactReview: '安全审核', impactPublicFields: '每张公开卡片会展示', impactPublicFieldsBody: '授权图片、同意使用的姓名或化名、国家或地区、故事、帮助用途、MA 数量、帮助日期、核验状态和记录编号。', allocationAlt: '1000 万 MA 占计划初始供应量的百分之一'
    },
    es: { navHome: 'Inicio', navRedeem: 'Canje de tarjetas', navBurn: 'Quema diaria', navMeaning: 'Significado de MA', navStories: 'Historias de impacto', language: 'Idioma', statusPlanned: 'Planificado', statusAwaitingChain: 'Conexión on-chain pendiente', noVerifiedStories: 'Aún no hay historias verificadas', redeemTitle: 'Canje de tarjetas', redeemSubtitle: 'Convierte tarjetas elegibles en recompensas MA mediante un flujo seguro y verificable.', redeemAction: 'Iniciar canje', redeemGalleryTitle: 'Galería de tarjetas', redeemRegistryTitle: 'Alineado con el registro de la app MA', redeemRegistryBody: 'Las 98 tarjetas usan los mismos ID y códigos de avatar que MA. Las cuatro imágenes de la Ballena Azul Morada comparten un ID y quedan fuera del canje mientras se completa la migración.', redeemSecurityHeading: 'El navegador nunca guarda las claves.', burnTitle: 'Quema diaria de MA', burnSubtitle: 'Calendario planificado y verificable para reducir la reserva de quema.', burnMethodBody: 'Días 1–364: 136.986 MA al día. Día 365: 137.096 MA. Total: 50.000.000 MA, incluido el ajuste final de 110 MA.', meaningTitle: 'El significado de MA', meaningTagline: 'MA simboliza el amor de una madre.', meaningSubtitle: 'Un fondo transparente planificado para madres con bajos ingresos en todo el mundo.', impactTitle: 'Historias de impacto', impactEmptyTitle: 'Aún no hay historias verificadas', impactEmptyBody: 'La primera historia aparecerá después del consentimiento, las verificaciones y la revisión de publicación.' },
    fr: { navHome: 'Accueil', navRedeem: 'Échange de cartes', navBurn: 'Burn quotidien', navMeaning: 'Signification de MA', navStories: 'Histoires d’impact', language: 'Langue', statusPlanned: 'Planifié', statusAwaitingChain: 'Connexion on-chain en attente', noVerifiedStories: 'Aucune histoire vérifiée pour le moment', redeemTitle: 'Échange de cartes', redeemSubtitle: 'Convertissez les cartes éligibles en récompenses MA grâce à un parcours sûr et vérifiable.', redeemAction: 'Commencer l’échange', redeemGalleryTitle: 'Galerie de cartes', redeemRegistryTitle: 'Aligné sur le registre de l’app MA', redeemRegistryBody: 'Les 98 cartes utilisent les mêmes identifiants et codes d’avatar que MA. Les quatre visuels Purple Blue Whale partagent un identifiant et restent exclus de l’échange pendant la migration.', redeemSecurityHeading: 'Le navigateur ne conserve jamais les clés.', burnTitle: 'Burn quotidien de MA', burnSubtitle: 'Un calendrier planifié et vérifiable pour réduire la réserve de burn.', burnMethodBody: 'Jours 1–364 : 136 986 MA par jour. Jour 365 : 137 096 MA. Total : 50 000 000 MA, avec ajustement final de 110 MA.', meaningTitle: 'La signification de MA', meaningTagline: 'MA symbolise l’amour maternel.', meaningSubtitle: 'Un fonds transparent planifié pour les mères à faibles revenus dans le monde.', impactTitle: 'Histoires d’impact', impactEmptyTitle: 'Aucune histoire vérifiée pour le moment', impactEmptyBody: 'La première histoire sera publiée après consentement, vérifications et validation.' },
    de: { navHome: 'Startseite', navRedeem: 'Karteneinlösung', navBurn: 'Täglicher Burn', navMeaning: 'Bedeutung von MA', navStories: 'Wirkungsgeschichten', language: 'Sprache', statusPlanned: 'Geplant', statusAwaitingChain: 'On-Chain-Anbindung ausstehend', noVerifiedStories: 'Noch keine verifizierten Geschichten', redeemTitle: 'Karteneinlösung', redeemSubtitle: 'Berechtigte Karten werden über einen sicheren, prüfbaren Ablauf zu MA-Prämien.', redeemAction: 'Einlösung starten', redeemGalleryTitle: 'Kartengalerie', redeemRegistryTitle: 'Mit dem MA-App-Register abgeglichen', redeemRegistryBody: 'Die 98 App-Karten verwenden dieselben Karten-IDs und Avatar-Codes wie MA. Die vier Purple-Blue-Whale-Motive teilen eine Karten-ID und bleiben während der Migration von der Einlösung ausgeschlossen.', redeemSecurityHeading: 'Der Browser verwahrt niemals Schlüssel.', burnTitle: 'Täglicher MA-Burn', burnSubtitle: 'Geplanter, öffentlich prüfbarer Zeitplan für die Burn-Reserve.', burnMethodBody: 'Tage 1–364: täglich 136.986 MA. Tag 365: 137.096 MA. Insgesamt 50.000.000 MA einschließlich 110 MA Schlusskorrektur.', meaningTitle: 'Die Bedeutung von MA', meaningTagline: 'MA steht für die Liebe einer Mutter.', meaningSubtitle: 'Ein geplanter transparenter Fonds für einkommensschwache Mütter weltweit.', impactTitle: 'Wirkungsgeschichten', impactEmptyTitle: 'Noch keine verifizierten Geschichten', impactEmptyBody: 'Die erste Geschichte erscheint nach Einwilligung, Prüfung und redaktioneller Freigabe.' },
    ja: { navHome: 'ホーム', navRedeem: 'カード交換', navBurn: '日次バーン', navMeaning: 'MAの意味', navStories: '支援ストーリー', language: '言語', statusPlanned: '計画中', statusAwaitingChain: 'オンチェーン接続待ち', noVerifiedStories: '検証済みストーリーはまだありません', redeemTitle: 'カード交換', redeemSubtitle: '対象カードを安全で検証可能な手続きでMA報酬へ交換します。', redeemAction: '交換を開始', redeemGalleryTitle: 'カードギャラリー', redeemRegistryTitle: 'MAアプリの登録情報と一致', redeemRegistryBody: '98枚のアプリカードはMAと同じカードIDとアバターコードを使用しています。4種類の紫色シロナガスクジラ画像は1つのカードIDを共有し、移行中は交換対象外です。', redeemSecurityHeading: 'ブラウザは秘密鍵を保持しません。', burnTitle: 'MA日次バーン', burnSubtitle: '指定準備金を削減する公開検証可能な計画です。', burnMethodBody: '1～364日目は毎日136,986 MA、365日目は137,096 MA。最終日の端数調整110 MAを含め合計50,000,000 MAです。', meaningTitle: 'MAの意味', meaningTagline: 'MAは母の愛を象徴します。', meaningSubtitle: '世界の低所得の母親を支援する計画透明基金です。', impactTitle: '支援ストーリー', impactEmptyTitle: '検証済みストーリーはまだありません', impactEmptyBody: '同意、確認、掲載審査が完了した後に最初のストーリーを公開します。' },
    ko: { navHome: '홈', navRedeem: '카드 교환', navBurn: '일일 소각', navMeaning: 'MA의 의미', navStories: '지원 이야기', language: '언어', statusPlanned: '계획 중', statusAwaitingChain: '온체인 연결 대기 중', noVerifiedStories: '아직 검증된 이야기가 없습니다', redeemTitle: '카드 교환', redeemSubtitle: '대상 카드를 안전하고 검증 가능한 절차로 MA 보상으로 교환합니다.', redeemAction: '교환 시작', redeemGalleryTitle: '카드 갤러리', redeemRegistryTitle: 'MA 앱 등록 정보와 일치', redeemRegistryBody: '앱 카드 98장은 MA와 동일한 카드 ID와 아바타 코드를 사용합니다. 보라색 대왕고래 이미지 4장은 하나의 카드 ID를 공유하며 이전이 끝날 때까지 교환 대상이 아닙니다.', redeemSecurityHeading: '브라우저는 개인 키를 보관하지 않습니다.', burnTitle: 'MA 일일 소각', burnSubtitle: '지정 소각 준비금을 줄이기 위한 공개 검증 가능한 계획입니다.', burnMethodBody: '1–364일: 매일 136,986 MA. 365일: 137,096 MA. 마지막 110 MA 조정을 포함해 총 50,000,000 MA입니다.', meaningTitle: 'MA의 의미', meaningTagline: 'MA는 어머니의 사랑을 상징합니다.', meaningSubtitle: '전 세계 저소득층 어머니를 위한 투명한 기금 계획입니다.', impactTitle: '지원 이야기', impactEmptyTitle: '아직 검증된 이야기가 없습니다', impactEmptyBody: '동의와 검증, 게시 심사를 마친 후 첫 이야기를 공개합니다.' }
  };

  var currentLanguage = DEFAULT_LANGUAGE;
  var impactStories = [];
  var baseTitle = document.title;

  function normalize(value) {
    var code = String(value || '').toLowerCase().split(/[-_]/)[0];
    return LANGUAGES.indexOf(code) >= 0 ? code : DEFAULT_LANGUAGE;
  }

  function readStoredLanguage() {
    try { return normalize(localStorage.getItem(STORAGE_KEY)); } catch (_) { return DEFAULT_LANGUAGE; }
  }

  function translate(key, language) {
    var lang = normalize(language || currentLanguage);
    return (OVERRIDES[lang] && OVERRIDES[lang][key]) || EN[key] || key;
  }

  function replaceParams(value, params) {
    return String(value).replace(/\{(\w+)\}/g, function (_, key) { return params && params[key] !== undefined ? params[key] : ''; });
  }

  function valueFor(record, field, language) {
    var value = record && record[field];
    if (value && typeof value === 'object') return value[language] || value.en || Object.values(value)[0] || '';
    return value || '';
  }

  function applyTranslations() {
    document.documentElement.lang = currentLanguage;
    document.querySelectorAll('[data-language-select]').forEach(function (select) { select.value = currentLanguage; });
    document.querySelectorAll('[data-i18n]').forEach(function (element) {
      element.textContent = translate(element.dataset.i18n);
    });
    document.querySelectorAll('[data-i18n-attr]').forEach(function (element) {
      element.dataset.i18nAttr.split(',').forEach(function (rule) {
        var parts = rule.split(':');
        if (parts.length >= 2) element.setAttribute(parts[0].trim(), translate(parts.slice(1).join(':').trim()));
      });
    });
    document.querySelectorAll('[data-program-link]').forEach(function (link) {
      try {
        var url = new URL(link.getAttribute('href'), window.location.href);
        url.searchParams.set('lang', currentLanguage);
        url.searchParams.set('source', 'ma-site');
        link.setAttribute('href', url.pathname + url.search + url.hash);
      } catch (_) {}
    });
    document.title = currentLanguage === 'en' ? baseTitle : translate(document.body.dataset.page === 'redeem' ? 'redeemTitle' : document.body.dataset.page === 'burn' ? 'burnTitle' : 'meaningTitle') + ' | MA';
    window.dispatchEvent(new CustomEvent('ma:languagechange', { detail: { language: currentLanguage } }));
  }

  function setLanguage(next) {
    currentLanguage = normalize(next);
    try { localStorage.setItem(STORAGE_KEY, currentLanguage); } catch (_) {}
    applyTranslations();
    renderStories();
  }

  function bindLanguage() {
    document.querySelectorAll('[data-language-select]').forEach(function (select) {
      select.addEventListener('change', function () { setLanguage(select.value); });
    });
  }

  function validStory(story) {
    return story && story.status === 'verified' && story.consent && story.consent.publication === true &&
      valueFor(story, 'name', currentLanguage) && valueFor(story, 'region', currentLanguage) && valueFor(story, 'story', currentLanguage) &&
      valueFor(story, 'supportUse', currentLanguage) && String(story.amountMA || '').trim() && story.supportedAt &&
      story.image && typeof story.image.src === 'string' && valueFor(story.image, 'alt', currentLanguage) &&
      story.verification && story.verification.reference;
  }

  function safeImageSource(source) {
    try {
      var url = new URL(source, window.location.origin);
      return (url.origin === window.location.origin || url.protocol === 'https:') ? url.href : '';
    } catch (_) { return ''; }
  }

  function renderStories() {
    var root = document.querySelector('[data-impact-stories]');
    if (!root) return;
    var valid = impactStories.filter(validStory);
    if (!valid.length) {
      root.innerHTML = '<div class="empty-stories"><div><span class="empty-icon" aria-hidden="true">♡</span><h3>' + translate('impactEmptyTitle') + '</h3><p class="subtle">' + translate('impactEmptyBody') + '</p></div></div>';
      return;
    }
    var fragment = document.createDocumentFragment();
    valid.forEach(function (story) {
      var card = document.createElement('article'); card.className = 'story-card';
      var image = document.createElement('img'); image.src = safeImageSource(story.image.src); image.alt = valueFor(story.image, 'alt', currentLanguage); image.loading = 'lazy';
      var body = document.createElement('div'); body.className = 'story-body';
      var title = document.createElement('h3'); title.textContent = valueFor(story, 'name', currentLanguage);
      var meta = document.createElement('div'); meta.className = 'story-meta'; meta.textContent = valueFor(story, 'region', currentLanguage) + ' · ' + story.supportedAt;
      var storyText = document.createElement('p'); storyText.textContent = valueFor(story, 'story', currentLanguage);
      var use = document.createElement('p'); use.className = 'subtle'; use.textContent = valueFor(story, 'supportUse', currentLanguage) + ' · ' + new Intl.NumberFormat(currentLanguage).format(Number(story.amountMA)) + ' MA';
      var status = document.createElement('span'); status.className = 'pill good'; status.textContent = translate('impactVerified');
      body.append(title, meta, storyText, use, status); card.append(image, body); fragment.appendChild(card);
    });
    root.replaceChildren(fragment);
  }

  async function loadStories() {
    try {
      var response = await fetch('/data/ma-impact-stories.json', { credentials: 'same-origin', cache: 'no-store' });
      if (!response.ok) return;
      var payload = await response.json();
      if (payload && Array.isArray(payload.stories)) impactStories = payload.stories;
      renderStories();
    } catch (_) { renderStories(); }
  }

  async function loadProgramState() {
    if (!document.querySelector('[data-burn-total], [data-fund-value]')) return;
    try {
      var response = await fetch('/api/ma-program-state', { credentials: 'same-origin', cache: 'no-store', headers: { Accept: 'application/json' } });
      var state = await response.json();
      if (!state || state.ok !== true || state.mode !== 'live' || state.verified !== true) return;
      if (state.burn && state.burn.verifiedBurnedMA != null) document.querySelectorAll('[data-burn-total]').forEach(function (node) { node.textContent = state.burn.verifiedBurnedMA + ' MA'; });
      if (state.burn && state.burn.verifiedRemainingMA != null) document.querySelectorAll('[data-burn-remaining]').forEach(function (node) { node.textContent = state.burn.verifiedRemainingMA + ' MA'; });
      if (state.motherFund && state.motherFund.verifiedReferenceValueUSD != null) document.querySelectorAll('[data-fund-value]').forEach(function (node) { node.textContent = '$' + state.motherFund.verifiedReferenceValueUSD; });
      if (state.burn && Array.isArray(state.burn.proofs)) renderProofs(state.burn.proofs);
    } catch (_) {}
  }

  function renderProofs(proofs) {
    var root = document.querySelector('[data-burn-proof]'); if (!root || !proofs.length) return;
    var fragment = document.createDocumentFragment();
    proofs.forEach(function (proof) { var row = document.createElement('article'); row.className = 'proof-empty'; var link = document.createElement('a'); link.href = safeImageSource(proof.url || ''); link.target = '_blank'; link.rel = 'noreferrer'; link.textContent = proof.txHash || proof.url || 'Verified transaction'; row.appendChild(link); fragment.appendChild(row); });
    root.replaceChildren(fragment);
  }

  function init() {
    var queryLanguage = new URLSearchParams(window.location.search).get('lang');
    currentLanguage = normalize(queryLanguage || readStoredLanguage());
    bindLanguage(); applyTranslations(); renderStories(); loadStories(); loadProgramState();
  }

  window.MAPrograms = Object.freeze({ getLanguage: function () { return currentLanguage; }, setLanguage: setLanguage, translate: translate, languages: LANGUAGES.slice() });
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init, { once: true }); else init();
})();
