(() => {
  'use strict';
  const labels = { en:'ASTRO Airdrop · Plan', zh:'ASTRO 空投 · 计划', es:'Airdrop ASTRO · Plan', fr:'Airdrop ASTRO · Projet', de:'ASTRO-Airdrop · Plan', ja:'ASTRO エアドロップ · 計画', ko:'ASTRO 에어드롭 · 계획' };
  function apply() {
    const value = String(document.documentElement.lang || 'en').split(/[-_]/)[0];
    const lang = Object.hasOwn(labels,value) ? value : 'en';
    document.querySelectorAll('[data-airdrop-entry]').forEach(link => {
      link.textContent = labels[lang]; link.href = '/astro-airdrop.html?lang=' + lang;
    });
  }
  apply();
  new MutationObserver(apply).observe(document.documentElement,{attributes:true,attributeFilter:['lang']});
})();
