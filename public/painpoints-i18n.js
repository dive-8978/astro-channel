/* Seven-language MA homepage copy. Static translations only; no remote scripts or account access. */
(() => {
  'use strict';
  const languages = ['en', 'zh', 'es', 'fr', 'de', 'ja', 'ko'];
  const rows = [
  [
    "Explore",
    "Explorar",
    "Découvrir",
    "Entdecken",
    "機能",
    "둘러보기"
  ],
  [
    "Privacy",
    "Privacidad",
    "Confidentialité",
    "Datenschutz",
    "プライバシー",
    "개인정보 보호"
  ],
  [
    "Get MA",
    "Obtener MA",
    "Obtenir MA",
    "MA herunterladen",
    "MA を入手",
    "MA 다운로드"
  ],
  [
    "Newsroom",
    "Noticias",
    "Actualités",
    "Neuigkeiten",
    "ニュース",
    "뉴스"
  ],
  [
    "MA / MADE FOR CONNECTION",
    "MA / PARA ESTAR CERCA",
    "MA / POUR GARDER LE LIEN",
    "MA / FÜR VERBINDUNG GEMACHT",
    "MA / つながりのために",
    "MA / 연결을 위해"
  ],
  [
    "Stay close.Even from afar.",
    "Siempre cerca.<br><span>Incluso a distancia.</span>",
    "Restez proches.<br><span>Même de loin.</span>",
    "Bleibt euch nah.<br><span>Auch aus der Ferne.</span>",
    "離れていても、<br><span>心は近くに。</span>",
    "멀리 있어도,<br><span>마음은 가까이.</span>"
  ],
  [
    "A message to Mom. A call with a friend. A moment worth sharing. MA brings conversations, voice and video calls, and community into one familiar place.",
    "Un mensaje a mamá. Una llamada con un amigo. Un momento para compartir. MA reúne conversaciones, llamadas de voz y vídeo y comunidad en un lugar familiar.",
    "Un message à maman. Un appel à un ami. Un moment à partager. MA réunit conversations, appels audio et vidéo et communauté dans un espace familier.",
    "Eine Nachricht an Mama. Ein Anruf bei Freunden. Ein Moment zum Teilen. MA vereint Chats, Sprach- und Videoanrufe und Gemeinschaft an einem vertrauten Ort.",
    "お母さんへのメッセージ、友人との電話、分かち合いたいひととき。MA はチャット、音声・ビデオ通話、コミュニティを使い慣れた一つの場所にまとめます。",
    "엄마에게 보내는 메시지, 친구와의 통화, 함께 나누고 싶은 순간. MA는 채팅, 음성·영상 통화, 커뮤니티를 익숙한 한곳에 담습니다."
  ],
  [
    "Get it on Google Play",
    "Disponible en Google Play",
    "Disponible sur Google Play",
    "Bei Google Play herunterladen",
    "Google Play で入手",
    "Google Play에서 다운로드"
  ],
  [
    "Choose your edition",
    "Elige tu edición",
    "Choisissez votre version",
    "Version auswählen",
    "バージョンを選ぶ",
    "버전 선택"
  ],
  [
    "iOS · Release pending",
    "iOS · Lanzamiento pendiente",
    "iOS · Sortie à venir",
    "iOS · Veröffentlichung ausstehend",
    "iOS · 正式公開待ち",
    "iOS · 정식 출시 대기"
  ],
  [
    "For family & friends",
    "Para familia y amigos",
    "Pour la famille et les amis",
    "Für Familie und Freunde",
    "家族や友人と",
    "가족과 친구를 위해"
  ],
  [
    "Your data, thoughtfully handled",
    "Tus datos, tratados con cuidado",
    "Vos données, traitées avec soin",
    "Sorgsamer Umgang mit Ihren Daten",
    "データを大切に扱う",
    "데이터를 신중하게"
  ],
  [
    "Official support",
    "Soporte oficial",
    "Assistance officielle",
    "Offizieller Support",
    "公式サポート",
    "공식 지원"
  ],
  [
    "No phone number to create a chat identity",
    "Crea tu identidad sin número de teléfono",
    "Créez votre identité sans numéro de téléphone",
    "Chat-Identität ohne Telefonnummer erstellen",
    "電話番号なしでチャット ID を作成",
    "전화번호 없이 채팅 ID 생성"
  ],
  [
    "7 interface languages",
    "7 idiomas de interfaz",
    "7 langues d’interface",
    "7 Oberflächensprachen",
    "7 言語のインターフェース",
    "7개 인터페이스 언어"
  ],
  [
    "Local-first conversations",
    "Conversaciones con prioridad local",
    "Conversations privilégiant le stockage local",
    "Chats mit lokaler Speicherung im Fokus",
    "ローカル優先の会話",
    "로컬 우선 대화"
  ],
  [
    "People first. Always.",
    "Las personas, siempre primero.",
    "Les personnes avant tout.",
    "Menschen stehen an erster Stelle.",
    "いつも、人を中心に。",
    "언제나 사람을 먼저."
  ],
  [
    "Messages · Voice · Video",
    "Mensajes · Voz · Vídeo",
    "Messages · Audio · Vidéo",
    "Nachrichten · Sprache · Video",
    "メッセージ · 音声 · ビデオ",
    "메시지 · 음성 · 영상"
  ],
  [
    "MA & MA full",
    "MA y MA full",
    "MA et MA full",
    "MA und MA full",
    "MA と MA full",
    "MA 및 MA full"
  ],
  [
    "Designed for adults",
    "Para personas adultas",
    "Conçu pour les adultes",
    "Für Erwachsene entwickelt",
    "成人向け",
    "성인 사용자 대상"
  ],
  [
    "THE EVERYDAY, BETTER CONNECTED",
    "EL DÍA A DÍA, MÁS CONECTADO",
    "LE QUOTIDIEN, MIEUX CONNECTÉ",
    "IM ALLTAG BESSER VERBUNDEN",
    "日常を、もっとつなぐ",
    "일상을 더 가깝게"
  ],
  [
    "More ways to be there.",
    "Más formas de estar presente.",
    "Plus de façons d’être là.",
    "Auf mehr Wegen füreinander da.",
    "そばにいる方法を、もっと。",
    "함께하는 더 많은 방법."
  ],
  [
    "From a quick hello to a longer conversation, keep the people who matter part of your day.",
    "Desde un saludo breve hasta una larga conversación, comparte tu día con quienes importan.",
    "D’un petit bonjour à une longue conversation, gardez vos proches dans votre quotidien.",
    "Vom kurzen Hallo bis zum langen Gespräch: Lassen Sie wichtige Menschen an Ihrem Alltag teilhaben.",
    "短い挨拶からゆっくりした会話まで、大切な人を毎日の中に。",
    "짧은 인사부터 긴 대화까지, 소중한 사람들과 일상을 나누세요."
  ],
  [
    "Your everyday chat",
    "Tu chat de cada día",
    "Vos conversations du quotidien",
    "Ihr Chat für jeden Tag",
    "毎日のチャット",
    "일상 속 채팅"
  ],
  [
    "Text, photos, voice messages and expressive cards, all in the conversation.",
    "Texto, fotos, mensajes de voz y tarjetas expresivas en una misma conversación.",
    "Textes, photos, messages vocaux et cartes expressives dans la conversation.",
    "Text, Fotos, Sprachnachrichten und ausdrucksstarke Karten direkt im Chat.",
    "テキスト、写真、ボイスメッセージ、気持ちを伝えるカードを会話の中で。",
    "텍스트, 사진, 음성 메시지, 감정이 담긴 카드를 대화에서 함께."
  ],
  [
    "Hear them. See them.",
    "Escúchalos. Míralos.",
    "Les entendre. Les voir.",
    "Hören. Sehen. Nah sein.",
    "声を聞く。顔を見る。",
    "목소리와 얼굴로 만나요."
  ],
  [
    "Voice and video calls bring familiar voices and faces into the moment.",
    "Las llamadas de voz y vídeo acercan voces y rostros familiares al momento.",
    "Les appels audio et vidéo rapprochent les voix et les visages familiers.",
    "Sprach- und Videoanrufe bringen vertraute Stimmen und Gesichter in den Moment.",
    "音声・ビデオ通話で、なじみの声と顔を今この瞬間に。",
    "음성·영상 통화로 익숙한 목소리와 얼굴을 지금 만나세요."
  ],
  [
    "A place for your people",
    "Un lugar para los tuyos",
    "Un espace pour les vôtres",
    "Ein Ort für Ihre Menschen",
    "仲間と集まる場所",
    "우리만의 대화 공간"
  ],
  [
    "Keep a family group close, gather friends, or join a project community.",
    "Mantén cerca a tu familia, reúne amigos o únete a una comunidad de proyecto.",
    "Gardez le lien en famille, réunissez vos amis ou rejoignez un groupe de projet.",
    "Bleiben Sie mit der Familie verbunden, versammeln Sie Freunde oder treten Sie einer Projektgruppe bei.",
    "家族のグループ、友人の集まり、関心のあるプロジェクトのコミュニティへ。",
    "가족과 연락하고, 친구들을 모으고, 관심 있는 프로젝트 그룹에 참여하세요."
  ],
  [
    "Small moments. Shared.",
    "Pequeños momentos compartidos.",
    "Les petits moments, partagés.",
    "Kleine Momente teilen.",
    "小さな日常を分かち合う。",
    "작은 순간을 함께."
  ],
  [
    "Share with friends in Moments. Explore the MA Square beta, where available.",
    "Comparte con amigos en Moments. Explora la beta de MA Square donde esté disponible.",
    "Partagez avec vos amis dans Moments. Découvrez la bêta de MA Square là où elle est disponible.",
    "Teilen Sie mit Freunden in Moments. Entdecken Sie die MA-Square-Beta, wo verfügbar.",
    "Moments で近況を共有。利用可能な地域では MA 広場のベータ版も体験できます。",
    "모멘트에서 친구들과 소식을 나누고, 지원되는 곳에서 MA 광장 베타를 만나보세요."
  ],
  [
    "MA Square · Beta",
    "MA Square · Beta",
    "MA Square · Bêta",
    "MA Square · Beta",
    "MA 広場 · ベータ版",
    "MA 광장 · 베타"
  ],
  [
    "Make it feel like you",
    "Hazlo a tu manera",
    "À votre image",
    "So, wie es zu Ihnen passt",
    "自分らしい使い心地に",
    "나에게 맞는 편안함"
  ],
  [
    "Choose your language, adjust text size and personalize your space.",
    "Elige tu idioma, ajusta el tamaño del texto y personaliza tu espacio.",
    "Choisissez votre langue, réglez la taille du texte et personnalisez votre espace.",
    "Wählen Sie Ihre Sprache, passen Sie die Schriftgröße an und gestalten Sie Ihren Bereich.",
    "言語を選び、文字サイズを調整し、自分のスペースをカスタマイズ。",
    "언어를 선택하고 글자 크기를 조절해 나만의 공간을 꾸미세요."
  ],
  [
    "Start with a chat identity",
    "Empieza con una identidad de chat",
    "Commencez avec une identité de discussion",
    "Mit einer Chat-Identität starten",
    "チャット ID から始める",
    "채팅 ID로 시작하세요"
  ],
  [
    "Create a local chat identity without opening or funding a wallet.",
    "Crea una identidad de chat local sin abrir ni financiar una cartera.",
    "Créez une identité locale sans ouvrir ni alimenter un portefeuille.",
    "Erstellen Sie eine lokale Chat-Identität, ohne eine Wallet zu eröffnen oder aufzuladen.",
    "ウォレットの作成や入金なしで、本機のチャット ID を作成できます。",
    "지갑을 만들거나 자금을 넣지 않고 로컬 채팅 ID를 생성하세요."
  ],
  [
    "FOR THE PEOPLE WHO MATTER",
    "PARA QUIENES IMPORTAN",
    "POUR CEUX QUI COMPTENT",
    "FÜR DIE MENSCHEN, DIE ZÄHLEN",
    "大切な人のために",
    "소중한 사람들을 위해"
  ],
  [
    "Some connections mean everything.",
    "Hay vínculos que lo son todo.",
    "Certains liens sont essentiels.",
    "Manche Verbindungen bedeuten alles.",
    "かけがえのない、つながり。",
    "어떤 연결은 전부가 됩니다."
  ],
  [
    "Distance changes where we live, not who we care about. MA is built around the simple things that keep mothers, families and friends connected: a hello, a familiar voice, a face on the screen.",
    "La distancia cambia dónde vivimos, no a quién queremos. MA se centra en lo que une a madres, familias y amigos: un saludo, una voz conocida, una cara en la pantalla.",
    "La distance change nos lieux de vie, pas nos liens. MA privilégie les gestes simples qui relient mères, familles et amis : un bonjour, une voix familière, un visage à l’écran.",
    "Entfernung verändert, wo wir leben, nicht wen wir lieben. MA setzt auf die kleinen Dinge, die Mütter, Familien und Freunde verbinden: ein Hallo, eine vertraute Stimme, ein Gesicht auf dem Bildschirm.",
    "距離が変えるのは住む場所であって、大切に思う相手ではありません。挨拶、聞き慣れた声、画面に映る顔。MA はお母さん、家族、友人をつなぐ小さな日常を大切にします。",
    "거리는 사는 곳을 바꾸지만 소중한 사람을 바꾸지는 않습니다. MA는 엄마, 가족, 친구를 이어 주는 작은 것들을 소중히 여깁니다. 인사 한마디, 익숙한 목소리, 화면 속 얼굴처럼요."
  ],
  [
    "Read our story",
    "Lee nuestra historia",
    "Lire notre histoire",
    "Unsere Geschichte lesen",
    "私たちの想いを読む",
    "우리의 이야기 읽기"
  ],
  [
    "Illustration",
    "Ilustración",
    "Illustration",
    "Illustration",
    "イラスト",
    "일러스트"
  ],
  [
    "CLEAR CHOICES. CLEAR BOUNDARIES.",
    "DECISIONES Y LÍMITES CLAROS",
    "DES CHOIX ET DES LIMITES CLAIRS",
    "KLARE ENTSCHEIDUNGEN. KLARE GRENZEN.",
    "選択も、境界も、明確に。",
    "명확한 선택과 경계"
  ],
  [
    "Your conversations deserve care.",
    "Tus conversaciones merecen cuidado.",
    "Vos conversations méritent de l’attention.",
    "Ihre Gespräche verdienen Sorgfalt.",
    "あなたの会話を、大切に。",
    "모든 대화를 소중하게."
  ],
  [
    "History on your device",
    "Historial en tu dispositivo",
    "Historique sur votre appareil",
    "Verlauf auf Ihrem Gerät",
    "履歴は自分の端末に",
    "기기에 저장되는 대화"
  ],
  [
    "Chat history is stored locally. Online delivery, account services and notifications use service infrastructure; see our privacy policy for details.",
    "El historial se guarda localmente. La entrega en línea, las cuentas y las notificaciones usan infraestructura de servicio; consulta la política de privacidad.",
    "L’historique est conservé localement. La livraison en ligne, les comptes et les notifications utilisent des services ; consultez notre politique de confidentialité.",
    "Der Chatverlauf wird lokal gespeichert. Online-Zustellung, Kontodienste und Benachrichtigungen nutzen Serverinfrastruktur; Details stehen in der Datenschutzerklärung.",
    "チャット履歴はローカルに保存されます。オンライン配信、アカウント、通知にはサービス基盤を利用します。詳細はプライバシーポリシーをご覧ください。",
    "채팅 기록은 로컬에 저장됩니다. 온라인 전달, 계정 서비스, 알림은 서비스 인프라를 사용합니다. 자세한 내용은 개인정보 처리방침을 확인하세요."
  ],
  [
    "Chat identity ≠ funds wallet",
    "Identidad de chat ≠ cartera",
    "Identité de discussion ≠ portefeuille",
    "Chat-Identität ≠ Wallet",
    "チャット ID と資金用ウォレットは別",
    "채팅 ID와 자금 지갑은 별개"
  ],
  [
    "A chat account connects you to people. Wallet tools, where enabled, are separate and do not give MA custody of your funds.",
    "La cuenta de chat te conecta con personas. Las herramientas de cartera, cuando están habilitadas, son independientes y no dan a MA la custodia de tus fondos.",
    "Le compte de discussion vous relie aux autres. Les outils de portefeuille, lorsqu’ils sont activés, sont distincts et ne confient pas vos fonds à MA.",
    "Das Chatkonto verbindet Sie mit Menschen. Verfügbare Wallet-Funktionen sind getrennt und geben MA keine Verwahrung über Ihr Guthaben.",
    "チャットアカウントは人とのつながりのためのもの。利用可能なウォレット機能は独立しており、MA が資金を預かることはありません。",
    "채팅 계정은 사람들을 연결합니다. 지원되는 지갑 도구는 별개이며 MA에 자금 보관 권한을 주지 않습니다."
  ],
  [
    "Tools for safer conversations",
    "Herramientas para conversar con seguridad",
    "Des outils pour mieux échanger",
    "Werkzeuge für sichere Gespräche",
    "安心して会話するための機能",
    "안심하고 대화하는 도구"
  ],
  [
    "Access report and block controls from chat profiles. Review the community rules and official support information whenever you need them.",
    "Accede a denunciar y bloquear desde los perfiles del chat. Consulta las normas de la comunidad y el soporte oficial cuando lo necesites.",
    "Signalez ou bloquez depuis les profils de discussion. Consultez les règles de la communauté et les informations d’assistance officielle.",
    "Melden und blockieren Sie über Chatprofile. Community-Regeln und offizielle Supportinformationen stehen bei Bedarf bereit.",
    "チャットのプロフィールから通報やブロックを利用できます。コミュニティ規則と公式サポート情報もご確認ください。",
    "채팅 프로필에서 신고와 차단을 이용하세요. 필요할 때 커뮤니티 규칙과 공식 지원 정보를 확인할 수 있습니다."
  ],
  [
    "Privacy & community rules",
    "Privacidad y normas",
    "Confidentialité et règles",
    "Datenschutz und Regeln",
    "プライバシーとコミュニティ規則",
    "개인정보 및 커뮤니티 규칙"
  ],
  [
    "One connection. Two editions.",
    "Una conexión. Dos ediciones.",
    "Un même lien. Deux versions.",
    "Eine Verbindung. Zwei Versionen.",
    "同じつながり。二つの選択。",
    "하나의 연결, 두 가지 버전."
  ],
  [
    "Choose MA for everyday connection, or MA full for the same experience with additional reading tools.",
    "Elige MA para conectar cada día o MA full para la misma experiencia con herramientas de lectura adicionales.",
    "Choisissez MA au quotidien, ou MA full pour la même expérience avec des outils de lecture supplémentaires.",
    "Wählen Sie MA für den Alltag oder MA full für dasselbe Erlebnis mit zusätzlichen Lesefunktionen.",
    "日々のつながりには MA。読書機能も使いたい方には MA full。",
    "일상적인 연결에는 MA, 추가 읽기 도구도 원한다면 MA full을 선택하세요."
  ],
  [
    "Everyday connection",
    "Conexión cotidiana",
    "Le lien au quotidien",
    "Im Alltag verbunden",
    "毎日のつながり",
    "일상 속 연결"
  ],
  [
    "Messaging, voice and video calls, groups and local-first conversations.",
    "Mensajes, llamadas de voz y vídeo, grupos y conversaciones con prioridad local.",
    "Messages, appels audio et vidéo, groupes et conversations privilégiant le stockage local.",
    "Nachrichten, Sprach- und Videoanrufe, Gruppen und lokal gespeicherte Gespräche.",
    "メッセージ、音声・ビデオ通話、グループ、ローカル優先の会話。",
    "메시지, 음성·영상 통화, 그룹, 로컬 우선 대화."
  ],
  [
    "Connection + reading",
    "Conexión y lectura",
    "Lien et lecture",
    "Verbindung und Lesen",
    "つながりと読書",
    "연결과 읽기"
  ],
  [
    "The MA communication experience, plus Bible and hymn reading tools.",
    "La experiencia de comunicación de MA, más herramientas de lectura de la Biblia e himnos.",
    "L’expérience de communication MA, avec des outils de lecture de la Bible et de cantiques.",
    "Die MA-Kommunikationserfahrung, ergänzt um Bibel- und Gesangbuch-Lesefunktionen.",
    "MA のコミュニケーション機能に、聖書と賛美歌の読書機能を追加。",
    "MA의 소통 경험에 성경과 찬송가 읽기 도구를 더했습니다."
  ],
  [
    "Availability depends on your country, device and store listing. Google Play shows the version available to you.",
    "La disponibilidad depende del país, dispositivo y ficha de la tienda. Google Play muestra la versión disponible para ti.",
    "La disponibilité dépend du pays, de l’appareil et de la fiche en boutique. Google Play affiche la version proposée.",
    "Die Verfügbarkeit hängt von Land, Gerät und Store-Eintrag ab. Google Play zeigt die für Sie verfügbare Version.",
    "配信状況は地域、端末、ストアによって異なります。入手可能なバージョンは Google Play でご確認ください。",
    "이용 가능 여부는 국가, 기기, 스토어에 따라 다릅니다. Google Play에서 제공되는 버전을 확인하세요."
  ],
  [
    "The iOS editions have been submitted to Apple. App Store availability will be announced here once confirmed.",
    "Las ediciones iOS se han enviado a Apple. Anunciaremos aquí su disponibilidad en App Store cuando esté confirmada.",
    "Les versions iOS ont été soumises à Apple. Leur disponibilité sur l’App Store sera annoncée ici après confirmation.",
    "Die iOS-Versionen wurden bei Apple eingereicht. Die Verfügbarkeit im App Store geben wir hier nach Bestätigung bekannt.",
    "iOS の両バージョンは Apple に提出済みです。App Store での配信が確認でき次第、ここでお知らせします。",
    "두 iOS 버전은 Apple에 제출되었습니다. App Store 출시가 확인되면 이곳에 안내하겠습니다."
  ],
  [
    "Android release",
    "Versión Android",
    "Version Android",
    "Android-Version",
    "Android 公開バージョン",
    "Android 출시 버전"
  ],
  [
    "Our wider purpose",
    "Nuestro propósito más amplio",
    "Notre engagement au-delà des échanges",
    "Unser weitergehendes Anliegen",
    "つながりの先にある想い",
    "연결 너머의 뜻"
  ],
  [
    "Care that looks ahead.",
    "Cuidado que mira al futuro.",
    "Une attention tournée vers l’avenir.",
    "Fürsorge mit Blick nach vorn.",
    "未来へ続く、思いやり。",
    "더 먼 미래를 향한 돌봄."
  ],
  [
    "These pages explain future proposals. Card redemption is not active; program plans are not live services or guaranteed benefits.",
    "Estas páginas explican propuestas futuras. El canje de tarjetas no está activo; los planes no son servicios disponibles ni beneficios garantizados.",
    "Ces pages présentent des projets futurs. L’échange de cartes n’est pas actif ; les projets ne constituent ni des services disponibles ni des avantages garantis.",
    "Diese Seiten erläutern Zukunftspläne. Karteneinlösung ist nicht aktiv; Pläne sind keine verfügbaren Dienste oder garantierten Vorteile.",
    "以下は将来の計画です。カード交換は未開始であり、計画は稼働中のサービスや利益の保証ではありません。",
    "아래 페이지는 향후 계획을 설명합니다. 카드 교환은 아직 운영되지 않으며, 계획은 출시된 서비스나 보장된 혜택이 아닙니다."
  ],
  [
    "Card redemption",
    "Canje de tarjetas",
    "Échange de cartes",
    "Karteneinlösung",
    "カード交換",
    "카드 교환"
  ],
  [
    "Explore the card collection and the proposed redemption program.",
    "Explora la colección de tarjetas y el programa de canje propuesto.",
    "Découvrez la collection de cartes et le projet d’échange.",
    "Entdecken Sie die Kartensammlung und das geplante Einlösungsprogramm.",
    "カードコレクションと交換プログラムの構想をご覧ください。",
    "카드 컬렉션과 교환 프로그램 계획을 살펴보세요."
  ],
  [
    "Mother Fund",
    "Fondo para Madres",
    "Fonds pour les mères",
    "Mütterfonds",
    "マザーファンド",
    "어머니 기금"
  ],
  [
    "Our proposed care initiative, with dignity and public accountability at its heart.",
    "Nuestra iniciativa de cuidado propuesta, centrada en la dignidad y la responsabilidad pública.",
    "Un projet solidaire fondé sur la dignité et la transparence.",
    "Unsere geplante Initiative für Fürsorge mit Würde und öffentlicher Rechenschaft.",
    "尊厳と透明性を大切にする支援構想です。",
    "존엄과 공개적인 책임을 중심에 둔 돌봄 계획입니다."
  ],
  [
    "Supply stewardship",
    "Gestión de la oferta",
    "Gestion de l’offre",
    "Verantwortlicher Umgang mit dem Angebot",
    "供給量の管理計画",
    "공급량 관리 계획"
  ],
  [
    "Read the proposed burn policy and its transaction-evidence requirements.",
    "Lee la política de quema propuesta y sus requisitos de pruebas de transacción.",
    "Consultez le projet de destruction de jetons et ses exigences de preuve.",
    "Lesen Sie die geplante Burn-Richtlinie und ihre Anforderungen an Transaktionsnachweise.",
    "バーン方針案と取引証明の要件をご覧ください。",
    "소각 정책 계획과 거래 증빙 요건을 확인하세요."
  ],
  [
    "Buyback plan",
    "Plan de recompra",
    "Plan de rachat",
    "Rückkaufplan",
    "買い戻し計画",
    "매입 계획"
  ],
  [
    "Understand the proposal, its conditions and the difference between plans and results.",
    "Conoce la propuesta, sus condiciones y la diferencia entre planes y resultados.",
    "Comprenez le projet, ses conditions et la distinction entre intentions et résultats.",
    "Erfahren Sie mehr über den Plan, seine Bedingungen und den Unterschied zu tatsächlichen Ergebnissen.",
    "構想、条件、計画と実績の違いをご確認ください。",
    "계획과 조건, 그리고 계획과 실제 결과의 차이를 확인하세요."
  ],
  [
    "Read the plan",
    "Leer el plan",
    "Lire le projet",
    "Plan lesen",
    "計画を読む",
    "계획 보기"
  ],
  [
    "Built by AstroBridge",
    "Creado por AstroBridge",
    "Créé par AstroBridge",
    "Entwickelt von AstroBridge",
    "AstroBridge が開発",
    "AstroBridge 제작"
  ],
  [
    "Policies & Community Rules",
    "Políticas y normas",
    "Politiques et règles",
    "Richtlinien und Community-Regeln",
    "ポリシーとコミュニティ規則",
    "정책 및 커뮤니티 규칙"
  ]
];
  const ui = {
    language: ['Language', '语言', 'Idioma', 'Langue', 'Sprache', '言語', '언어'],
    home: ['MA home', 'MA 首页', 'Inicio de MA', 'Accueil MA', 'MA-Startseite', 'MA ホーム', 'MA 홈'],
    programs: ['MA shortcuts', 'MA 快捷入口', 'Accesos MA', 'Raccourcis MA', 'MA-Schnellzugriffe', 'MA ショートカット', 'MA 바로가기'],
    preview: ['MA application preview', 'MA 应用预览', 'Vista previa de MA', 'Aperçu de MA', 'MA-App-Vorschau', 'MA アプリのプレビュー', 'MA 앱 미리보기'],
    android: ['MA application preview on Android', 'Android 上运行的 MA', 'MA en Android', 'MA sur Android', 'MA auf Android', 'Android で動作する MA', 'Android에서 실행 중인 MA'],
    icon: ['MA icon', 'MA 图标', 'Icono de MA', 'Icône MA', 'MA-Symbol', 'MA アイコン', 'MA 아이콘'],
    title: ["MA | Stay Close. Even from Afar.", "MA | 让牵挂，随时相连。", "MA | Siempre cerca, incluso a distancia.", "MA | Restez proches, même de loin.", "MA | Bleibt euch nah, auch aus der Ferne.", "MA | 離れていても、心は近くに。", "MA | 멀리 있어도, 마음은 가까이."],
    description: ["Stay connected with family and friends through MA: messages, voice and video calls, groups and local-first conversations. Explore MA and MA full on Google Play.", "通过 MA 与家人朋友保持联络：聊天、语音视频通话、群聊与本地优先的聊天体验。了解 Google Play 上的 MA 和 MA 全能版。", "Conecta con familia y amigos con MA: mensajes, llamadas de voz y vídeo, grupos y conversaciones con prioridad local. Descubre MA y MA full en Google Play.", "Gardez le lien avec vos proches grâce à MA : messages, appels audio et vidéo, groupes et conversations privilégiant le stockage local. Découvrez MA et MA full sur Google Play.", "Bleiben Sie mit Familie und Freunden verbunden: MA bietet Nachrichten, Sprach- und Videoanrufe, Gruppen und lokale Chatverläufe. MA und MA full bei Google Play.", "MA で家族や友人とつながる。メッセージ、音声・ビデオ通話、グループ、ローカル優先の会話。Google Play の MA と MA full をご覧ください。", "MA로 가족, 친구와 연락하세요. 메시지, 음성·영상 통화, 그룹, 로컬 우선 대화. Google Play에서 MA와 MA full을 만나보세요."],
    preparing: ['Preparing…', '准备下载…', 'Preparando…', 'Préparation…', 'Wird vorbereitet…', '準備中…', '준비 중…'],
    downloadError: ['The download could not start. Check your connection and try again.', '下载暂时失败，请检查网络后重试。', 'No se pudo iniciar la descarga. Comprueba tu conexión e inténtalo de nuevo.', 'Le téléchargement n’a pas pu démarrer. Vérifiez votre connexion et réessayez.', 'Der Download konnte nicht starten. Prüfen Sie Ihre Verbindung und versuchen Sie es erneut.', 'ダウンロードを開始できませんでした。接続を確認し、もう一度お試しください。', '다운로드를 시작할 수 없습니다. 연결을 확인하고 다시 시도하세요.']
  };
  const translations = new Map(rows.map(row => [row[0], row.slice(1)]));
  const originals = Array.from(document.querySelectorAll('[data-lang="en"]'), element => ({
    element, html: element.innerHTML, key: element.textContent.trim().replace(/\s+/g, ' ')
  }));
  const selector = document.getElementById('lang');
  let current = 'en';
  function message(key) { return ui[key][languages.indexOf(current)]; }
  function setLanguage(language) {
    current = languages.includes(language) ? language : 'en';
    document.documentElement.lang = current === 'zh' ? 'zh-Hans' : current;
    document.body.classList.toggle('zh', current === 'zh');
    originals.forEach(({ element, html, key }) => {
      element.innerHTML = current === 'en' || current === 'zh'
        ? html : translations.get(key)[languages.indexOf(current) - 2];
      element.lang = current;
    });
    selector.value = current;
    selector.setAttribute('aria-label', message('language'));
    document.querySelector('.brand').setAttribute('aria-label', message('home'));
    document.querySelector('.program-quicklinks').setAttribute('aria-label', message('programs'));
    document.querySelector('.device-stage').setAttribute('aria-label', message('preview'));
    document.querySelector('.device img').alt = message('android');
    document.querySelector('.cta > .wrap > img').alt = message('icon');
    document.title = message('title');
    document.querySelector('meta[name="description"]').content = message('description');
    try { localStorage.setItem('ma-page-language', current); } catch (_) { /* Storage may be blocked. */ }
  }
  // Reject unsupported query/storage values; never render externally supplied HTML.
  const requested = new URLSearchParams(location.search).get('lang');
  let saved;
  try { saved = localStorage.getItem('ma-page-language'); } catch (_) { /* Use English. */ }
  selector.addEventListener('change', () => setLanguage(selector.value));
  window.MA_PAGE_I18N = Object.freeze({ message, setLanguage, languages: Object.freeze(languages) });
  setLanguage(languages.includes(requested) ? requested : saved);
})();
