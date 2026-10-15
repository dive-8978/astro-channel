(() => {
  'use strict';
  const fields = 'since artNote exploreNetwork exploreJourney exploreStart networkLabel networkTitle networkIntro studioNote layer1 layer1Body layer2 layer2Body layer3 layer3Body roles snapshot networkLink journeyLabel journeyTitle journeyIntro date1 status1 milestone1 milestone1Body date2 status2 milestone2 milestone2Body date3 status3 milestone3 milestone3Body journeyNote startLabel startTitle path1 path1Body path1Link path2 path2Body path2Link path3 path3Body path3Link question answer'.split(' ');
  const translations = {
    zh: [
      '始于 2026 年 1 月 ↗',
      '原创概念插画 · 描绘协作愿景，并非实时网络地图。',
      '探索网络愿景', '了解发展历程', '找到你的起点',
      'ASTRO AI CHAIN / 网络设计愿景',
      '让智能协作。\n让信任有据可查。',
      '面向人、应用和 AI 代理的网络愿景：在授权内工作，以可核验身份连接，共同记录执行结果。',
      '人类与 AI 协作概念图，并非已部署的机器人服务。',
      '身份与账本', '设计中记录身份、权限和任务状态。账本变更依据确定性规则，而不是模型意见。',
      'AI 与协调', '代理在明确的预算、权限与期限内规划、调用获准工具并核对结果。',
      '授权资源', '规划中的资源层连接获准的计算、存储和服务。加入网络不意味着公开私有数据。',
      '角色独立，目标相连：MA 是应用入口；AstroBridge 是独立集成合作方；Astro AI Chain 是研发中的网络。',
      '版本化设计摘要 · V1.2，2026 年 10 月 12 日。白皮书记录开发网络成果，不是生产主网或全球容量认证；后续发布须另行核验。',
      '探索 Astro AI Chain →',
      '我们的历程 / 始于 2026', '长期的愿景。\n一步一个可核验的里程碑。',
      '项目于 2026 年 1 月启动。我们区分起点、已有工程记录与仍待完成的工作。',
      '2026 年 1 月', '项目起点', '从这里开始',
      'AstroBridge 项目及其长期生态愿景的起点，不是主网上线日期。',
      '2026 年 10 月 12 日', '文档快照', '形成完整工程方向',
      'V1.2 整合网络架构、AI 任务生命周期、身份、资源协调与分阶段验收标准。',
      '下一阶段', '仍需验收', '从原型走向可靠服务',
      '路线包括多地区持续运行、独立接入、恢复演练和外部安全审查，满足条件后再扩大开放。',
      '这里记录项目历程，不是公司注册日期或上线时间承诺。未来里程碑取决于证据、资源与审查。',
      '从这里继续', '按你的节奏，探索更多。',
      '给日常使用者', '了解 MA 的交流体验、工具及当前下载选择。', '认识 MA →',
      '给开发者', '了解签名意图、集成边界与系统架构。', '探索技术 →',
      '给研究与探索者', '阅读公开资料，对照愿景与注明日期的进展记录。', '进入资料库 →',
      '这是否意味着整个网络已经上线？',
      '不是。架构设计、开发测试和生产可用性是不同阶段。请以各服务注明日期的发布证据为准；本概览不宣称性能已超过以太坊，也不构成公开主网认证。'
    ],
    es: [
      'Construyendo desde enero de 2026 ↗', 'Ilustración original · una visión de colaboración, no un mapa de red en vivo.',
      'Explora la visión de red', 'Conoce nuestra historia', 'Encuentra tu punto de partida',
      'ASTRO AI CHAIN / VISIÓN DE DISEÑO', 'Inteligencia que colabora.\nConfianza verificable.',
      'Una visión de red para personas, aplicaciones y agentes de IA: trabajo autorizado, identidad verificable y registro de resultados.',
      'Colaboración humano–IA conceptual, no un servicio robótico desplegado.',
      'Identidad y registro', 'El diseño registra identidad, permisos y tareas. Los cambios del registro siguen reglas deterministas, no opiniones del modelo.',
      'IA y coordinación', 'Los agentes planifican, usan herramientas autorizadas y comprueban resultados dentro de un presupuesto, alcance y plazo.',
      'Recursos autorizados', 'Una capa propuesta conecta cómputo, almacenamiento y servicios permitidos. Participar no hace públicos los datos privados.',
      'Funciones distintas: MA es una puerta de entrada; AstroBridge, un socio de integración independiente; Astro AI Chain, la red en desarrollo.',
      'Resumen de diseño · V1.2, 12 de octubre de 2026. Documenta una red de desarrollo, no certifica una red principal productiva ni capacidad global. Las versiones posteriores requieren verificación.',
      'Explora Astro AI Chain →',
      'NUESTRA HISTORIA / DESDE 2026', 'Una visión a largo plazo.\nUn hito a la vez.',
      'El proyecto comenzó en enero de 2026. Distinguimos su origen, la ingeniería documentada y el trabajo pendiente.',
      'ENERO DE 2026', 'ORIGEN DEL PROYECTO', 'Comienza el camino', 'Inicio del proyecto AstroBridge y su visión de ecosistema, no fecha de lanzamiento de la red principal.',
      '12 DE OCTUBRE DE 2026', 'REGISTRO DOCUMENTADO', 'Una dirección de ingeniería integrada', 'V1.2 reúne arquitectura, ciclo de tareas de IA, identidad, coordinación de recursos y criterios de aceptación por etapas.',
      'PRÓXIMA ETAPA', 'SUJETA A VALIDACIÓN', 'De prototipos a servicios fiables', 'La hoja de ruta exige operación multirregional persistente, integración independiente, recuperación y revisión externa de seguridad antes de ampliar el acceso.',
      'Historia del proyecto, no fecha de constitución ni promesa de lanzamiento. Los hitos futuros dependen de pruebas, recursos y revisión.',
      'TU SIGUIENTE PASO', 'Explora a tu ritmo.',
      'Para el día a día', 'Descubre MA, sus conversaciones, herramientas y opciones de descarga.', 'Conoce MA →',
      'Para quienes construyen', 'Entiende las intenciones firmadas, los límites de integración y la arquitectura.', 'Explora la tecnología →',
      'Para mentes curiosas', 'Lee documentos públicos y contrasta la visión con informes fechados.', 'Visita la biblioteca →',
      '¿Significa que toda la red ya está activa?', 'No. Diseño, pruebas de desarrollo y disponibilidad productiva son distintos. Consulta evidencias fechadas de cada servicio. Este resumen no afirma superar a Ethereum ni certifica una red principal pública.'
    ],
    fr: [
      'En construction depuis janvier 2026 ↗', 'Illustration originale · une vision de collaboration, pas une carte du réseau en direct.',
      'Explorer la vision du réseau', 'Découvrir notre parcours', 'Trouver votre point de départ',
      'ASTRO AI CHAIN / VISION DU RÉSEAU', 'Une intelligence collaborative.\nUne confiance vérifiable.',
      'Une vision de réseau pour les personnes, applications et agents IA : travail autorisé, identité vérifiable et résultats traçables.',
      'Illustration conceptuelle humain–IA, pas un service robotique déployé.',
      'Identité et registre', 'Le modèle consigne identités, permissions et tâches. Des règles déterministes, et non les avis du modèle, gouvernent le registre.',
      'IA et coordination', 'Les agents planifient, utilisent des outils autorisés et vérifient les résultats dans un budget, un périmètre et un délai définis.',
      'Ressources autorisées', 'Une couche envisagée relie calcul, stockage et services autorisés. Rejoindre le réseau ne rend pas publiques les données privées.',
      'Des rôles distincts : MA est un point d’entrée applicatif ; AstroBridge, un partenaire d’intégration indépendant ; Astro AI Chain, le réseau en développement.',
      'Résumé de conception · V1.2, 12 octobre 2026. Le document décrit un réseau de développement, sans certifier un réseau principal en production ni une capacité mondiale. Les versions suivantes demandent leur propre vérification.',
      'Explorer Astro AI Chain →',
      'NOTRE PARCOURS / DEPUIS 2026', 'Une vision à long terme.\nUne étape à la fois.',
      'Le projet a commencé en janvier 2026. Nous distinguons son origine, les travaux documentés et les étapes restantes.',
      'JANVIER 2026', 'ORIGINE DU PROJET', 'Le début du parcours', 'Début du projet AstroBridge et de sa vision d’écosystème, et non lancement du réseau principal.',
      '12 OCTOBRE 2026', 'ÉTAT DOCUMENTÉ', 'Une direction technique intégrée', 'V1.2 réunit architecture, cycle des tâches IA, identité, coordination des ressources et critères de validation progressifs.',
      'PROCHAINE ÉTAPE', 'SOUS RÉSERVE DE VALIDATION', 'Des prototypes aux services fiables', 'La feuille de route prévoit exploitation multirégionale durable, intégration indépendante, exercices de reprise et revue externe de sécurité avant une ouverture plus large.',
      'Historique du projet, pas date de constitution ni promesse de lancement. Les étapes futures dépendent des preuves, des ressources et des revues.',
      'LA SUITE POUR VOUS', 'Explorez à votre rythme.',
      'Pour le quotidien', 'Découvrez MA, ses conversations, ses outils et les téléchargements disponibles.', 'Découvrir MA →',
      'Pour les développeurs', 'Comprenez les intentions signées, les limites d’intégration et l’architecture.', 'Explorer la technologie →',
      'Pour les curieux', 'Lisez les documents publics et comparez la vision aux bilans datés.', 'Consulter les documents →',
      'Tout le réseau est-il déjà opérationnel ?', 'Non. Architecture, tests de développement et disponibilité en production sont distincts. Consultez les preuves datées de chaque service. Ce résumé ne revendique pas de supériorité sur Ethereum ni ne certifie un réseau principal public.'
    ],
    de: [
      'In Entwicklung seit Januar 2026 ↗', 'Originalillustration · eine Vision der Zusammenarbeit, kein Live-Netzwerkplan.',
      'Netzwerkvision erkunden', 'Unseren Weg kennenlernen', 'Den eigenen Einstieg finden',
      'ASTRO AI CHAIN / ENTWURFSVISION', 'Intelligenz, die zusammenarbeitet.\nVertrauen, das prüfbar ist.',
      'Eine Netzwerkvision für Menschen, Anwendungen und KI-Agenten: autorisierte Arbeit, überprüfbare Identität und nachvollziehbare Ergebnisse.',
      'Konzeptbild der Mensch-KI-Zusammenarbeit, kein eingesetzter Robotikdienst.',
      'Identität und Ledger', 'Der Entwurf erfasst Identität, Rechte und Aufgabenstatus. Deterministische Regeln, nicht Modellmeinungen, bestimmen Ledger-Änderungen.',
      'KI und Koordination', 'Agenten planen, nutzen zugelassene Werkzeuge und prüfen Ergebnisse innerhalb festgelegter Budgets, Befugnisse und Fristen.',
      'Autorisierte Ressourcen', 'Eine geplante Ebene verbindet erlaubte Rechenleistung, Speicherung und Dienste. Teilnahme macht private Daten nicht öffentlich.',
      'Getrennte Rollen: MA ist ein Anwendungseinstieg; AstroBridge ein unabhängiger Integrationspartner; Astro AI Chain das Netzwerk in Entwicklung.',
      'Entwurfsstand · V1.2, 12. Oktober 2026. Dokumentiert ein Entwicklungsnetz, keine Zertifizierung eines produktiven Mainnets oder globaler Kapazität. Spätere Versionen sind gesondert zu prüfen.',
      'Astro AI Chain erkunden →',
      'UNSER WEG / SEIT 2026', 'Eine langfristige Vision.\nMeilenstein für Meilenstein.',
      'Das Projekt begann im Januar 2026. Wir trennen Ursprung, dokumentierte Entwicklung und offene Arbeiten.',
      'JANUAR 2026', 'PROJEKTBEGINN', 'Der Weg beginnt', 'Beginn des AstroBridge-Projekts und seiner Ökosystemvision, kein Mainnet-Startdatum.',
      '12. OKTOBER 2026', 'DOKUMENTIERTER STAND', 'Eine gemeinsame Entwicklungsrichtung', 'V1.2 verbindet Architektur, KI-Aufgabenzyklus, Identität, Ressourcenkoordination und gestufte Abnahmekriterien.',
      'NÄCHSTE ETAPPE', 'NOCH ZU VALIDIEREN', 'Von Prototypen zu verlässlichen Diensten', 'Die Roadmap verlangt dauerhaften Mehrregionenbetrieb, unabhängige Integration, Wiederherstellungsübungen und externe Sicherheitsprüfung vor breiterer Freigabe.',
      'Projektgeschichte, kein Gründungsdatum der Firma oder Startversprechen. Künftige Meilensteine hängen von Nachweisen, Ressourcen und Prüfungen ab.',
      'IHR NÄCHSTER SCHRITT', 'Entdecken Sie in Ihrem Tempo.',
      'Für den Alltag', 'Entdecken Sie MA, Gespräche, Werkzeuge und verfügbare Downloads.', 'MA kennenlernen →',
      'Für Entwickler', 'Verstehen Sie signierte Intents, Integrationsgrenzen und Architektur.', 'Technologie erkunden →',
      'Für Neugierige', 'Lesen Sie öffentliche Dokumente und vergleichen Sie Vision und datierte Fortschritte.', 'Zur Dokumentensammlung →',
      'Ist damit das gesamte Netzwerk schon live?', 'Nein. Architektur, Entwicklungstests und Produktionsverfügbarkeit sind verschieden. Maßgeblich sind datierte Nachweise je Dienst. Diese Übersicht behauptet keine Überlegenheit gegenüber Ethereum und zertifiziert kein öffentliches Mainnet.'
    ],
    ja: [
      '2026年1月から開発 ↗', 'オリジナル概念画 · 協力のビジョンであり、稼働中のネットワーク図ではありません。',
      'ネットワークの構想', 'これまでの歩み', '自分に合う入口へ',
      'ASTRO AI CHAIN / 設計ビジョン', '協力する知能。\n検証できる信頼。',
      '人、アプリ、AIエージェントのためのネットワーク構想。認可された作業、検証可能なID、結果の記録をつなぎます。',
      '人とAIの協力を描く概念画であり、稼働済みのロボットサービスではありません。',
      'IDと台帳', 'ID、権限、タスク状態を記録する設計です。台帳の変更はモデルの意見ではなく、決定的な規則に従います。',
      'AIと調整', 'エージェントは予算・権限・期限の範囲内で計画し、認可されたツールを使い、結果を検証します。',
      '認可されたリソース', '計画中の層が計算、保存、サービスを接続します。参加しても個人の非公開データが公開されるわけではありません。',
      '役割は別々です。MAはアプリの入口、AstroBridgeは独立した連携パートナー、Astro AI Chainは開発中のネットワークです。',
      '設計概要 · V1.2、2026年10月12日。開発ネットワークの記録であり、本番メインネットや世界規模の容量認証ではありません。以後のリリースは別途検証が必要です。',
      'Astro AI Chainを見る →',
      '私たちの歩み / 2026年から', '長期的なビジョン。\n一歩ずつ積み重ねる。',
      'プロジェクトは2026年1月に始まりました。始点、記録された開発、今後の課題を区別します。',
      '2026年1月', 'プロジェクト開始', 'ここから始まる', 'AstroBridgeと長期的なエコシステム構想の始点です。メインネットの公開日ではありません。',
      '2026年10月12日', '文書化された時点', '統合された開発方針', 'V1.2は構造、AIタスクのライフサイクル、ID、リソース調整、段階的な受入基準をまとめています。',
      '次の段階', '検証が必要', '試作から信頼できるサービスへ', '広い公開の前に、複数地域での継続運用、独立した接続、復旧訓練、外部セキュリティ審査を目指します。',
      'プロジェクトの歴史であり、会社設立日や公開日の約束ではありません。将来の節目は証拠、資源、審査に依存します。',
      '次の一歩', '自分のペースで探索。',
      '日常の利用者へ', 'MAの会話、ツール、現在のダウンロードを確認。', 'MAを知る →',
      '開発者へ', '署名付きインテント、連携の境界、構造を理解。', '技術を探索 →',
      '研究・探索する方へ', '公開資料を読み、ビジョンと日付付きの進捗を比較。', '資料ライブラリへ →',
      'ネットワーク全体がすでに稼働しているのですか？', 'いいえ。構想、開発テスト、本番での可用性は異なります。各サービスの日付付き公開証拠を確認してください。この概要はEthereumを超える性能や公開メインネットの認証を主張しません。'
    ],
    ko: [
      '2026년 1월부터 개발 ↗', '오리지널 콘셉트 일러스트 · 협업 비전이며 실시간 네트워크 지도가 아닙니다.',
      '네트워크 비전 살펴보기', '우리의 여정 보기', '나에게 맞는 시작점',
      'ASTRO AI CHAIN / 설계 비전', '협업하는 지능.\n확인할 수 있는 신뢰.',
      '사람, 앱, AI 에이전트를 위한 네트워크 비전: 허가된 작업, 검증 가능한 신원, 결과 기록을 연결합니다.',
      '인간과 AI 협업 콘셉트 이미지이며, 배포된 로봇 서비스가 아닙니다.',
      '신원과 원장', '신원, 권한, 작업 상태를 기록하는 설계입니다. 원장 변경은 모델의 의견이 아닌 결정적 규칙을 따릅니다.',
      'AI와 조정', '에이전트는 정해진 예산·범위·기한 안에서 계획하고, 허가된 도구를 사용하며 결과를 확인합니다.',
      '허가된 자원', '계획된 자원 계층은 허가된 연산, 저장소, 서비스를 연결합니다. 참여해도 비공개 데이터가 공개되지 않습니다.',
      '역할은 다릅니다. MA는 앱 진입점, AstroBridge는 독립 통합 파트너, Astro AI Chain은 개발 중인 네트워크입니다.',
      '설계 요약 · V1.2, 2026년 10월 12일. 개발 네트워크 기록이며 운영 메인넷이나 세계적 처리 용량 인증이 아닙니다. 이후 릴리스는 별도 검증이 필요합니다.',
      'Astro AI Chain 살펴보기 →',
      '우리의 여정 / 2026년부터', '장기적인 비전.\n한 단계씩 쌓아 갑니다.',
      '프로젝트는 2026년 1월에 시작했습니다. 시작점, 기록된 개발, 앞으로의 과제를 구분합니다.',
      '2026년 1월', '프로젝트 시작', '여정의 출발', 'AstroBridge 프로젝트와 장기 생태계 비전의 시작이며, 메인넷 출시일은 아닙니다.',
      '2026년 10월 12일', '기록된 시점', '통합된 개발 방향', 'V1.2는 구조, AI 작업 수명 주기, 신원, 자원 조정과 단계별 검증 기준을 정리합니다.',
      '다음 단계', '추가 검증 필요', '프로토타입에서 신뢰할 수 있는 서비스로', '더 넓은 공개 전에 다지역 지속 운영, 독립 통합, 복구 훈련과 외부 보안 검토를 추진합니다.',
      '프로젝트 이력이며 법인 설립일이나 출시 일정의 약속이 아닙니다. 향후 단계는 증거, 자원과 검토에 달려 있습니다.',
      '다음 단계', '자신의 속도로 탐색하세요.',
      '일상 이용자를 위해', 'MA의 대화, 도구와 현재 다운로드 옵션을 알아보세요.', 'MA 알아보기 →',
      '개발자를 위해', '서명된 인텐트, 통합 경계와 구조를 이해하세요.', '기술 살펴보기 →',
      '탐구하는 분들을 위해', '공개 문서를 읽고 비전과 날짜가 있는 진행 기록을 비교하세요.', '문서 라이브러리 →',
      '전체 네트워크가 이미 운영 중이라는 뜻인가요?', '아닙니다. 설계, 개발 테스트와 운영 가용성은 다릅니다. 각 서비스의 날짜가 명시된 공개 증거를 확인하세요. 이 개요는 Ethereum보다 우수한 성능이나 공개 메인넷 인증을 주장하지 않습니다.'
    ]
  };
  const nodes = [...document.querySelectorAll('[data-horizon]')];
  const english = Object.fromEntries(nodes.map(node => [node.dataset.horizon, node.textContent]));
  english.networkTitle = 'Intelligence that collaborates.\nTrust that can be checked.';
  english.journeyTitle = 'A long-term vision.\nBuilt one milestone at a time.';
  const apply = () => {
    const language = (document.documentElement.lang || 'en').split(/[-_]/)[0];
    const values = translations[language];
    const dictionary = values && values.length === fields.length
      ? Object.fromEntries(fields.map((field, index) => [field, values[index]])) : english;
    nodes.forEach(node => { node.textContent = dictionary[node.dataset.horizon] || english[node.dataset.horizon]; });
  };
  apply();
  document.querySelector('#language')?.addEventListener('change', apply);
  if (typeof MutationObserver === 'function') {
    new MutationObserver(apply).observe(document.documentElement, { attributes: true, attributeFilter: ['lang'] });
  }
})();
