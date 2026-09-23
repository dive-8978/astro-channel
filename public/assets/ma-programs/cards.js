(function () {
  'use strict';

  /*
   * Public, read-only catalog for the MA Game Center artwork.
   *
   * The reference amounts below are intentionally proposals, not redemption
   * promises. A real claim flow must use an authenticated server inventory,
   * an audited settlement policy, and an on-chain transaction receipt. This
   * file performs no wallet access, signing, storage reads from the app, or
   * write requests.
   */

  var LANGS = ['en', 'zh', 'es', 'fr', 'de', 'ja', 'ko'];
  var LANG_INDEX = { en: 0, zh: 1, es: 2, fr: 3, de: 4, ja: 5, ko: 6 };
  var PAGE_SIZE = 24;

  // Kept byte-for-byte consistent with src/services/GameCenterI18n.js.
  var ANIMAL_NAMES = {
    ant: ['Ant', '蚂蚁', 'Hormiga', 'Fourmi', 'Ameise', 'アリ', '개미'],
    bee: ['Bee', '小蜜蜂', 'Abeja', 'Abeille', 'Biene', 'ミツバチ', '꿀벌'],
    butterfly: ['Butterfly', '蝴蝶', 'Mariposa', 'Papillon', 'Schmetterling', '蝶', '나비'],
    sparrow: ['Sparrow', '麻雀', 'Gorrion', 'Moineau', 'Spatz', 'スズメ', '참새'],
    hamster: ['Hamster', '仓鼠', 'Hamster', 'Hamster', 'Hamster', 'ハムスター', '햄스터'],
    rabbit: ['Rabbit', '兔子', 'Conejo', 'Lapin', 'Kaninchen', 'ウサギ', '토끼'],
    cat: ['Cat', '小猫', 'Gato', 'Chat', 'Katze', 'ネコ', '고양이'],
    dog: ['Dog', '小狗', 'Perro', 'Chien', 'Hund', 'イヌ', '강아지'],
    fox: ['Fox', '狐狸', 'Zorro', 'Renard', 'Fuchs', 'キツネ', '여우'],
    wolf: ['Wolf', '狼', 'Lobo', 'Loup', 'Wolf', 'オオカミ', '늑대'],
    deer: ['Deer', '鹿', 'Ciervo', 'Cerf', 'Hirsch', 'シカ', '사슴'],
    eagle: ['Eagle', '雄鹰', 'Aguila', 'Aigle', 'Adler', 'ワシ', '독수리'],
    leopard: ['Leopard', '豹子', 'Leopardo', 'Leopard', 'Leopard', 'ヒョウ', '표범'],
    tiger: ['Tiger', '老虎', 'Tigre', 'Tigre', 'Tiger', 'トラ', '호랑이'],
    lion: ['Lion', '狮子', 'Leon', 'Lion', 'Loewe', 'ライオン', '사자'],
    bear: ['Bear', '棕熊', 'Oso', 'Ours', 'Baer', 'クマ', '곰'],
    horse: ['Horse', '骏马', 'Caballo', 'Cheval', 'Pferd', 'ウマ', '말'],
    cow: ['Bull', '公牛', 'Toro', 'Taureau', 'Stier', '雄牛', '황소'],
    rhino: ['Rhino', '犀牛', 'Rinoceronte', 'Rhinoceros', 'Nashorn', 'サイ', '코뿔소'],
    hippo: ['Hippo', '河马', 'Hipopotamo', 'Hippopotame', 'Nilpferd', 'カバ', '하마'],
    giraffe: ['Giraffe', '长颈鹿', 'Jirafa', 'Girafe', 'Giraffe', 'キリン', '기린'],
    elephant: ['Elephant', '大象', 'Elefante', 'Elephant', 'Elefant', 'ゾウ', '코끼리'],
    orca: ['Orca', '虎鲸', 'Orca', 'Orque', 'Orca', 'シャチ', '범고래'],
    'blue-whale': ['Blue Whale', '蓝鲸鱼', 'Ballena Azul', 'Baleine Bleue', 'Blauwal', 'シロナガスクジラ', '대왕고래'],
    'blue-whale-purple': ['Purple Blue Whale', '紫色蓝鲸', 'Ballena Azul Morada', 'Baleine Bleue Violette', 'Violetter Blauwal', '紫シロナガスクジラ', '보라 대왕고래'],
    phoenix: ['Phoenix', '凤凰', 'Fenix', 'Phenix', 'Phoenix', 'フェニックス', '불사조']
  };

  var RARITY_BY_ANIMAL = {
    ant: 'N', bee: 'N', butterfly: 'N', sparrow: 'N',
    hamster: 'R', rabbit: 'R', cat: 'R', dog: 'R',
    fox: 'SR', wolf: 'SR', deer: 'SR', eagle: 'SR',
    leopard: 'SSR', tiger: 'SSR', lion: 'SSR', bear: 'SSR',
    horse: 'UR', cow: 'UR', rhino: 'UR', hippo: 'UR',
    giraffe: 'LR', elephant: 'LR', orca: 'LR',
    'blue-whale': 'MR', phoenix: 'MYTHIC'
  };

  var VARIANT_COUNTS = {
    ant: 3, bee: 4, butterfly: 4, sparrow: 4,
    hamster: 4, rabbit: 4, cat: 4, dog: 4,
    fox: 4, wolf: 4, deer: 4, eagle: 4,
    leopard: 4, tiger: 4, lion: 3, bear: 4,
    horse: 4, cow: 4, rhino: 4, hippo: 4,
    giraffe: 4, elephant: 4, orca: 4, 'blue-whale': 4,
    phoenix: 4
  };

  // Proposed reference schedule. It does not activate or create an entitlement.
  var PROPOSED_REFERENCE_SCHEDULE = Object.freeze({
    N: 10,
    R: 25,
    SR: 60,
    SSR: 150,
    UR: 400,
    LR: 1000,
    MR: 2500,
    MYTHIC: 10000,
    COSMIC: 50000
  });

  var COPY = {
    en: {
      all: 'All', app: 'App cards', legacy: 'Legacy migration',
      proposed: 'Proposed {amount} MA', migration: 'Migration pending · Not MA eligible',
      variant: '{name} · Card {index}', results: 'Showing {shown} of {total} cards',
      loadMore: 'Load more cards', imageAlt: '{name}, card {index}, {rarity} tier',
      tier: 'Tier', amount: 'Proposed reference', status: 'Status',
      planningOnly: 'Planning only — not active', empty: 'No cards match this filter.'
    },
    zh: {
      all: '全部', app: '应用卡片', legacy: '旧卡迁移',
      proposed: '拟议 {amount} MA', migration: '等待迁移 · 暂不符合 MA 兑换资格',
      variant: '{name} · 卡片 {index}', results: '已显示 {shown} / {total} 张卡片',
      loadMore: '加载更多卡片', imageAlt: '{name}，第 {index} 张，{rarity} 等级',
      tier: '等级', amount: '拟议参考值', status: '状态',
      planningOnly: '仅为规划方案 — 尚未启用', empty: '此筛选条件下没有卡片。'
    },
    es: {
      all: 'Todas', app: 'Cartas de la app', legacy: 'Migración heredada',
      proposed: '{amount} MA propuestos', migration: 'Migración pendiente · No elegible para MA',
      variant: '{name} · Carta {index}', results: 'Mostrando {shown} de {total} cartas',
      loadMore: 'Cargar más cartas', imageAlt: '{name}, carta {index}, nivel {rarity}',
      tier: 'Nivel', amount: 'Referencia propuesta', status: 'Estado',
      planningOnly: 'Solo planificación — no activo', empty: 'Ninguna carta coincide con este filtro.'
    },
    fr: {
      all: 'Toutes', app: 'Cartes de l’app', legacy: 'Migration héritée',
      proposed: '{amount} MA proposés', migration: 'Migration en attente · Non éligible au MA',
      variant: '{name} · Carte {index}', results: '{shown} cartes affichées sur {total}',
      loadMore: 'Afficher plus de cartes', imageAlt: '{name}, carte {index}, niveau {rarity}',
      tier: 'Niveau', amount: 'Référence proposée', status: 'Statut',
      planningOnly: 'Planification uniquement — inactif', empty: 'Aucune carte ne correspond à ce filtre.'
    },
    de: {
      all: 'Alle', app: 'App-Karten', legacy: 'Altdaten-Migration',
      proposed: 'Vorgeschlagene {amount} MA', migration: 'Migration ausstehend · Nicht MA-berechtigt',
      variant: '{name} · Karte {index}', results: '{shown} von {total} Karten angezeigt',
      loadMore: 'Mehr Karten laden', imageAlt: '{name}, Karte {index}, Stufe {rarity}',
      tier: 'Stufe', amount: 'Vorgeschlagener Referenzwert', status: 'Status',
      planningOnly: 'Nur Planung — nicht aktiv', empty: 'Keine Karten entsprechen diesem Filter.'
    },
    ja: {
      all: 'すべて', app: 'アプリカード', legacy: '旧カード移行',
      proposed: '提案値 {amount} MA', migration: '移行待ち · MA交換対象外',
      variant: '{name} · カード {index}', results: '{total}枚中{shown}枚を表示',
      loadMore: 'さらにカードを表示', imageAlt: '{name}、カード{index}、{rarity}ランク',
      tier: 'ランク', amount: '提案参考値', status: '状態',
      planningOnly: '計画案のみ — 未稼働', empty: 'この条件に一致するカードはありません。'
    },
    ko: {
      all: '전체', app: '앱 카드', legacy: '기존 카드 이전',
      proposed: '제안 {amount} MA', migration: '이전 대기 · MA 교환 대상 아님',
      variant: '{name} · 카드 {index}', results: '전체 {total}장 중 {shown}장 표시',
      loadMore: '카드 더 보기', imageAlt: '{name}, 카드 {index}, {rarity} 등급',
      tier: '등급', amount: '제안 참고값', status: '상태',
      planningOnly: '계획안 전용 — 미가동', empty: '이 필터에 맞는 카드가 없습니다.'
    }
  };

  function language() {
    var fromPrograms = window.MAPrograms && window.MAPrograms.getLanguage
      ? window.MAPrograms.getLanguage()
      : document.documentElement.lang;
    var code = String(fromPrograms || 'en').slice(0, 2).toLowerCase();
    return LANGS.indexOf(code) >= 0 ? code : 'en';
  }

  function text(key, variables, lang) {
    var code = lang || language();
    var template = (COPY[code] && COPY[code][key]) || COPY.en[key] || key;
    return String(template).replace(/\{(\w+)\}/g, function (_, name) {
      return variables && variables[name] !== undefined ? String(variables[name]) : '';
    });
  }

  function animalName(animalId, lang) {
    var names = ANIMAL_NAMES[animalId] || [animalId];
    return names[LANG_INDEX[lang || language()]] || names[0];
  }

  function makeAppCatalog() {
    var cards = [];
    Object.keys(VARIANT_COUNTS).forEach(function (animalId) {
      var count = VARIANT_COUNTS[animalId];
      for (var index = 1; index <= count; index += 1) {
        var rarity = animalId === 'phoenix' && index === 3
          ? 'COSMIC'
          : RARITY_BY_ANIMAL[animalId];
        cards.push(Object.freeze({
          id: animalId === 'phoenix' && index === 3 ? 'phoenix-cosmic' : animalId + '-' + index,
          animalId: animalId,
          index: index,
          rarity: rarity,
          image: '/assets/ma-programs/cards/' + animalId + '_' + index + '.jpg',
          source: 'ma-game-center',
          eligibility: 'planning',
          proposedMA: PROPOSED_REFERENCE_SCHEDULE[rarity]
        }));
      }
    });
    return cards;
  }

  function makeLegacyCatalog() {
    var cards = [];
    for (var index = 1; index <= 4; index += 1) {
      cards.push(Object.freeze({
        id: 'blue-whale-purple-' + index,
        animalId: 'blue-whale-purple',
        index: index,
        rarity: 'LEGACY',
        image: '/assets/ma-programs/cards/purple_whale_card_' + index + '.jpg',
        source: 'legacy-purple-whale',
        eligibility: 'migration-pending',
        proposedMA: null
      }));
    }
    return cards;
  }

  var APP_CARDS = Object.freeze(makeAppCatalog());
  var LEGACY_CARDS = Object.freeze(makeLegacyCatalog());
  var CATALOG = Object.freeze(APP_CARDS.concat(LEGACY_CARDS));

  // A hard failure during development prevents accidental catalog drift.
  if (APP_CARDS.length !== 98 || LEGACY_CARDS.length !== 4 || CATALOG.length !== 102) {
    throw new Error('Unexpected MA card catalog size');
  }

  var state = { filter: 'all', visible: PAGE_SIZE };

  function formatMA(amount, lang) {
    return new Intl.NumberFormat(lang || language(), { maximumFractionDigits: 0 }).format(amount);
  }

  function filteredCards() {
    if (state.filter === 'all') return CATALOG.slice();
    if (state.filter === 'app') return APP_CARDS.slice();
    if (state.filter === 'LEGACY') return LEGACY_CARDS.slice();
    return CATALOG.filter(function (card) { return card.rarity === state.filter; });
  }

  function makeCard(card, lang) {
    var article = document.createElement('article');
    article.className = 'catalog-card';
    article.dataset.cardId = card.id;
    article.dataset.rarity = card.rarity;

    var image = document.createElement('img');
    image.src = card.image;
    image.loading = 'lazy';
    image.decoding = 'async';
    image.width = 620;
    image.height = 849;
    image.alt = text('imageAlt', {
      name: animalName(card.animalId, lang),
      index: card.index,
      rarity: card.rarity
    }, lang);

    var copy = document.createElement('div');
    copy.className = 'catalog-copy';
    var title = document.createElement('strong');
    title.textContent = text('variant', {
      name: animalName(card.animalId, lang),
      index: card.index
    }, lang);
    var detail = document.createElement('span');
    detail.textContent = card.eligibility === 'migration-pending'
      ? text('migration', null, lang)
      : card.rarity + ' · ' + text('proposed', { amount: formatMA(card.proposedMA, lang) }, lang);

    copy.appendChild(title);
    copy.appendChild(detail);
    article.appendChild(image);
    article.appendChild(copy);
    return article;
  }

  function catalogElement() {
    return document.querySelector('[data-ma-card-catalog], #card-catalog');
  }

  function updateCatalog() {
    var container = catalogElement();
    if (!container) return;
    var lang = language();
    var matches = filteredCards();
    var visibleCards = matches.slice(0, state.visible);
    var fragment = document.createDocumentFragment();

    if (!visibleCards.length) {
      var empty = document.createElement('p');
      empty.className = 'subtle';
      empty.textContent = text('empty', null, lang);
      fragment.appendChild(empty);
    } else {
      visibleCards.forEach(function (card) { fragment.appendChild(makeCard(card, lang)); });
    }
    container.replaceChildren(fragment);

    var result = document.querySelector('[data-ma-card-results]');
    if (result) {
      result.setAttribute('aria-live', 'polite');
      result.textContent = text('results', { shown: visibleCards.length, total: matches.length }, lang);
    }

    var more = document.querySelector('[data-ma-card-load-more]');
    if (more) {
      more.textContent = text('loadMore', null, lang);
      more.hidden = visibleCards.length >= matches.length;
      more.disabled = visibleCards.length >= matches.length;
    }
  }

  function filterDefinitions() {
    return [
      { value: 'all', label: 'all' },
      { value: 'app', label: 'app' },
      { value: 'N', label: 'N' },
      { value: 'R', label: 'R' },
      { value: 'SR', label: 'SR' },
      { value: 'SSR', label: 'SSR' },
      { value: 'UR', label: 'UR' },
      { value: 'LR', label: 'LR' },
      { value: 'MR', label: 'MR' },
      { value: 'MYTHIC', label: 'MYTHIC' },
      { value: 'COSMIC', label: 'COSMIC' },
      { value: 'LEGACY', label: 'legacy' }
    ];
  }

  function bindFilters() {
    var controls = document.querySelector('[data-ma-card-filters]');
    if (!controls) return;
    var lang = language();
    var fragment = document.createDocumentFragment();
    filterDefinitions().forEach(function (definition) {
      var button = document.createElement('button');
      button.type = 'button';
      button.className = 'filter' + (state.filter === definition.value ? ' active' : '');
      button.dataset.cardFilter = definition.value;
      button.setAttribute('aria-pressed', String(state.filter === definition.value));
      button.textContent = COPY.en[definition.label]
        ? text(definition.label, null, lang)
        : definition.label;
      fragment.appendChild(button);
    });
    controls.replaceChildren(fragment);
  }

  function updateFilterState() {
    document.querySelectorAll('[data-card-filter]').forEach(function (button) {
      var active = button.dataset.cardFilter === state.filter;
      button.classList.toggle('active', active);
      button.setAttribute('aria-pressed', String(active));
    });
  }

  function bindInteractions() {
    var controls = document.querySelector('[data-ma-card-filters]');
    if (controls && !controls.dataset.bound) {
      controls.dataset.bound = 'true';
      controls.addEventListener('click', function (event) {
        var button = event.target.closest('[data-card-filter]');
        if (!button || !controls.contains(button)) return;
        state.filter = button.dataset.cardFilter || 'all';
        state.visible = PAGE_SIZE;
        updateFilterState();
        updateCatalog();
      });
    }
    var more = document.querySelector('[data-ma-card-load-more]');
    if (more && !more.dataset.bound) {
      more.dataset.bound = 'true';
      more.addEventListener('click', function () {
        state.visible += PAGE_SIZE;
        updateCatalog();
      });
    }
  }

  function renderPriceTable() {
    var body = document.querySelector('[data-ma-price-table]');
    if (!body) return;
    var lang = language();
    var fragment = document.createDocumentFragment();
    Object.keys(PROPOSED_REFERENCE_SCHEDULE).forEach(function (rarity) {
      var row = document.createElement('tr');
      var tier = document.createElement('td');
      var value = document.createElement('td');
      var status = document.createElement('td');
      var badge = document.createElement('span');
      badge.className = 'rarity';
      badge.textContent = rarity;
      tier.appendChild(badge);
      value.textContent = text('proposed', {
        amount: formatMA(PROPOSED_REFERENCE_SCHEDULE[rarity], lang)
      }, lang);
      status.textContent = text('planningOnly', null, lang);
      row.appendChild(tier);
      row.appendChild(value);
      row.appendChild(status);
      fragment.appendChild(row);
    });
    body.replaceChildren(fragment);
  }

  function renderDeck() {
    var deck = document.querySelector('[data-ma-card-deck]');
    if (!deck || deck.childElementCount) return;
    ['ant-1', 'tiger-1', 'blue-whale-1', 'phoenix-cosmic', 'blue-whale-purple-1'].forEach(function (id) {
      var card = CATALOG.find(function (candidate) { return candidate.id === id; });
      if (!card) return;
      var shell = document.createElement('div');
      shell.className = 'deck-card';
      var image = document.createElement('img');
      image.src = card.image;
      image.loading = 'eager';
      image.decoding = 'async';
      image.alt = text('imageAlt', {
        name: animalName(card.animalId), index: card.index, rarity: card.rarity
      });
      shell.appendChild(image);
      deck.appendChild(shell);
    });
  }

  function renderCounts() {
    document.querySelectorAll('[data-ma-app-card-count]').forEach(function (element) {
      element.textContent = String(APP_CARDS.length);
    });
    document.querySelectorAll('[data-ma-legacy-card-count]').forEach(function (element) {
      element.textContent = String(LEGACY_CARDS.length);
    });
    document.querySelectorAll('[data-ma-total-card-count]').forEach(function (element) {
      element.textContent = String(CATALOG.length);
    });
  }

  function render() {
    bindFilters();
    bindInteractions();
    renderPriceTable();
    renderDeck();
    renderCounts();
    updateCatalog();
  }

  window.MACards = Object.freeze({
    APP_CARDS: APP_CARDS,
    LEGACY_CARDS: LEGACY_CARDS,
    CATALOG: CATALOG,
    ANIMAL_NAMES: Object.freeze(ANIMAL_NAMES),
    PROPOSED_REFERENCE_SCHEDULE: PROPOSED_REFERENCE_SCHEDULE,
    render: render,
    getAnimalName: animalName
  });

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', render, { once: true });
  } else {
    render();
  }
  window.addEventListener('ma:languagechange', render);
})();
