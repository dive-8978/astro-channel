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
  const dualCopy = {
    zh: {
      dualTitle:'双重资格，两项独立奖励。', dualIntro:'注册 MA 软件、持有 MA 迷因币，是两条不同的 ASTRO 主网奖励计划。MA 迷因币与 ASTRO 均尚未发行，两项活动尚未开放。',
      pathATitle:'注册 MA / Astro Chat', pathABody:'核验 MA 用户资格和钱包归属后，按分档参与社区空投。下方 10 亿 ASTRO 预算仅属于注册活动；每份实际发放的奖励拟锁定一年。',
      pathBTitle:'连续持有 MemeAstro（MA）六个月', pathBBody:'计划先发行 BNB 链 MA 迷因币，再推进 ASTRO 主网奖励。连续持有官方指定 MA 代币满六个月，是拟定资格条件；目前代币尚未发行，不能开始认定资格。',
      holderLink:'查看 MA 持币空投计划 ↗', dualNote:'同一地址可分别参与两项活动，经独立核验后每项各领一份。持币奖励池、兑换比例及到账后的锁仓规则待定，不计入注册活动预算。双路径不代表保证双倍到账。',
      holderPending:'持币活动开放前，须公布官方 MA 合约、最低持有量、连续持有与起算规则、奖励比例、独立预算和发放时间。一次余额快照不能证明连续持有六个月。',
      collectorTitle:'扫码或手填，共用一套核验登记。', collectorIntro:'以下仅展示计划中的登记方式。地址收集器未启用，本页不发送、保存、占位或核验任何地址。', scanTitle:'使用 MA 扫码', scanBody:'未来官方二维码将由 MA 展示活动和钱包，用户确认后再继续。目前没有启用领取二维码或应用登记链接。',
      manualTitle:'手动填入地址', manualBody:'未来手填与扫码共用钱包归属验证、去重和登记回执。仅填入地址，不能证明归属或取得空投资格。', collectorClosed:'地址收集器预览 · 登记未开放', bnbAddress:'BNB 链持币地址 · 仅持币活动使用', astroAddress:'ASTRO 主网收款地址 · 格式待网络确认',
      ownershipNote:'BNB 持币钱包与 ASTRO 收款钱包是两个角色，须核验各自归属或授权绑定；地址看起来一样不等于已证明跨网络归属。登记不应要求转币、代币授权、私钥或助记词。',
      budget:'注册活动 A 的拟定预算，不是总发行量或持币奖励池', step2b:'合约记录受益人、数量和起点。注册活动 A 内每个地址只能领取一次，持币活动的合法奖励另行记账；未到期不可提取。', addressBody:'按“活动标识＋受益地址”分别防重复，同一地址的两项合法奖励互不阻挡。一个人可创建多个地址，仍需 MA 资格和反批量审核。', assetBody:'ASTRO 是拟议主网奖励资产，MemeAstro（MA）是拟议 BNB 链迷因币，两者均尚未发行；MA / Astro Chat 软件是独立产品。正式合约与资产形式待公布。',
    },
    es: {
      dualTitle:'Dos vías. Recompensas separadas.', dualIntro:'El registro en MA y la tenencia del meme token MA son dos planes distintos de recompensas ASTRO. Ni MA ni ASTRO se han emitido; los programas están cerrados.',
      pathATitle:'Registrarse en MA / Astro Chat', pathABody:'Asignación por etapas tras verificar elegibilidad MA y propiedad de la cartera. Los mil millones de ASTRO de abajo corresponden solo al registro; cada asignación financiada se bloquearía un año.',
      pathBTitle:'Mantener MemeAstro (MA) seis meses', pathBBody:'Se prevé emitir MA en BNB Chain antes de las recompensas ASTRO. Mantener el token MA oficial seis meses completos y consecutivos sería el requisito; todavía no se ha emitido.',
      holderLink:'Ver el plan para titulares MA ↗', dualNote:'Una dirección puede participar en ambos programas, una vez por programa tras verificaciones independientes. Fondo, proporción y bloqueo de la recompensa por tenencia están pendientes, fuera del presupuesto de registro. No se garantiza un pago doble.',
      holderPending:'Antes de abrir: publicar contrato MA, saldo mínimo, reglas de continuidad e inicio, proporción, presupuesto y calendario. Un saldo puntual no demuestra seis meses de tenencia continua.',
      collectorTitle:'Escanear o escribir. Un registro verificado.', collectorIntro:'Solo vista previa. El recopilador está desactivado: no se envían, guardan, reservan ni verifican direcciones.', scanTitle:'Escanear desde MA', scanBody:'Un futuro QR oficial mostrará en MA el programa y la cartera para confirmarlos. No hay QR ni enlace de registro activo.',
      manualTitle:'Introducir direcciones', manualBody:'La vía manual compartirá verificación de propiedad, controles de duplicados y recibos con el escaneo MA. Escribir una dirección no demuestra propiedad ni elegibilidad.', collectorClosed:'Vista previa · registro cerrado', bnbAddress:'Dirección de tenencia en BNB Chain · solo titulares', astroAddress:'Destinatario ASTRO · formato pendiente de la red',
      ownershipNote:'La cartera de tenencia BNB y el destinatario ASTRO cumplen roles distintos. Se verificará propiedad o vinculación autorizada; direcciones parecidas no lo prueban. El registro no requiere transferencias, permisos de tokens, claves privadas ni frases semilla.',
      budget:'Presupuesto del registro A, no suministro total ni fondo de titulares', step2b:'El contrato registra beneficiario, cantidad e inicio. Una asignación por dirección en el programa A; los titulares verificados tienen registros separados. Sin retiro anticipado.', addressBody:'Evitar duplicados por programa y beneficiario, sin bloquear dos recompensas legítimas. Una persona puede crear varias direcciones; se necesitan criterios MA y controles antiabuso.', assetBody:'ASTRO es el activo principal propuesto y MemeAstro (MA) el meme token BNB propuesto. Ninguno se ha emitido. MA / Astro Chat es un producto separado; contratos y forma del activo están pendientes.',
    },
    fr: {
      dualTitle:'Deux voies. Des récompenses distinctes.', dualIntro:'Inscription à MA et détention du meme token MA sont deux projets distincts de récompenses ASTRO. Ni MA ni ASTRO ne sont émis ; les programmes sont fermés.',
      pathATitle:'S’inscrire à MA / Astro Chat', pathABody:'Répartition par étapes après vérification MA et du portefeuille. Le milliard d’ASTRO ci-dessous concerne seulement l’inscription ; chaque allocation financée serait bloquée un an.',
      pathBTitle:'Détenir MemeAstro (MA) six mois', pathBBody:'L’émission de MA sur BNB Chain est prévue avant les récompenses ASTRO. Détenir le MA officiel six mois complets et consécutifs serait la condition ; le jeton n’est pas encore émis.',
      holderLink:'Voir le projet pour détenteurs MA ↗', dualNote:'Une adresse peut participer aux deux programmes, une fois par programme après vérifications distinctes. Réserve, ratio et blocage des récompenses de détention restent à définir, hors budget d’inscription. Aucun double paiement garanti.',
      holderPending:'Avant ouverture : publier contrat MA, solde minimum, continuité et point de départ, ratio, budget et calendrier. Un solde ponctuel ne prouve pas six mois de détention continue.',
      collectorTitle:'Scanner ou saisir. Un registre vérifié.', collectorIntro:'Aperçu uniquement. La collecte est désactivée : aucune adresse envoyée, enregistrée, réservée ou vérifiée.', scanTitle:'Scanner depuis MA', scanBody:'Un futur QR officiel affichera dans MA le programme et le portefeuille avant confirmation. Aucun QR ni lien d’inscription n’est actif.',
      manualTitle:'Saisir les adresses', manualBody:'La saisie et le scan partageront preuve de propriété, dédoublonnage et reçu. Saisir une adresse ne prouve ni propriété ni admissibilité.', collectorClosed:'Aperçu du registre · inscriptions fermées', bnbAddress:'Adresse de détention BNB Chain · détenteurs uniquement', astroAddress:'Destinataire ASTRO · format à confirmer',
      ownershipNote:'Le portefeuille BNB et le destinataire ASTRO ont des rôles distincts. Leur propriété ou association autorisée doit être vérifiée ; une ressemblance ne suffit pas. Aucun transfert, autorisation de jeton, clé privée ou phrase secrète pour s’inscrire.',
      budget:'Budget d’inscription A, ni offre totale ni réserve des détenteurs', step2b:'Le contrat enregistre bénéficiaire, montant et début. Une allocation par adresse dans A ; une récompense de détention validée a son propre registre. Aucun retrait anticipé.', addressBody:'Dédoublonner par programme et bénéficiaire sans bloquer deux récompenses légitimes. Une personne peut avoir plusieurs adresses ; vérification MA et contrôles anti-abus restent nécessaires.', assetBody:'ASTRO est l’actif principal proposé et MemeAstro (MA) le meme token BNB proposé. Aucun n’est émis. MA / Astro Chat est un produit distinct ; contrats et nature des actifs restent à publier.',
    },
    de: {
      dualTitle:'Zwei Wege. Getrennte Belohnungen.', dualIntro:'MA-App-Registrierung und das Halten des MA-Meme-Tokens sind zwei ASTRO-Pläne. Weder MA noch ASTRO wurden ausgegeben; beide Programme sind geschlossen.',
      pathATitle:'Bei MA / Astro Chat registrieren', pathABody:'Gestaffelte Zuteilung nach MA-Berechtigungs- und Wallet-Prüfung. Die Milliarde ASTRO unten gehört nur zur Registrierung; jede finanzierte Zuteilung soll ein Jahr gesperrt werden.',
      pathBTitle:'MemeAstro (MA) sechs Monate halten', pathBBody:'MA soll auf BNB Chain vor den ASTRO-Belohnungen ausgegeben werden. Sechs volle, ununterbrochene Monate mit dem offiziellen MA sind als Voraussetzung geplant; der Token ist noch nicht ausgegeben.',
      holderLink:'MA-Halterplan ansehen ↗', dualNote:'Eine Adresse kann beide Programme nutzen, je einmal nach getrennten Prüfungen. Halterreserve, Verhältnis und spätere Sperre sind offen und gehören nicht zum Registrierungsbudget. Keine garantierte doppelte Auszahlung.',
      holderPending:'Vor Öffnung: MA-Vertrag, Mindestbestand, Haltebeginn und Kontinuität, Verhältnis, Budget und Zeitplan veröffentlichen. Ein einzelner Kontostand beweist keine sechsmonatige Haltedauer.',
      collectorTitle:'Scannen oder eingeben. Ein geprüftes Register.', collectorIntro:'Nur Vorschau. Die Erfassung ist deaktiviert: Keine Adresse wird übertragen, gespeichert, reserviert oder geprüft.', scanTitle:'Mit MA scannen', scanBody:'Ein künftiger offizieller QR zeigt in MA Programm und Wallet vor der Bestätigung. Noch kein aktiver Registrierungs-QR oder App-Link.',
      manualTitle:'Adressen manuell eingeben', manualBody:'Manuelle Eingabe und MA-Scan nutzen dieselbe Eigentumsprüfung, Duplikatkontrolle und Bestätigung. Eine Eingabe allein beweist weder Eigentum noch Berechtigung.', collectorClosed:'Registervorschau · Registrierung geschlossen', bnbAddress:'BNB-Chain-Halteadresse · nur Halterprogramm', astroAddress:'ASTRO-Empfänger · Format noch zu bestätigen',
      ownershipNote:'BNB-Haltewallet und ASTRO-Empfänger haben getrennte Rollen. Eigentum oder autorisierte Bindung muss geprüft werden; gleiche Zeichen reichen nicht. Registrierung verlangt keine Überweisung, Token-Freigabe, privaten Schlüssel oder Seed-Phrase.',
      budget:'Registrierungsbudget A, nicht Gesamtangebot oder Halterreserve', step2b:'Vertrag erfasst Begünstigten, Betrag und Beginn. Je Adresse einmal in A; geprüfte Halterbelohnungen werden separat geführt. Keine vorzeitige Auszahlung.', addressBody:'Duplikate je Programm und Begünstigtem verhindern, ohne zwei rechtmäßige Belohnungen zu blockieren. Mehrere Adressen je Person erfordern weiter MA- und Missbrauchsprüfungen.', assetBody:'ASTRO ist der geplante Mainnet-Wert, MemeAstro (MA) der geplante BNB-Meme-Token. Beide sind nicht ausgegeben. MA / Astro Chat ist ein separates Produkt; Verträge und Asset-Form stehen aus.',
    },
    ja: {
      dualTitle:'2つの資格経路。別々の報酬。', dualIntro:'MA アプリ登録と MA ミームトークン保有は、別々の ASTRO 報酬計画です。MA と ASTRO はどちらも未発行で、両活動とも未開始です。',
      pathATitle:'MA / Astro Chat に登録', pathABody:'MA 資格とウォレット所有権の確認後、段階配分を予定します。下記10億 ASTROは登録活動専用予算です。実際に資金確保された各配分を1年間ロックする予定です。',
      pathBTitle:'MemeAstro（MA）を連続6か月保有', pathBBody:'ASTRO 報酬より先に BNB Chain の MA を発行する計画です。公式 MA を満6か月連続保有することが予定条件ですが、まだトークンは発行されていません。',
      holderLink:'MA 保有者向け計画を見る ↗', dualNote:'同じアドレスでも、各活動の個別審査を通ればそれぞれ1回参加できます。保有報酬の予算・比率・受領後ロックは未定で、登録予算には含めません。2倍の支払を保証する意味ではありません。',
      holderPending:'開始前に公式 MA コントラクト、最低残高、連続保有と起算規則、比率、別予算、配布日程を公表します。一時点の残高では連続6か月を証明できません。',
      collectorTitle:'スキャンと手入力。同じ検証登録へ。', collectorIntro:'予定方式のプレビューです。収集は無効で、アドレスの送信・保存・予約・検証を行いません。', scanTitle:'MA でスキャン', scanBody:'将来の公式 QR は MA で活動とウォレットを示し、利用者が確認します。登録 QR やアプリリンクは未稼働です。',
      manualTitle:'アドレスを手入力', manualBody:'手入力も MA スキャンと同じ所有権確認・重複防止・受付記録を使う予定です。入力だけでは所有権や資格は証明できません。', collectorClosed:'アドレス登録プレビュー · 未開始', bnbAddress:'BNB Chain 保有アドレス · 保有活動専用', astroAddress:'ASTRO 受取アドレス · 形式は確認待ち',
      ownershipNote:'BNB 保有元と ASTRO 受取先は別の役割です。所有権または許可された紐付けを確認する必要があり、見た目が同じでも証明にはなりません。登録に送金・トークン承認・秘密鍵・シードは不要です。',
      budget:'登録活動 A の予算。総発行量や保有報酬予算ではありません', step2b:'受益者・数量・起点を記録します。登録活動 A は各アドレス1回。別途審査された保有報酬は別記録にします。期限前の引き出し不可。', addressBody:'活動 ID と受益者ごとに重複を防ぎ、2つの正当な報酬を妨げません。1人で複数アドレスを作れるため MA 資格・不正対策も必要です。', assetBody:'ASTRO は計画中の主網報酬、MemeAstro（MA）は計画中の BNB ミームトークンで、両方未発行です。MA / Astro Chat は別製品です。正式コントラクト等は公表待ちです。',
    },
    ko: {
      dualTitle:'두 가지 자격 경로. 별도의 보상.', dualIntro:'MA 앱 등록과 MA 밈 토큰 보유는 서로 다른 ASTRO 보상 계획입니다. MA와 ASTRO 모두 미발행이며 두 프로그램은 열리지 않았습니다.',
      pathATitle:'MA / Astro Chat 등록', pathABody:'MA 자격과 지갑 소유 확인 후 단계별 배정을 계획합니다. 아래 10억 ASTRO는 등록 전용 예산이며 실제 자금이 확보된 각 배정은 1년 잠금을 계획합니다.',
      pathBTitle:'MemeAstro(MA) 6개월 연속 보유', pathBBody:'ASTRO 보상보다 먼저 BNB Chain의 MA를 발행할 계획입니다. 공식 MA를 6개월 내내 연속 보유하는 것이 제안 조건이나 토큰은 아직 미발행입니다.',
      holderLink:'MA 보유자 계획 보기 ↗', dualNote:'한 주소가 두 프로그램에 각각 참여할 수 있으며 별도 검증 후 프로그램당 한 번 배정합니다. 보유 보상 예산·비율·수령 후 잠금은 미정이며 등록 예산에 포함되지 않습니다. 두 배 지급 보장은 아닙니다.',
      holderPending:'개시 전 공식 MA 계약, 최소 잔액, 연속 보유와 기산 규칙, 비율, 별도 예산, 지급 일정을 공지합니다. 한 시점의 잔액으로 6개월 연속 보유를 증명할 수 없습니다.',
      collectorTitle:'스캔 또는 입력. 하나의 검증 등록.', collectorIntro:'계획된 방식의 미리보기입니다. 수집기는 비활성화 상태이며 주소를 전송·저장·예약·검증하지 않습니다.', scanTitle:'MA에서 스캔', scanBody:'향후 공식 QR은 MA에서 프로그램과 지갑을 표시하고 사용자가 확인하게 됩니다. 등록 QR이나 앱 링크는 아직 활성화되지 않았습니다.',
      manualTitle:'주소 직접 입력', manualBody:'직접 입력과 MA 스캔은 같은 소유 검증, 중복 확인, 접수 기록을 사용할 계획입니다. 입력만으로 소유나 자격이 증명되지 않습니다.', collectorClosed:'주소 수집기 미리보기 · 등록 미개시', bnbAddress:'BNB Chain 보유 주소 · 보유 프로그램 전용', astroAddress:'ASTRO 수령 주소 · 형식 확인 대기',
      ownershipNote:'BNB 보유 지갑과 ASTRO 수령 지갑은 다른 역할입니다. 각 소유 또는 허가된 연결을 검증해야 하며 모양이 같다는 것만으로 증명되지 않습니다. 등록은 송금·토큰 승인·개인 키·시드 문구를 요구하지 않습니다.',
      budget:'등록 프로그램 A 예산이며 총발행량이나 보유 보상 예산이 아닙니다', step2b:'수혜자·수량·시작 시각을 기록합니다. 등록 프로그램 A는 주소당 한 번이며 검증된 보유 보상은 별도로 기록합니다. 조기 인출 불가.', addressBody:'프로그램과 수혜자별 중복을 막되 두 개의 정당한 보상을 차단하지 않습니다. 한 사람이 여러 주소를 만들 수 있어 MA 자격 및 부정 이용 검토도 필요합니다.', assetBody:'ASTRO는 계획된 메인넷 보상 자산, MemeAstro(MA)는 계획된 BNB 밈 토큰이며 모두 미발행입니다. MA / Astro Chat은 별도 제품입니다. 공식 계약과 자산 형식은 공지 대기 중입니다.',
    },
  };
  Object.keys(dualCopy).forEach(lang => Object.assign(translations[lang], dualCopy[lang]));
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
