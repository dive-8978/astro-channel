(() => {
  'use strict';
  const keys = ['heroKicker','heroTitle','heroLead','heroButton','heroSecondary','heroArt','introKicker','introTitle','introBody','capKicker','capTitle','capIntro','c1h','c1p','c2h','c2p','c3h','c3p','c4h','c4p','c5h','c5p','c6h','c6p','flowKicker','flowTitle','flowIntro','f1h','f1p','f2h','f2p','f3h','f3p','f4h','f4p','archKicker','archTitle','a1h','a1p','a1b','a2h','a2p','a2b','faqKicker','faqTitle','q1','a1','q2','a2','q3','a3','q4','a4','devButton','evidenceButton','legacyTitle','legacyIntro'];
  const translations = {
    zh: [
      'ASTROBRIDGE / 多链互联基础设施','一个意图，连接多种网络。','AstroBridge 是面向多网络的意图与互操作层，旨在帮助应用与钱包连接不同网络，并以用户授权为核心。','探索核心能力 ↓','打开控制台 ↗','概念配图 · 非实时网络地图',
      '01 / 核心理念','以超级链思路连接不同网络。','不同网络拥有不同的资产、接口和规则。AstroBridge 以统一的意图框架衔接这些交互，让应用能够更清晰地呈现从用户请求到授权操作的过程。“超级链”描述的是多链互联愿景，不代表所有网络或路线均已上线。',
      '02 / 功能设计','一个框架，多种能力。','面向需要连接用户意图、网络信息与交易流程的应用。',
      '表达目标','用一致的请求结构描述预期操作，减少为每条网络单独构建交互流程的复杂度。','用户掌握授权','以非托管授权为设计方向；支持的操作由用户核对钱包、网络与交易后自行确认。','探索路线与报价','在相应集成可用时查询路线和报价；报价只是方案，并不代表转账已经完成。','广泛的多链架构','集成框架覆盖多种网络配置；实际能力按网络、操作和发布阶段分别核验。','应用与 API 层','围绕统一接口，设计钱包及应用的请求、路线信息和状态查询流程。','跟踪执行状态','关注从授权、提交到回执检查的过程。跨链完成还需要目标链的到账证据。',
      '03 / 工作流程','从意图到验证。','以下为示意流程；具体步骤取决于网络、钱包与集成情况。','发起请求','在应用中选择操作、资产与目标。','核对信息','检查路线、网络、地址、金额及适用费用。','用户授权','由用户使用自己的钱包确认支持的交易。','验证结果','跟踪状态并检查相关网络的交易回执。',
      '04 / 生态分工','分工清晰，体验相连。','AstroBridge / 协调层','意图与 API 层连接应用请求、用户授权与网络集成。','已配置的网络、已实现的功能和经过生产验证的路线是不同概念。','MA 与 AstroAI Chain / 独立角色','MA 是面向用户的通信应用；AstroAI Chain 是独立的网络研发项目。','未来的相互接入需分别完成开发与验收。',
      '05 / 常见问题','先理解适用范围。','AstroBridge 是一条单独的区块链吗？','AstroBridge 是跨网络互操作与意图框架。AstroAI Chain 是独立网络项目；两者连接是研发方向，不能视为已经完成。','网络已配置，就代表所有功能都可用吗？','不是。网络配置、报价可用性、交易执行和目标链到账都需要分别验证；支持情况也会因资产和路线不同而变化。','AstroBridge 会托管我的钱包吗？','架构以用户掌控授权为设计方向。具体集成仍应核对钱包和服务提供方的实际流程；不要向任何人透露助记词或私钥。','开发者在哪里查看进度？','可查看控制台及下方带日期的工程准备度报告，其中分别标注预览、测试与生产验收状态。','查看控制台 ↗','查看工程证据 ↗','工程证据与研发方向','按交付阶段区分已有工程证据与研究目标。'
    ],
    es: [
      'ASTROBRIDGE / INFRAESTRUCTURA MULTICADENA','Una intención. Muchas redes.','AstroBridge es una capa de intenciones e interoperabilidad diseñada para conectar aplicaciones y carteras con varias redes, con la autorización del usuario en el centro.','Explorar capacidades ↓','Abrir consola ↗','Ilustración conceptual · no es un mapa en vivo',
      '01 / LA IDEA','Un enfoque superchain para conectar redes.','Cada red tiene activos, interfaces y reglas diferentes. AstroBridge organiza estas interacciones en un marco común basado en intenciones. «Superchain» expresa una visión de interoperabilidad, no que todas las redes o rutas estén activas.',
      '02 / CAPACIDADES DE DISEÑO','Un marco, múltiples capacidades.','Para aplicaciones que conectan intenciones, información de red y procesos de transacción.',
      'Expresar el objetivo','Describir una acción prevista con una estructura de solicitud coherente.','Autorización del usuario','Diseño sin custodia: el usuario revisa la cartera, la red y la transacción antes de aprobar las operaciones compatibles.','Rutas y cotizaciones','Consultar rutas y cotizaciones donde haya integraciones disponibles. Una cotización no es una transferencia completada.','Diseño multicadena','El marco incluye varias configuraciones de red. La compatibilidad se verifica por red, operación y fase.','Aplicación y API','Diseñar solicitudes, información de rutas y estados alrededor de una interfaz compartida.','Seguir el proceso','Seguir autorización, envío y recibos. La finalización entre redes también requiere pruebas en destino.',
      '03 / PROCESO','De la intención a la verificación.','Flujo ilustrativo; los pasos dependen de la red, la cartera y la integración.','Solicitud','Elegir acción, activo y destino.','Revisión','Comprobar ruta, red, dirección, cantidad y comisiones.','Autorización','Aprobar la transacción compatible con la propia cartera.','Verificación','Consultar el estado y los recibos de las redes correspondientes.',
      '04 / ECOSISTEMA','Funciones claras. Experiencias conectadas.','AstroBridge / coordinación','La capa de intenciones y API conecta solicitudes, autorización e integración de redes.','Configuración, implementación y rutas verificadas en producción son categorías distintas.','MA y AstroAI Chain / funciones distintas','MA es la aplicación de comunicación; AstroAI Chain es una iniciativa independiente de investigación e ingeniería de red.','Las integraciones futuras requieren desarrollo y aceptación propios.',
      '05 / PREGUNTAS','Comprender los límites.','¿Es AstroBridge una sola blockchain?','Es un marco de interoperabilidad e intenciones. AstroAI Chain es un proyecto separado; su conexión es un objetivo de desarrollo.','¿Una red configurada admite todas las acciones?','No. Configuración, cotización, ejecución y liquidación de destino requieren verificaciones separadas.','¿AstroBridge custodia mi cartera?','La arquitectura está diseñada para autorización controlada por el usuario. Comprueba cada integración y nunca compartas claves privadas o frases semilla.','¿Dónde consultar el progreso?','Consulta la consola y el informe de preparación fechado; la vista previa, las pruebas y la aceptación en producción se distinguen.','Explorar consola ↗','Ver evidencia técnica ↗','Evidencia técnica e investigación','Evidencia y objetivos separados por etapa.'
    ],
    fr: [
      'ASTROBRIDGE / INFRASTRUCTURE MULTICHAÎNE','Une intention. Plusieurs réseaux.','AstroBridge est une couche d’intention et d’interopérabilité conçue pour relier applications et portefeuilles à plusieurs réseaux, avec l’autorisation de l’utilisateur au centre.','Explorer les capacités ↓','Ouvrir la console ↗','Illustration conceptuelle · pas une carte en direct',
      '01 / LE CONCEPT','Une approche superchain de la connectivité.','Les réseaux ont des actifs, interfaces et règles différents. AstroBridge réunit ces interactions dans un cadre commun orienté intention. « Superchain » décrit une vision d’interopérabilité, sans affirmer que tous les réseaux sont actifs.',
      '02 / CAPACITÉS VISÉES','Un cadre, plusieurs capacités.','Pour les applications qui relient intentions, informations réseau et transactions.',
      'Exprimer un objectif','Décrire une action prévue dans une structure de requête cohérente.','Autorisation utilisateur','Conception non dépositaire : l’utilisateur examine portefeuille, réseau et transaction avant d’autoriser les actions prises en charge.','Routes et devis','Demander des routes et devis lorsque les intégrations sont disponibles. Un devis ne constitue pas un transfert terminé.','Conception multichaîne','Le cadre couvre plusieurs configurations réseau. Le support se vérifie par réseau, opération et étape.','Applications et API','Concevoir demandes, informations de route et suivi autour d’une interface commune.','Suivre le processus','Suivre autorisation, soumission et reçus. Une opération interchaîne exige aussi une preuve de destination.',
      '03 / FONCTIONNEMENT','De l’intention à la vérification.','Parcours illustratif ; les étapes dépendent du réseau, du portefeuille et de l’intégration.','Demander','Choisir action, actif et destination.','Vérifier','Contrôler route, réseau, adresse, montant et frais.','Autoriser','Approuver la transaction prise en charge avec son portefeuille.','Confirmer','Suivre le statut et les reçus réseau pertinents.',
      '04 / ÉCOSYSTÈME','Des rôles clairs, des expériences liées.','AstroBridge / coordination','La couche d’intention et API relie demandes, autorisation et intégration réseau.','Configuration, fonctions développées et routes vérifiées en production sont distinctes.','MA et AstroAI Chain / rôles distincts','MA est l’application de communication ; AstroAI Chain est une initiative indépendante de recherche réseau.','Les futures intégrations nécessitent leur propre développement et validation.',
      '05 / QUESTIONS','Comprendre les limites.','AstroBridge est-il une blockchain unique ?','AstroBridge est un cadre d’interopérabilité et d’intention. AstroAI Chain est un projet distinct ; leur liaison reste un objectif de développement.','Un réseau configuré permet-il toutes les actions ?','Non. Configuration, devis, exécution et règlement à destination doivent être vérifiés séparément.','AstroBridge conserve-t-il mon portefeuille ?','L’architecture vise une autorisation contrôlée par l’utilisateur. Vérifiez chaque intégration et ne partagez jamais phrase secrète ni clé privée.','Où suivre les progrès ?','Consultez la console et le rapport daté : aperçu, tests et acceptation en production sont distingués.','Explorer la console ↗','Voir les preuves techniques ↗','Preuves techniques et recherche','Preuves et objectifs présentés par étape.'
    ],
    de: [
      'ASTROBRIDGE / MULTICHAIN-INFRASTRUKTUR','Eine Absicht. Viele Netzwerke.','AstroBridge ist eine Intent- und Interoperabilitätsschicht für Anwendungen und Wallets über mehrere Netzwerke hinweg – mit der Nutzerfreigabe im Mittelpunkt.','Funktionen entdecken ↓','Konsole öffnen ↗','Konzeptillustration · keine Live-Netzwerkkarte',
      '01 / DIE IDEE','Ein Superchain-Ansatz für Verbindungen.','Netzwerke unterscheiden sich bei Assets, Schnittstellen und Regeln. AstroBridge ordnet diese Interaktionen in einem gemeinsamen Intent-Rahmen. „Superchain“ beschreibt die Vision, nicht die Verfügbarkeit aller Netzwerke und Routen.',
      '02 / GEPLANTE FÄHIGKEITEN','Ein Rahmen, viele Funktionen.','Für Anwendungen, die Nutzerabsicht, Netzwerkinformation und Transaktionsabläufe verbinden.',
      'Ziel beschreiben','Eine gewünschte Aktion in einer einheitlichen Anfrage ausdrücken.','Nutzerkontrollierte Freigabe','Nichtverwahrendes Design: Nutzer prüfen Wallet, Netzwerk und Transaktion vor der Freigabe unterstützter Aktionen.','Routen und Angebote','Bei verfügbaren Integrationen Routen und Angebote abfragen. Ein Angebot ist keine abgeschlossene Übertragung.','Multichain-Design','Der Rahmen umfasst mehrere Netzwerkkonfigurationen. Unterstützung wird je Netzwerk, Vorgang und Phase geprüft.','Anwendung und API','Anfragen, Routeninformationen und Status über eine gemeinsame Schnittstelle gestalten.','Ablauf verfolgen','Freigabe, Übermittlung und Belege verfolgen. Chain-übergreifender Abschluss benötigt auch Zielnachweise.',
      '03 / ABLAUF','Von der Absicht zur Prüfung.','Beispielablauf; Schritte hängen von Netzwerk, Wallet und Integration ab.','Anfrage','Aktion, Asset und Ziel auswählen.','Prüfung','Route, Netzwerk, Adresse, Betrag und Gebühren kontrollieren.','Freigabe','Unterstützte Transaktion mit der eigenen Wallet freigeben.','Nachweis','Status und relevante Netzwerkbelege prüfen.',
      '04 / ÖKOSYSTEM','Klare Rollen. Verbundene Erlebnisse.','AstroBridge / Koordination','Die Intent- und API-Schicht verbindet Anfragen, Freigabe und Netzwerkintegration.','Konfigurierte Netzwerke, implementierte Funktionen und produktiv geprüfte Routen sind verschieden.','MA und AstroAI Chain / getrennte Rollen','MA ist die Kommunikations-App; AstroAI Chain ist eine eigenständige Netzwerk-Forschungsinitiative.','Künftige Integrationen benötigen eigene Entwicklung und Abnahme.',
      '05 / FRAGEN','Grenzen verstehen.','Ist AstroBridge eine einzelne Blockchain?','AstroBridge ist ein Interoperabilitäts- und Intent-Rahmen. AstroAI Chain ist ein separates Netzwerkprojekt; die Verbindung ist ein Entwicklungsziel.','Unterstützt ein konfiguriertes Netzwerk alle Aktionen?','Nein. Konfiguration, Angebote, Ausführung und Zielabwicklung müssen getrennt geprüft werden.','Verwahrt AstroBridge meine Wallet?','Die Architektur ist auf Nutzerfreigabe ausgelegt. Prüfe jede Integration und teile niemals Seed-Phrase oder privaten Schlüssel.','Wo ist der Fortschritt sichtbar?','Konsole und datierter Bereitschaftsbericht unterscheiden Vorschau, Tests und Produktionsabnahme.','Konsole öffnen ↗','Technische Nachweise ↗','Technische Nachweise und Forschung','Nachweise und Forschungsziele nach Phase.'
    ],
    ja: [
      'ASTROBRIDGE / マルチチェーン基盤','一つの意図から、複数のネットワークへ。','AstroBridge は、ユーザーの承認を中心に、アプリとウォレットを複数のネットワークにつなぐ意図・相互運用レイヤーです。','機能を見る ↓','コンソールを開く ↗','コンセプト画像 · 実際のネットワーク図ではありません',
      '01 / コンセプト','スーパー チェーンの発想で接続する。','ネットワークごとに資産、インターフェース、ルールは異なります。AstroBridge はこれらを共通の意図ベースの枠組みで整理します。「スーパー チェーン」は相互運用の構想であり、すべての接続が稼働中という意味ではありません。',
      '02 / 設計上の機能','一つの枠組み、複数の機能。','ユーザーの意図、ネットワーク情報、取引フローをつなぐアプリのために。',
      '目的を表現','統一されたリクエスト形式で実行したい操作を記述します。','ユーザーによる承認','非カストディアルを設計方針とし、対応する操作はウォレット、ネットワーク、取引を確認して承認します。','経路と見積もり','統合が利用可能な場合に経路や見積もりを照会します。見積もりは送金完了を意味しません。','マルチチェーン設計','複数のネットワーク設定を対象とし、対応状況はネットワーク、操作、段階ごとに検証します。','アプリと API','リクエスト、経路情報、状態確認を共通のインターフェースで設計します。','状態の追跡','承認、送信、レシートを追跡します。クロスチェーン完了には送金先の証拠も必要です。',
      '03 / フロー','意図から検証まで。','図解のための流れです。実際の手順はネットワークや統合によって異なります。','リクエスト','操作、資産、送金先を選びます。','確認','経路、ネットワーク、アドレス、数量、手数料を確認します。','承認','対応する取引を自分のウォレットで承認します。','検証','状態と関連ネットワークのレシートを確認します。',
      '04 / エコシステム','役割を分け、体験をつなぐ。','AstroBridge / 調整レイヤー','意図と API のレイヤーがアプリの要求、承認、ネットワーク統合をつなぎます。','設定済みネットワーク、実装済み機能、本番検証済み経路は別の区分です。','MA と AstroAI Chain / 異なる役割','MA はユーザー向け通信アプリ、AstroAI Chain は独立したネットワーク研究開発です。','将来の連携には個別の開発と受け入れ検証が必要です。',
      '05 / よくある質問','適用範囲を理解する。','AstroBridge は一つのブロックチェーンですか？','AstroBridge は相互運用と意図の枠組みです。AstroAI Chain は別のネットワークであり、連携は開発目標です。','ネットワークを設定すれば全操作が可能ですか？','いいえ。設定、見積もり、実行、送金先の着金は個別に検証する必要があります。','ウォレットは AstroBridge が管理しますか？','ユーザーが承認を管理する設計です。各統合の実際の流れを確認し、秘密鍵やシードフレーズを共有しないでください。','進捗はどこで確認できますか？','コンソールと日付付きの技術準備状況をご覧ください。プレビュー、テスト、本番受け入れを区別しています。','コンソールを見る ↗','技術資料を見る ↗','技術的根拠と研究','開発段階ごとに根拠と研究目標を区別します。'
    ],
    ko: [
      'ASTROBRIDGE / 멀티체인 인프라','하나의 의도, 다양한 네트워크.','AstroBridge는 사용자 승인을 중심으로 앱과 지갑을 여러 네트워크에 연결하도록 설계된 의도 및 상호운용 계층입니다.','기능 살펴보기 ↓','콘솔 열기 ↗','개념 이미지 · 실시간 네트워크 지도가 아닙니다',
      '01 / 핵심 개념','슈퍼체인 관점의 네트워크 연결.','네트워크마다 자산, 인터페이스, 규칙이 다릅니다. AstroBridge는 이러한 상호작용을 공통 의도 기반 프레임워크로 연결합니다. “슈퍼체인”은 비전이며 모든 네트워크나 경로가 운영 중이라는 뜻은 아닙니다.',
      '02 / 설계 기능','하나의 프레임워크, 다양한 기능.','사용자 의도, 네트워크 정보와 거래 흐름을 연결하는 앱을 위해 설계되었습니다.',
      '목표 표현','일관된 요청 형식으로 원하는 작업을 설명합니다.','사용자 승인','비수탁 승인을 지향하며 지원되는 작업을 승인하기 전에 지갑, 네트워크와 거래를 확인합니다.','경로와 견적','연동을 사용할 수 있을 때 경로와 견적을 조회합니다. 견적이 송금 완료를 뜻하지는 않습니다.','멀티체인 설계','여러 네트워크 구성을 포함하며 지원 여부는 네트워크, 작업, 단계별로 확인합니다.','앱과 API','요청, 경로 정보와 상태를 공통 인터페이스로 구성합니다.','상태 추적','승인, 제출과 영수증을 추적합니다. 크로스체인 완료에는 목적지 증거도 필요합니다.',
      '03 / 진행 과정','의도에서 검증까지.','예시 흐름이며 단계는 네트워크, 지갑과 연동에 따라 달라집니다.','요청','앱에서 작업, 자산과 목적지를 선택합니다.','검토','경로, 네트워크, 주소, 수량과 수수료를 확인합니다.','승인','사용자가 자신의 지갑으로 지원 거래를 승인합니다.','검증','상태와 해당 네트워크 영수증을 확인합니다.',
      '04 / 생태계','명확한 역할, 연결된 경험.','AstroBridge / 조정 계층','의도와 API 계층이 앱 요청, 승인과 네트워크 연동을 연결합니다.','설정된 네트워크, 구현된 기능과 운영 검증 경로는 서로 다릅니다.','MA와 AstroAI Chain / 별도 역할','MA는 사용자용 소통 앱이며 AstroAI Chain은 별도의 네트워크 연구 개발입니다.','향후 연동은 각각의 개발과 검증이 필요합니다.',
      '05 / 자주 묻는 질문','적용 범위를 이해하세요.','AstroBridge는 하나의 블록체인인가요?','AstroBridge는 상호운용 및 의도 프레임워크입니다. AstroAI Chain은 별도 네트워크이며 두 프로젝트 연결은 개발 목표입니다.','설정된 네트워크에서 모든 작업을 할 수 있나요?','아니요. 네트워크 설정, 견적, 실행과 목적지 정산은 각각 확인해야 합니다.','AstroBridge가 지갑을 보관하나요?','사용자 승인 중심으로 설계되었습니다. 각 연동의 실제 절차를 확인하고 시드 구문이나 개인 키를 공유하지 마세요.','개발 진행 상황은 어디에서 보나요?','콘솔과 날짜가 명시된 준비도 보고서에서 미리보기, 테스트와 운영 검증을 구분합니다.','콘솔 보기 ↗','기술 근거 보기 ↗','기술 근거와 연구','개발 단계별 근거와 연구 목표입니다.'
    ]
  };
  const select = document.getElementById('tech-language');
  const nodes = [...document.querySelectorAll('[data-t]')];
  const english = Object.fromEntries(nodes.map(node => [node.dataset.t, node.innerText]));
  const original = document.querySelector('.tech-original');
  const originalHtml = original.innerHTML;
  const navigation = {
    en:['← Home','Vision','Pain Points','Technology','Progress','© 2026 AstroBridge | FOR DEMONSTRATION ONLY'],
    zh:['← 首页','愿景','解决的问题','技术','进展','© 2026 AstroBridge | 示意说明'],
    es:['← Inicio','Visión','Necesidades','Tecnología','Avances','© 2026 AstroBridge | SOLO DEMOSTRACIÓN'],
    fr:['← Accueil','Vision','Besoins','Technologie','Progrès','© 2026 AstroBridge | DÉMONSTRATION'],
    de:['← Start','Vision','Herausforderungen','Technologie','Fortschritt','© 2026 AstroBridge | NUR DEMONSTRATION'],
    ja:['← ホーム','ビジョン','課題','技術','進捗','© 2026 AstroBridge | 概念の説明'],
    ko:['← 홈','비전','해결 과제','기술','진행 상황','© 2026 AstroBridge | 설명용']
  };
  const legacyExtra = {
    es: { titles:['Seis rutas EVM','Vista de ruta','Asistencia de IA','Rutas en producción','Controles de seguridad','Red de nodos','Competencia de solucionadores','ZK / clientes ligeros','API y consola'], states:['Implementado y probado · despliegue pendiente','Interfaz de navegador','Investigación','Despliegue pendiente','Validación gradual','Propuesta','Propuesta','Investigación','Vista previa'], headings:['Evidencia técnica actual','Vista previa de ejecución','Investigación de nodos y solucionadores','Investigación de verificación'], descriptions:['El informe fechado documenta implementación y pruebas LI.FI para seis redes EVM; al momento del informe seguían pendientes el despliegue y la aceptación con fondos reales.','La interfaz muestra solicitudes y valida entradas locales; no demuestra liquidez, cotización, difusión ni liquidación real.','La red descentralizada de nodos y la competencia de solucionadores son propuestas de la hoja de ruta, aún no lanzadas.','Los clientes ligeros y pruebas de conocimiento cero son investigación; no se afirma verificación universal ni ejecución completamente en cadena.'],link:'Ver informe →' },
    fr: { titles:['Six parcours EVM','Aperçu des routes','Assistance IA','Routage en production','Contrôles de sécurité','Réseau de nœuds','Compétition des solveurs','ZK / clients légers','API et console'],states:['Développé et testé · déploiement en attente','Interface navigateur','Recherche','Déploiement en attente','Validation progressive','Proposition','Proposition','Recherche','Aperçu'],headings:['Preuves techniques actuelles','Aperçu avant exécution','Recherche sur les nœuds','Recherche sur la vérification'],descriptions:['Le rapport daté décrit l’implémentation et les tests LI.FI sur six réseaux EVM ; le déploiement et l’acceptation avec fonds réels restaient à réaliser à cette date.','L’interface illustre des requêtes et vérifie les entrées locales ; elle ne prouve ni liquidité, ni devis, ni diffusion, ni règlement réel.','Le réseau décentralisé et la compétition des solveurs sont des propositions non lancées.','Clients légers et preuves à divulgation nulle restent de la recherche ; aucune vérification universelle ou exécution entièrement en chaîne n’est revendiquée.'],link:'Voir le rapport →'},
    de: { titles:['Sechs EVM-Routen','Routenvorschau','KI-Unterstützung','Produktionsrouting','Sicherheitsprüfungen','Knotennetzwerk','Solver-Wettbewerb','ZK / Light Clients','API und Konsole'],states:['Implementiert und getestet · Bereitstellung ausstehend','Browseroberfläche','Forschung','Bereitstellung ausstehend','Stufenweise Prüfung','Vorschlag','Vorschlag','Forschung','Vorschau'],headings:['Aktuelle technische Nachweise','Vorschau vor Ausführung','Knoten- und Solver-Forschung','Verifizierungsforschung'],descriptions:['Der datierte Bericht dokumentiert LI.FI-Implementierung und Tests für sechs EVM-Netzwerke; Bereitstellung und Echtgeldabnahme standen zum Berichtszeitpunkt noch aus.','Die Oberfläche zeigt Anfragen und prüft lokale Eingaben; sie belegt weder Liquidität noch Angebote, Übermittlung oder tatsächliche Abwicklung.','Dezentrales Knotennetzwerk und Solver-Wettbewerb sind noch nicht gestartete Vorschläge.','Light Clients und Zero-Knowledge-Verifikation sind Forschung; universelle Verifikation oder vollständige On-Chain-Ausführung werden nicht behauptet.'],link:'Bericht ansehen →'},
    ja: { titles:['6つの EVM 経路','経路プレビュー','AI 支援','本番ルーティング','安全確認','ノードネットワーク','ソルバー競争','ZK / 軽量クライアント','API とコンソール'],states:['実装・テスト済み・展開待ち','ブラウザー画面','研究','展開待ち','段階的検証','構想','構想','研究','プレビュー'],headings:['現在の技術的根拠','実行前のプレビュー','ノードとソルバーの研究','検証技術の研究'],descriptions:['日付付き報告書では6つの EVM ネットワークに対する LI.FI の実装とテストを記録しています。報告時点では本番展開と実資金での受け入れ検証は未完了でした。','画面上の入力検証や経路表示は、流動性、見積もり、送信、実際の決済を証明しません。','分散ノードとソルバー競争は未提供の構想です。','軽量クライアントとゼロ知識証明は研究段階であり、普遍的な検証や完全なオンチェーン実行を主張していません。'],link:'報告書を見る →'},
    ko: { titles:['6개 EVM 경로','경로 미리보기','AI 지원','운영 라우팅','안전 검사','노드 네트워크','솔버 경쟁','ZK / 라이트 클라이언트','API와 콘솔'],states:['구현 및 테스트 · 배포 대기','브라우저 화면','연구','배포 대기','단계별 검증','계획','계획','연구','미리보기'],headings:['현재 기술 근거','실행 전 미리보기','노드와 솔버 연구','검증 기술 연구'],descriptions:['날짜가 있는 보고서에는 6개 EVM 네트워크의 LI.FI 구현과 테스트가 기록되어 있으며, 보고 당시 운영 배포와 실자금 검증은 미완료였습니다.','인터페이스의 입력 검사와 경로 표시는 실제 유동성, 견적, 전송 또는 정산을 증명하지 않습니다.','분산 노드와 솔버 경쟁은 아직 출시되지 않은 계획입니다.','라이트 클라이언트와 영지식 검증은 연구 단계이며 보편적 검증이나 완전한 온체인 실행을 주장하지 않습니다.'],link:'보고서 보기 →'}
  };
  function applyLegacy(language) {
    original.innerHTML = originalHtml;
    original.lang = language;
    if (language === 'en') return;
    if (language !== 'zh') {
      const data=legacyExtra[language];
      original.querySelectorAll('.tech-node').forEach((node,i) => {node.querySelectorAll('div')[1].textContent=data.titles[i];node.querySelector('small').textContent=data.states[i];});
      original.querySelectorAll('.tech-card').forEach((card,i) => {card.querySelector('h3').textContent=data.headings[i];const p=card.querySelector('p');const link=p.querySelector('a');p.textContent=data.descriptions[i];if(link){link.textContent=data.link;p.append(' ',link);}});
      return;
    }
    const titles = ['六条 EVM 报价路线','路线预览','AI 辅助','生产路由','安全关卡','节点网络','求解者竞争','零知识证明 / 轻客户端','API 与控制台'];
    const states = ['已实现并测试，待部署','浏览器界面','研究方向','待部署','分阶段验证','路线图提案','路线图提案','研究方向','界面预览'];
    original.querySelectorAll('.tech-node').forEach((node,i) => {node.querySelectorAll('div')[1].textContent=titles[i];node.querySelector('small').textContent=states[i];});
    const headings = ['当前工程证据','执行前预览','节点与求解者研究','验证技术研究'];
    const descriptions = [
      '带日期的内部报告记录了 BSC、Ethereum、Polygon、Arbitrum、Avalanche 和 Base 六条白名单路线的 LI.FI 实现与测试；报告当时生产部署及真实小额验收仍待完成。',
      '当前公开界面可以验证本地输入并展示路线请求，但不能证明实时流动性、报价可用、交易广播或结算完成。',
      '去中心化节点网络与求解者竞争仍是路线图提案；参与规则、激励、反滥用控制及生产容量尚未上线。',
      '轻客户端和零知识验证仍处于研究方向；AstroBridge 目前不宣称实现普遍的最小信任验证或完整链上执行。'
    ];
    original.querySelectorAll('.tech-card').forEach((card,i) => {card.querySelector('h3').textContent=headings[i];const p=card.querySelector('p');const link=p.querySelector('a');p.textContent=descriptions[i];if(link){link.textContent='查看准备度报告 →';p.append(' ',link);}});
  }
  const normalize = value => String(value || 'en').toLowerCase().split(/[-_]/)[0];
  function apply(value) {
    const requested = normalize(value), language = requested === 'en' || translations[requested]?.length === keys.length ? requested : 'en';
    const dictionary = language === 'en' ? english : Object.fromEntries(keys.map((key,index) => [key,translations[language][index]]));
    nodes.forEach(node => { if (dictionary[node.dataset.t]) node.textContent = dictionary[node.dataset.t]; });
    applyLegacy(language);
    document.querySelector('.back-home').textContent=navigation[language][0];
    document.querySelectorAll('.nav-links a').forEach((link,i)=>{link.textContent=navigation[language][i+1];});
    document.querySelector('footer p').textContent=navigation[language][5];
    document.documentElement.lang = language; select.value = language;
    document.querySelectorAll('a[href]').forEach(link => { try {const u = new URL(link.getAttribute('href'),location.href); if(u.origin===location.origin && u.pathname.endsWith('.html')) {u.searchParams.set('lang',language);link.setAttribute('href',u.pathname+u.search+u.hash);}} catch(_){} });
    try { localStorage.setItem('ma.program.language',language); } catch (_) {}
  }
  let language = new URLSearchParams(location.search).get('lang');
  if (!language) { try { language = localStorage.getItem('ma.program.language'); } catch (_) {} }
  apply(language || 'en');
  select.addEventListener('change', event => {const url=new URL(location.href);url.searchParams.set('lang',event.target.value);history.replaceState(null,'',url.pathname+url.search+url.hash);apply(event.target.value);});
})();
