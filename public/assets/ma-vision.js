// A long-term mission, not a claim of universal payment acceptance today.
(() => {
  const copy = {
    en: ['OUR VISION', 'Make digital currency a universal currency.', 'Connecting people. Moving value across borders.', 'MA strives to bring conversations and digital asset transfers into everyday life, making it easier for people to connect and exchange value.'],
    zh: ['我们的愿景', '让数字货币成为全球通用货币。', '让沟通连接世界，让价值跨越国界。', 'MA 致力于将聊天与数字资产转账融入日常，让人与人之间的价值传递更加便捷。'],
    es: ['NUESTRA VISIÓN', 'Hacer de la moneda digital una moneda universal.', 'Conectar personas. Mover valor más allá de las fronteras.', 'MA aspira a integrar las conversaciones y las transferencias de activos digitales en la vida cotidiana, facilitando la conexión y el intercambio de valor entre personas.'],
    fr: ['NOTRE VISION', 'Faire de la monnaie numérique une monnaie universelle.', 'Relier les personnes. Faire circuler la valeur au-delà des frontières.', 'MA aspire à intégrer les conversations et les transferts d’actifs numériques au quotidien, pour faciliter les liens et les échanges de valeur entre les personnes.'],
    de: ['UNSERE VISION', 'Digitale Währung zu einer universellen Währung machen.', 'Menschen verbinden. Werte über Grenzen hinweg bewegen.', 'MA möchte Gespräche und digitale Vermögensübertragungen in den Alltag integrieren, damit Menschen leichter miteinander in Kontakt treten und Werte austauschen können.'],
    ja: ['私たちのビジョン', 'デジタル通貨を、世界共通の通貨へ。', '会話で世界をつなぎ、価値を国境の先へ。', 'MA は、チャットとデジタル資産の送金を日常に取り入れ、人と人とのつながりと価値のやり取りをより便利にすることを目指します。'],
    ko: ['우리의 비전', '디지털 화폐를 세계 공통의 화폐로.', '사람을 연결하고, 국경을 넘어 가치를 전합니다.', 'MA는 대화와 디지털 자산 전송을 일상에 통합하여 사람들이 더 편리하게 연결되고 가치를 주고받는 미래를 지향합니다.'],
  };
  const fields = ['label', 'title', 'tagline', 'body'];
  const normalize = value => String(value || 'en').split(/[-_]/)[0];
  const requested = normalize(new URLSearchParams(location.search).get('lang'));
  function render() {
    const lang = document.querySelector('#language')
      ? normalize(document.documentElement.lang) : requested;
    const rows = copy[lang] || copy.en;
    document.querySelectorAll('[data-ma-vision]').forEach(node => {
      const index = fields.indexOf(node.dataset.maVision);
      if (index >= 0) node.textContent = rows[index];
    });
    document.querySelectorAll('.ma-vision').forEach(node => { node.lang = copy[lang] ? lang : 'en'; });
  }
  render();
  new MutationObserver(render).observe(document.documentElement, {attributes: true, attributeFilter: ['lang']});
})();
