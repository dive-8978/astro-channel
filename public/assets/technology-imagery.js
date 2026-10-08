(() => {
  'use strict';
  const captions = {
    en: 'Concept artwork · not a product screenshot or live network map.',
    zh: '概念配图 · 非产品截图或实时网络地图。',
    es: 'Ilustración conceptual · no es una captura del producto ni un mapa de red en vivo.',
    fr: 'Illustration conceptuelle · ni capture du produit, ni carte du réseau en direct.',
    de: 'Konzeptillustration · kein Produkt-Screenshot oder Live-Netzwerkplan.',
    ja: 'コンセプト画像 · 製品画面や稼働中のネットワーク図ではありません。',
    ko: '콘셉트 이미지 · 제품 화면이나 실시간 네트워크 지도가 아닙니다.'
  };
  const updateCaptions = () => {
    const language = (document.documentElement.lang || 'en').split('-')[0];
    document.querySelectorAll('[data-tech-caption]').forEach(node => {
      node.textContent = captions[language] || captions.en;
    });
  };
  updateCaptions();
  if (typeof MutationObserver === 'function') {
    new MutationObserver(updateCaptions).observe(document.documentElement, {
      attributes: true, attributeFilter: ['lang']
    });
  }
  // Images are visible by default, including without JavaScript. Animation is
  // an enhancement, never a prerequisite for rendering or navigation.
  const reducedMotion = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;
  document.querySelectorAll('.tech-visual').forEach(frame => {
    const image = frame.querySelector('img');
    if (!image) return;
    let loaded = false;
    let failed = false;
    let inView = image.loading !== 'lazy' || reducedMotion;
    let observer;
    const reveal = () => {
      if (loaded && inView && !failed) {
        frame.classList.add('is-ready');
        observer?.disconnect();
      }
    };
    const fail = () => {
      failed = true;
      frame.classList.add('image-failed');
      frame.parentElement?.classList.add('image-failed');
      observer?.disconnect();
    };
    const onLoad = async () => {
      if (!image.naturalWidth) return fail();
      try { await image.decode?.(); } catch { /* Loaded pixels remain usable. */ }
      loaded = true;
      reveal();
    };
    if (!inView && typeof IntersectionObserver === 'function') {
      try {
        observer = new IntersectionObserver(entries => {
          if (entries.some(entry => entry.isIntersecting)) {
            inView = true;
            reveal();
          }
        }, { threshold: .05 });
        observer.observe(frame);
      } catch { inView = true; }
    } else { inView = true; }
    image.addEventListener('load', onLoad, { once: true });
    image.addEventListener('error', fail, { once: true });
    if (image.complete) void onLoad();
  });
})();
