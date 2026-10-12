(() => {
  'use strict';
  const tiers = Object.freeze([
    { from: 1, to: 1000, amount: 10000 },
    { from: 1001, to: 100000, amount: 1000 },
    { from: 100001, to: 1000000, amount: 500 },
    { from: 1000001, to: 46000000, amount: 5 },
    { from: 46000001, to: 100000000, amount: 4 },
  ].map(Object.freeze));
  function allocationAt(position) {
    if (!Number.isSafeInteger(position) || position < 1 || position > 100000000) return null;
    return tiers.find(tier => position >= tier.from && position <= tier.to).amount;
  }
  const translations = {
    zh: {
      skip:'跳至正文', banner:'计划 · 登记和领取尚未开放，本页面不发放代币。', navAllocation:'空投分档', navLock:'锁定一年', navChain:'自有网络 ↗',
      eyebrow:'MA 用户社区 / 未来主网', badge:'计划 · 尚未开放', title:'ASTRO 主网代币\n空投计划。', intro:'面向 MA 用户的社区空投规划，拟在我们自己的网络实施。开放登记前，先了解规则和工程准备情况。',
      closed:'领取尚未开放', explore:'查看空投计划 ↓', closedNote:'本页仅作计划说明，不收集钱包地址、不连接钱包、不请求签名，也不接受充值。', art:'概念配图，不是实时网络地图，也不代表正式主网已上线。',
      budget:'拟定空投预算，不是代币发行总量', users:'规划名额，不是已注册用户数', year:'一年', yearNote:'每份奖励实际在链上发放并锁定后起算',
      allocationTitle:'早期参与，分阶段规划。', allocationIntro:'以下是拟定分档，每人仅对应一档、不叠加。正式开放前须公布有效登记、资格审核和排序规则；本表不是实时排队或领取凭证。', tableCaption:'空投分配草案 · 以最终公布规则为准', order:'有效序号', slots:'名额', perUser:'每位合格用户 / ASTRO', subtotal:'本档合计 / ASTRO', total:'合计',
      calcTitle:'查看示例档位', calcNote:'只输入一个示例序号，不会占用名额或登记钱包。', sample:'示例序号（1—100,000,000）', result:'{amount} ASTRO · 仅为拟定额度', invalid:'请输入 1—100,000,000 之间的整数。',
      lockTitle:'你的奖励，\n单独计算一年。', lockBody:'计划从每份奖励成功发放并进入链上锁仓的时刻起锁定一年，不从注册日计时，也不是全体用户统一解锁。每位受益人分别记录解锁时间。',
      step1:'登记与资格核验', step1b:'未来通过 MA 官方扫码入口确认钱包归属。登记成功不代表代币到账，也不开始锁仓计时。', step2:'实际发放并锁定', step2b:'合约记录受益人、数量和起点。本次完整活动同一地址只能领取一份，未到期不可提取。', step3:'满一年后可提取', step3b:'完整锁定期结束后允许提取。MA 应分别显示锁定资产与可用资产；一年精确算法和费用／代付规则将在开放前公布。',
      readyTitle:'先有计划，再验收上线。', readyBody:'MA 已有自有网络开发接入工程，但正式连接和本次空投尚未开放。主网参数、资产许可、合约安全与手机验收都须先完成。',
      addressTitle:'一个地址不等于一个人', addressBody:'拟由合约防止同一受益地址重复领取。一个人可以创建多个地址，因此还需要 MA 用户资格核验和反批量刷号审核。', assetTitle:'ASTRO 与 MA 分开', assetBody:'本计划面向未来主网 ASTRO，不是原有 MA 代币，也不是另行预售的迷因币。资产形式、资金保管方式与正式合约参数仍待确定。',
      safetyTitle:'不提交任何钱包秘密', safetyBody:'本计划页不要求付款、私钥、助记词、签名或代币授权。本页尚未公布正式领取合约，也没有领取二维码。',
      bottomTitle:'登记与领取尚未开放。', bottomBody:'本页是计划说明，不是实际发币、投资要约、已注资储备，也不保证资格、币价或用户增长。正式启用前须公布最终规则、适用地区要求、隐私条款及上线验收证据。', maLink:'了解 MA / Astro Chat ↗', footer:'计划 · 更新于 2026 年 10 月 12 日 · 不收集登记数据', privacy:'隐私政策',
    },
    es: {
      skip:'Saltar al contenido', banner:'PLAN · El registro y la reclamación no están abiertos. Esta página no distribuye tokens.', navAllocation:'Asignación', navLock:'Bloqueo de un año', navChain:'Red ↗',
      eyebrow:'COMUNIDAD MA / FUTURA RED PRINCIPAL', badge:'PLANIFICADO · NO ACTIVO', title:'Plan de airdrop\nde ASTRO en la red principal.', intro:'Una asignación comunitaria propuesta para usuarios de MA en nuestra futura red. Conoce las reglas antes de que abra el registro.',
      closed:'Reclamación no disponible', explore:'Explorar el plan ↓', closedNote:'Página informativa: no recopila direcciones, conecta carteras, solicita firmas ni acepta depósitos.', art:'Ilustración conceptual; no es un mapa en vivo ni prueba del lanzamiento de la red.',
      budget:'Presupuesto propuesto del airdrop, no suministro total', users:'Plazas objetivo, no usuarios registrados', year:'1 año', yearNote:'Desde cada asignación financiada y bloqueada en cadena',
      allocationTitle:'Participación temprana. Asignación por etapas.', allocationIntro:'Tramos propuestos exclusivos, no acumulativos. El orden exige reglas de registro verificado antes del lanzamiento; no es una cola activa ni un derecho adquirido.', tableCaption:'Calendario provisional · sujeto a reglas finales', order:'Orden elegible', slots:'Plazas', perUser:'ASTRO / usuario elegible', subtotal:'ASTRO / tramo', total:'Total',
      calcTitle:'Explora un tramo propuesto', calcNote:'Introduce solo una posición de ejemplo. No reserva una plaza ni registra una cartera.', sample:'Posición de ejemplo (1–100.000.000)', result:'{amount} ASTRO · solo asignación propuesta', invalid:'Introduce un entero entre 1 y 100.000.000.',
      lockTitle:'Tu asignación.\nTu propio plazo de un año.', lockBody:'El bloqueo previsto empieza cuando la asignación se financia y bloquea correctamente en cadena, no al registrarse ni en una fecha común. Cada beneficiario tiene su propia fecha de desbloqueo.',
      step1:'Registro y verificación', step1b:'Futuro acceso QR de MA y verificación de la cartera. El registro no entrega tokens ni inicia el bloqueo.', step2:'Recibir una asignación bloqueada', step2b:'El contrato registra beneficiario, cantidad e inicio. Una asignación por dirección en toda la campaña; sin retirada anticipada.', step3:'Retirar después de un año', step3b:'Tras el plazo completo se permite retirar. MA debe separar activos bloqueados y disponibles. La definición temporal exacta y las comisiones o subsidios se publicarán antes del lanzamiento.',
      readyTitle:'Primero el plan. Después un lanzamiento verificado.', readyBody:'MA tiene trabajo de integración de desarrollo para nuestra red, pero la conexión de producción y este airdrop no están abiertos. Faltan parámetros de red, autorización del activo, seguridad del contrato y aceptación en dispositivos.',
      addressTitle:'Una dirección no es una persona', addressBody:'El contrato previsto impide repetir por dirección beneficiaria. También se necesitan criterios MA y controles antiabuso: una persona puede crear varias direcciones.', assetTitle:'ASTRO es distinto de MA', assetBody:'Este plan trata del futuro ASTRO de la red principal, no del token MA existente ni de un meme token de preventa separado. La forma del activo, custodia y contratos oficiales están por definir.',
      safetyTitle:'Nunca compartas secretos', safetyBody:'Esta página no pide pagos, claves privadas, frases semilla, firmas ni permisos sobre tokens. Aquí no se ha publicado un contrato ni un QR de reclamación oficial.',
      bottomTitle:'Registro y reclamación no disponibles.', bottomBody:'Es una propuesta, no una distribución, oferta de inversión, reserva financiada ni garantía de elegibilidad, valor o crecimiento. Antes de activarla se publicarán reglas, requisitos regionales, privacidad y pruebas del lanzamiento.', maLink:'Descubrir MA / Astro Chat ↗', footer:'PLAN · Actualizado el 12 de octubre de 2026 · Sin datos de registro', privacy:'Privacidad',
    },
    fr: {
      skip:'Aller au contenu', banner:'PROJET · Inscription et réclamation fermées. Aucun jeton n’est distribué ici.', navAllocation:'Répartition', navLock:'Blocage d’un an', navChain:'Réseau ↗',
      eyebrow:'COMMUNAUTÉ MA / FUTUR RÉSEAU PRINCIPAL', badge:'PRÉVU · NON ACTIF', title:'Projet d’airdrop ASTRO\nsur le réseau principal.', intro:'Une allocation communautaire proposée aux utilisateurs MA sur notre futur réseau. Découvrez les règles avant l’ouverture des inscriptions.',
      closed:'Réclamation non ouverte', explore:'Découvrir le projet ↓', closedNote:'Page informative : aucune collecte d’adresses, connexion de portefeuille, signature ou réception de fonds.', art:'Illustration conceptuelle, ni carte en direct ni preuve de lancement du réseau.',
      budget:'Budget d’airdrop proposé, pas l’offre totale du jeton', users:'Places visées, pas utilisateurs inscrits', year:'1 an', yearNote:'À partir de chaque allocation financée et bloquée en chaîne',
      allocationTitle:'Participation précoce. Allocation par étapes.', allocationIntro:'Tranches proposées exclusives, non cumulatives. L’ordre nécessitera des règles d’inscription vérifiée avant lancement ; ce tableau ne crée ni file active ni droit acquis.', tableCaption:'Répartition provisoire · règles finales à publier', order:'Ordre admissible', slots:'Places', perUser:'ASTRO / utilisateur admissible', subtotal:'ASTRO / tranche', total:'Total',
      calcTitle:'Explorer une tranche proposée', calcNote:'Saisissez uniquement un rang fictif. Aucune place réservée, aucun portefeuille inscrit.', sample:'Rang d’exemple (1–100 000 000)', result:'{amount} ASTRO · allocation proposée uniquement', invalid:'Saisissez un entier entre 1 et 100 000 000.',
      lockTitle:'Votre allocation.\nVotre propre année de blocage.', lockBody:'Le blocage prévu commence lors du financement et du blocage effectifs en chaîne, pas à l’inscription ni à une date commune. Chaque bénéficiaire a sa propre échéance.',
      step1:'Inscription et vérification', step1b:'Futur accès QR MA et vérification du portefeuille. L’inscription ne distribue pas de jetons et ne déclenche pas le blocage.', step2:'Allocation financée et bloquée', step2b:'Le contrat enregistre bénéficiaire, montant et date de début. Une allocation par adresse pour toute la campagne, sans retrait anticipé.', step3:'Retrait après un an', step3b:'Le retrait devient possible après toute la période. MA doit distinguer actifs bloqués et disponibles. Le calcul exact du temps et les frais ou subventions seront publiés avant lancement.',
      readyTitle:'Un projet d’abord. Un lancement vérifié ensuite.', readyBody:'MA dispose de travaux d’intégration de développement pour notre réseau, mais ni sa connexion de production ni cet airdrop ne sont ouverts. Paramètres réseau, autorisation d’actif, sécurité du contrat et tests sur appareils restent nécessaires.',
      addressTitle:'Une adresse n’est pas une personne', addressBody:'Le contrat prévu évite les réclamations répétées par adresse bénéficiaire. L’admissibilité MA et les contrôles anti-abus restent nécessaires, car une personne peut créer plusieurs adresses.', assetTitle:'ASTRO est distinct de MA', assetBody:'Ce projet concerne le futur ASTRO du réseau principal, ni le jeton MA existant ni un meme token de prévente distinct. Nature de l’actif, garde et contrats officiels restent à définir.',
      safetyTitle:'Ne partagez jamais vos secrets', safetyBody:'Cette page ne demande ni paiement, clé privée, phrase de récupération, signature ni autorisation de jetons. Aucun contrat ni QR officiel de réclamation n’y est publié.',
      bottomTitle:'Inscription et réclamation non ouvertes.', bottomBody:'Il s’agit d’une proposition, pas d’une distribution, offre d’investissement, réserve financée ou garantie d’admissibilité, de valeur ou de croissance. Règles finales, exigences régionales, confidentialité et preuves devront précéder l’activation.', maLink:'Découvrir MA / Astro Chat ↗', footer:'PROJET · Mise à jour le 12 octobre 2026 · Aucune donnée d’inscription collectée', privacy:'Confidentialité',
    },
    de: {
      skip:'Zum Inhalt', banner:'PLAN · Registrierung und Beanspruchung sind nicht geöffnet. Hier werden keine Token verteilt.', navAllocation:'Zuteilung', navLock:'Einjährige Sperre', navChain:'Netzwerk ↗',
      eyebrow:'MA-COMMUNITY / KÜNFTIGES MAINNET', badge:'GEPLANT · NICHT AKTIV', title:'ASTRO-Mainnet-\nAirdrop-Plan.', intro:'Eine geplante Community-Zuteilung für MA-Nutzer in unserem künftigen Netzwerk. Informieren Sie sich vor Öffnung der Registrierung.',
      closed:'Beanspruchung noch geschlossen', explore:'Plan ansehen ↓', closedNote:'Informationsseite: keine Wallet-Adressen, Wallet-Verbindungen, Signaturen oder Einzahlungen.', art:'Konzeptgrafik, keine Live-Netzwerkkarte oder Bestätigung eines Mainnet-Starts.',
      budget:'Geplantes Airdrop-Budget, nicht das gesamte Token-Angebot', users:'Geplante Plätze, keine registrierten Nutzer', year:'1 Jahr', yearNote:'Ab jeder finanzierten und gesperrten On-Chain-Zuteilung',
      allocationTitle:'Frühe Teilnahme. Gestaffelte Zuteilung.', allocationIntro:'Die vorgeschlagenen Stufen sind nicht kumulativ. Die Reihenfolge benötigt vor dem Start Regeln zur verifizierten Registrierung; dies ist keine aktive Warteschlange und kein Anspruch.', tableCaption:'Zuteilungsentwurf · endgültige Regeln vorbehalten', order:'Berechtigte Reihenfolge', slots:'Plätze', perUser:'ASTRO / berechtigter Nutzer', subtotal:'ASTRO / Stufe', total:'Gesamt',
      calcTitle:'Eine geplante Stufe erkunden', calcNote:'Nur eine Beispielposition eingeben. Kein Platz wird reserviert und keine Wallet registriert.', sample:'Beispielposition (1–100.000.000)', result:'{amount} ASTRO · nur geplante Zuteilung', invalid:'Eine ganze Zahl zwischen 1 und 100.000.000 eingeben.',
      lockTitle:'Ihre Zuteilung.\nIhr eigenes Sperrjahr.', lockBody:'Die geplante Sperre beginnt mit der tatsächlichen Finanzierung und Sperrung auf der Blockchain, nicht bei Registrierung oder an einem gemeinsamen Starttag. Jede begünstigte Adresse hat ihren eigenen Freigabezeitpunkt.',
      step1:'Registrieren und prüfen', step1b:'Künftiger MA-QR-Zugang mit Wallet-Nachweis. Die Registrierung liefert keine Token und startet keine Sperre.', step2:'Finanzierte Sperrzuteilung erhalten', step2b:'Der Vertrag vermerkt Begünstigten, Betrag und Beginn. Eine Zuteilung je Adresse in der gesamten Kampagne, keine vorzeitige Auszahlung.', step3:'Nach einem Jahr abheben', step3b:'Erst nach Ablauf der vollen Sperre ist eine Auszahlung möglich. MA soll gesperrte und verfügbare Werte trennen. Zeitberechnung und Gebühren oder Zuschüsse werden vor dem Start veröffentlicht.',
      readyTitle:'Erst planen. Dann geprüft starten.', readyBody:'MA hat Entwicklungsarbeiten zur eigenen Netzwerkanbindung, aber die Produktionsverbindung und dieser Airdrop sind nicht geöffnet. Netzwerkparameter, Asset-Freigabe, Vertragssicherheit und Gerätetests müssen zuerst fertiggestellt werden.',
      addressTitle:'Eine Adresse ist keine Person', addressBody:'Der geplante Vertrag verhindert wiederholte Ansprüche je begünstigter Adresse. MA-Berechtigung und Missbrauchsprüfung bleiben nötig: Eine Person kann mehrere Adressen erstellen.', assetTitle:'ASTRO ist nicht MA', assetBody:'Dieser Plan betrifft künftiges Mainnet-ASTRO, nicht den bestehenden MA-Token oder einen separaten Presale-Meme-Token. Asset-Form, Verwahrung und offizielle Verträge sind noch festzulegen.',
      safetyTitle:'Niemals Geheimnisse teilen', safetyBody:'Diese Planungsseite verlangt keine Zahlung, privaten Schlüssel, Seed-Phrase, Signatur oder Token-Freigabe. Hier wurden kein offizieller Anspruchsvertrag und kein Anspruchs-QR veröffentlicht.',
      bottomTitle:'Registrierung und Beanspruchung geschlossen.', bottomBody:'Dies ist ein Vorschlag, keine Verteilung, kein Investmentangebot, keine finanzierte Reserve und keine Garantie für Berechtigung, Wert oder Wachstum. Endgültige Regeln, regionale Anforderungen, Datenschutz und Startnachweise müssen vor der Aktivierung veröffentlicht werden.', maLink:'MA / Astro Chat entdecken ↗', footer:'PLAN · Stand 12. Oktober 2026 · Keine Registrierungsdaten erfasst', privacy:'Datenschutz',
    },
    ja: {
      skip:'本文へ', banner:'計画段階 · 登録・受取は未開始です。このページではトークンを配布しません。', navAllocation:'配分', navLock:'1年間のロック', navChain:'ネットワーク ↗',
      eyebrow:'MA コミュニティ / 将来のメインネット', badge:'計画 · 未開始', title:'ASTRO メインネット\nエアドロップ計画。', intro:'将来の独自ネットワークで MA ユーザーに向けたコミュニティ配分を計画しています。登録開始前にルールをご確認ください。',
      closed:'受取はまだ開始していません', explore:'計画を見る ↓', closedNote:'説明専用ページです。アドレスの収集、ウォレット接続、署名要求、入金受付は行いません。', art:'概念図です。稼働中のネットワーク地図やメインネット公開の証拠ではありません。',
      budget:'予定エアドロップ予算。トークン総発行量ではありません', users:'計画上の枠数。登録済みユーザー数ではありません', year:'1年間', yearNote:'各配分が実際にオンチェーンで資金確保・ロックされた時から',
      allocationTitle:'早期参加と段階的な配分。', allocationIntro:'提案された区分は重複・加算しません。開始前に検証済み登録の順序ルールが必要です。この表は実際の待機列や受取権ではありません。', tableCaption:'配分案 · 最終公表ルールに従います', order:'対象順序', slots:'枠数', perUser:'対象者1人 / ASTRO', subtotal:'区分合計 / ASTRO', total:'合計',
      calcTitle:'配分案を試す', calcNote:'サンプル順位のみを入力します。枠の予約やウォレット登録にはなりません。', sample:'サンプル順位（1～100,000,000）', result:'{amount} ASTRO · 配分案のみ', invalid:'1～100,000,000 の整数を入力してください。',
      lockTitle:'あなたの配分を、\n個別に1年間ロック。', lockBody:'予定ロックは実際の資金確保とオンチェーンロックの成功時から始まります。登録日や全員共通の開始日からではありません。受益者ごとに解除時刻を記録します。',
      step1:'登録と資格確認', step1b:'将来の MA 公式 QR 入口でウォレット所有権を確認します。登録だけでは配布されず、ロックも始まりません。', step2:'資金確保済みのロック配分', step2b:'コントラクトが受益者・数量・起点を記録します。活動全体で1アドレスにつき1配分、期限前の引き出し不可。', step3:'1年後に引き出し可能', step3b:'全ロック期間終了後に引き出せます。MA はロック資産と利用可能資産を区別します。時間の厳密な定義と手数料・代払い方針は開始前に公表します。',
      readyTitle:'まず計画。検証を経て公開。', readyBody:'MA には独自ネットワーク向けの開発接続作業がありますが、本番接続と本エアドロップは未開始です。正式パラメータ、資産承認、コントラクト安全性、実機検証が必要です。',
      addressTitle:'アドレス数と人数は違います', addressBody:'計画では同じ受益アドレスの重複受取を防ぎます。ただし1人で複数アドレスを作成できるため、MA 資格確認と不正対策も必要です。', assetTitle:'ASTRO と MA は別です', assetBody:'本計画は将来のメインネット ASTRO を対象とし、既存 MA トークンや別のプレセール・ミームトークンではありません。資産形式、保管方式、正式コントラクトは未確定です。',
      safetyTitle:'秘密情報を渡さないでください', safetyBody:'この計画ページは支払い、秘密鍵、シードフレーズ、署名、トークン承認を求めません。正式受取コントラクトや受取 QR は掲載していません。',
      bottomTitle:'登録・受取は未開始です。', bottomBody:'本ページは提案であり、配布、投資勧誘、資金確保済み準備金や資格・価値・成長の保証ではありません。開始前に最終ルール、対象地域要件、プライバシー規約、公開検証の証拠を示します。', maLink:'MA / Astro Chat を見る ↗', footer:'計画 · 2026年10月12日更新 · 登録データ収集なし', privacy:'プライバシー',
    },
    ko: {
      skip:'본문으로', banner:'계획 단계 · 등록과 수령이 열리지 않았습니다. 이 페이지는 토큰을 배포하지 않습니다.', navAllocation:'배정', navLock:'1년 잠금', navChain:'네트워크 ↗',
      eyebrow:'MA 커뮤니티 / 미래 메인넷', badge:'계획 · 미개시', title:'ASTRO 메인넷\n에어드롭 계획.', intro:'미래 자체 네트워크에서 MA 사용자를 위한 커뮤니티 배정을 제안합니다. 등록이 열리기 전에 규칙을 확인하세요.',
      closed:'아직 수령할 수 없습니다', explore:'계획 보기 ↓', closedNote:'안내 전용 페이지입니다. 지갑 주소 수집, 지갑 연결, 서명 요청, 입금 접수를 하지 않습니다.', art:'개념 이미지이며 실시간 네트워크 지도나 메인넷 출시 증거가 아닙니다.',
      budget:'에어드롭 제안 예산이며 토큰 총발행량이 아닙니다', users:'목표 자격 인원이며 등록 사용자 수가 아닙니다', year:'1년', yearNote:'각 배정이 실제 온체인에서 자금 확보 및 잠금된 시점부터',
      allocationTitle:'초기 참여와 단계별 배정.', allocationIntro:'제안 구간은 중복 합산되지 않습니다. 출시 전 검증된 등록 순서 규칙이 필요하며, 이 표는 실제 대기열이나 수령 권리가 아닙니다.', tableCaption:'배정 초안 · 최종 공지 규칙 적용', order:'자격 순서', slots:'인원', perUser:'자격 사용자 1명 / ASTRO', subtotal:'구간 합계 / ASTRO', total:'합계',
      calcTitle:'제안 구간 살펴보기', calcNote:'예시 순번만 입력하세요. 인원을 예약하거나 지갑을 등록하지 않습니다.', sample:'예시 순번 (1–100,000,000)', result:'{amount} ASTRO · 제안 배정량일 뿐입니다', invalid:'1–100,000,000 사이의 정수를 입력하세요.',
      lockTitle:'각자의 배정,\n각자의 1년 잠금.', lockBody:'제안된 잠금은 실제 자금 확보 및 온체인 잠금 성공 시 시작합니다. 등록일이나 공통 출시일 기준이 아닙니다. 수혜자마다 별도의 해제 시각을 기록합니다.',
      step1:'등록 및 자격 확인', step1b:'향후 MA 공식 QR 진입과 지갑 소유 확인을 지원할 계획입니다. 등록만으로 토큰이 지급되거나 잠금이 시작되지는 않습니다.', step2:'자금이 확보된 잠금 배정', step2b:'컨트랙트가 수혜자, 수량, 시작 시각을 기록합니다. 전체 캠페인에서 주소당 한 번 배정하며 조기 인출은 불가합니다.', step3:'1년 뒤 인출 가능', step3b:'전체 잠금 기간 이후 인출이 가능합니다. MA는 잠금 자산과 사용 가능 자산을 구분해야 합니다. 정확한 기간 계산 및 수수료·대납 정책은 출시 전에 공지합니다.',
      readyTitle:'먼저 계획하고, 검증 후 출시합니다.', readyBody:'MA에 자체 네트워크 개발 연동 작업이 있지만 운영 연결과 이번 에어드롭은 아직 열리지 않았습니다. 메인넷 설정, 자산 승인, 컨트랙트 보안, 실기기 검증을 먼저 완료해야 합니다.',
      addressTitle:'주소 하나가 사람 한 명은 아닙니다', addressBody:'계획된 컨트랙트는 동일 수혜 주소의 중복 수령을 막습니다. 한 사람이 여러 주소를 만들 수 있으므로 MA 자격 확인과 부정 이용 심사도 필요합니다.', assetTitle:'ASTRO와 MA는 다릅니다', assetBody:'이 계획은 미래 메인넷 ASTRO용이며 기존 MA 토큰이나 별도의 프리세일 밈 토큰이 아닙니다. 자산 형태, 보관 방식, 공식 컨트랙트는 아직 확정되지 않았습니다.',
      safetyTitle:'비밀 정보를 공유하지 마세요', safetyBody:'이 계획 페이지는 결제, 개인 키, 시드 문구, 서명, 토큰 승인을 요구하지 않습니다. 공식 수령 컨트랙트나 수령 QR을 게시하지 않았습니다.',
      bottomTitle:'등록과 수령은 아직 열리지 않았습니다.', bottomBody:'배포, 투자 제안, 자금 확보 준비금 또는 자격·가치·성장 보장이 아닌 계획입니다. 활성화 전에 최종 규칙, 지역 요건, 개인정보 조건, 출시 검증 증거를 공개해야 합니다.', maLink:'MA / Astro Chat 알아보기 ↗', footer:'계획 · 2026년 10월 12일 업데이트 · 등록 데이터 수집 없음', privacy:'개인정보 처리방침',
    },
  };
  if (typeof module !== 'undefined' && module.exports) {
    module.exports = { tiers, allocationAt, translations }; return;
  }
  const nodes = [...document.querySelectorAll('[data-t]')];
  const english = Object.fromEntries(nodes.map(node => [node.dataset.t, node.textContent]));
  Object.assign(english, { title:'ASTRO mainnet\nairdrop plan.', lockTitle:'Your allocation.\nYour own one-year clock.', result:'{amount} ASTRO · proposed allocation only', invalid:'Enter a whole number between 1 and 100,000,000.' });
  let language = 'en';
  const selector = document.getElementById('language');
  const position = document.getElementById('position');
  const result = document.getElementById('tier-result');
  const normalize = value => String(value || 'en').toLowerCase().split(/[-_]/)[0];
  function sample() {
    const amount = allocationAt(Number(position.value));
    const copy = language === 'en' ? english : translations[language];
    result.textContent = amount === null ? copy.invalid : copy.result.replace('{amount}', amount.toLocaleString(language));
  }
  function apply(value) {
    const requested = normalize(value);
    language = requested === 'en' || Object.hasOwn(translations, requested) ? requested : 'en';
    const copy = language === 'en' ? english : translations[language];
    nodes.forEach(node => { node.textContent = copy[node.dataset.t]; });
    document.documentElement.lang = language;
    document.title = copy.title.replace('\n',' ') + ' | AstroBridge';
    selector.value = language;
    const current = new URL(location.href);
    current.searchParams.set('lang', language);
    history.replaceState(null, '', current.pathname + current.search + current.hash);
    document.querySelectorAll('a[href]').forEach(link => {
      const url = new URL(link.getAttribute('href'), location.href);
      if (url.origin === location.origin && url.pathname.endsWith('.html')) {
        url.searchParams.set('lang', language); link.href = url.pathname + url.search + url.hash;
      }
    });
    try { localStorage.setItem('ma.program.language', language); } catch (_) {}
    sample();
  }
  let initial = new URLSearchParams(location.search).get('lang');
  if (!initial) { try { initial = localStorage.getItem('ma.program.language'); } catch (_) {} }
  apply(initial || 'en');
  selector.addEventListener('change', event => apply(event.target.value));
  position.addEventListener('input', sample);
})();
