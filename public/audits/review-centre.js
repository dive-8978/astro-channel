(() => {
  'use strict';
  const data = window.ASTRO_REVIEW_CENTRE;
  if (!data) return;
  const words = {
    en: { title: 'Security & Engineering Reviews', back: 'Back to AstroBridge', eyebrow: 'Evidence, scope and follow-up', intro: 'Dated public summaries, real external website checks and openly available review references. Full internal reports and core technical details remain private.', reports: 'Public review summaries', reportNote: 'A scoped internal review does not certify the entire product. Each summary records its limits and next steps.', external: 'External website checks', externalNote: 'Automated observations for the public website only. They do not audit MA, AstroAI Chain or every geographic endpoint.', references: 'Public report libraries', referenceNote: 'Free to read examples published by their original authors. These organisations have not audited or endorsed AstroBridge through this review.', resources: 'Free standards and tools', resourcesNote: 'Useful references for future verification. A listed tool is not an obtained certification.', archive: 'Historical review archive', archiveNote: 'The 24 September 2026 record is retained as a dated public summary. Its complete technical evidence is archived privately.', open: 'Read public summary', json: 'Public evidence JSON', provider: 'Original provider report', snapshot: 'Dated result snapshot', limited: 'Scope and limits', published: 'Published', bodyNote: 'Report bodies are available in English and Chinese.', internalCount: 'Internal review summaries', serviceCount: 'External check services', libraryCount: 'Public reference libraries', updated: 'Review date', footer: 'AstroBridge engineering review centre. Internal review, external automated check and independent human audit are different evidence types.', notFound: 'Review not found', returnCentre: 'Back to review centre', confidential: 'Core technical material is kept private.', internalLabel: 'Internal review · public summary', externalLabel: 'External automated service', historicalLabel: 'Historical public summary', archiveTitle: 'MA / AstroBridge - September 2026 review', archiveBody: 'At that date, the reviewed implementation had recorded local checks; production integration work remained pending. This historical observation is not a statement about current service availability.' },
    zh: { title: '安全与工程审核中心', back: '返回 AstroBridge', eyebrow: '证据、范围与持续跟进', intro: '提供有日期的公开摘要、真实的外部官网检查结果，以及可免费阅读的审核参考。完整内部报告与核心技术资料不公开。', reports: '内部审核的公开摘要', reportNote: '限定范围的内部审核不等于整个产品通过安全认证。每份摘要分别说明验证边界和后续工作。', external: '外部官网检查', externalNote: '仅针对公开官网的自动化观察，不覆盖 MA、AstroAI Chain 或所有地区入口。', references: '公开审核报告参考库', referenceNote: '原作者公开发布、可免费阅读的案例。本轮没有委托这些机构审核 AstroBridge，也不代表获得其背书。', resources: '免费标准与检查工具', resourcesNote: '用于后续验证的参考资料；列出工具不等于取得认证。', archive: '历史审核归档', archiveNote: '2026 年 9 月 24 日的记录保留为有日期的公开摘要，完整技术证据已在内部归档。', open: '阅读公开摘要', json: '公开证据 JSON', provider: '原服务结果页面', snapshot: '有日期的结果快照', limited: '范围与限制', published: '发布日期', bodyNote: '报告正文目前提供中文与英文。', internalCount: '内部审核公开摘要', serviceCount: '外部检查服务', libraryCount: '公开参考报告库', updated: '审核日期', footer: 'AstroBridge 工程审核中心。内部审核、外部自动化检查、独立人工审计属于不同证据类型。', notFound: '未找到这份摘要', returnCentre: '返回审核中心', confidential: '核心技术资料仅内部保存。', internalLabel: '内部审核 · 公开摘要', externalLabel: '外部自动化服务', historicalLabel: '历史公开摘要', archiveTitle: 'MA / AstroBridge：2026 年 9 月审核', archiveBody: '当时的评审实现已有本地检查记录，生产集成仍有待办。这份历史观察不代表当前服务状态。' },
  };
  const titleByLanguage = { es: 'Revisiones de seguridad e ingeniería', fr: 'Revues de sécurité et d’ingénierie', de: 'Sicherheits- und Entwicklungsprüfungen', ja: 'セキュリティ・技術レビュー', ko: '보안 및 엔지니어링 검토' };
  const supported = ['en', 'zh', 'es', 'fr', 'de', 'ja', 'ko'];
  const select = document.getElementById('languageSelect');
  let preferred = 'en';
  try { preferred = localStorage.getItem('astro-site-language') || 'en'; } catch (_) {}
  const requested = new URLSearchParams(location.search).get('lang');
  let current = supported.includes(requested) ? requested : supported.includes(preferred) ? preferred : 'en';
  const node = (tag, text, cls) => { const element = document.createElement(tag); if (text !== undefined) element.textContent = text; if (cls) element.className = cls; return element; };
  const link = (text, href, external = false) => { const element = node('a', text, 'button secondary'); element.href = href; if (external) { element.target = '_blank'; element.rel = 'noopener noreferrer'; } return element; };
  const localized = (value, lang) => value[lang === 'zh' ? 'zh' : 'en'];
  const replace = (id, children) => { const element = document.getElementById(id); if (element) element.replaceChildren(...children); };

  function render(lang) {
    const c = words[lang] || words.en;
    const textLang = lang === 'zh' ? 'zh' : 'en';
    current = lang;
    document.documentElement.lang = textLang;
    document.title = (titleByLanguage[lang] || c.title) + ' | AstroBridge';
    document.querySelectorAll('[data-review-copy]').forEach(element => { const key = element.dataset.reviewCopy; if (c[key]) element.textContent = c[key]; });
    const heading = document.querySelector('[data-review-copy="title"]');
    if (heading && titleByLanguage[lang]) heading.textContent = titleByLanguage[lang];
    const languageNote = document.getElementById('bodyLanguageNote');
    if (languageNote) languageNote.hidden = lang === 'zh' || lang === 'en';
    if (select) select.value = lang;
    try { localStorage.setItem('astro-site-language', lang); } catch (_) {}

    replace('reviewCards', data.reports.map(report => {
      const card = node('article', undefined, 'evidence report-card');
      card.append(node('span', c.internalLabel, 'status wait'), node('p', report.date + ' / ' + report.id, 'small'), node('h3', localized(report.title, lang)), node('p', localized(report.scope, lang)), node('p', localized(report.status, lang), 'review-state'));
      const buttons = node('div', undefined, 'download-row');
      buttons.append(link(c.open, '/audits/review.html?report=' + encodeURIComponent(report.slug) + '&lang=' + textLang), link(c.json, '/audits/' + report.slug + '.json'));
      card.append(buttons); return card;
    }));
    replace('externalChecks', data.externalChecks.map(check => {
      const card = node('article', undefined, 'evidence');
      card.append(node('span', c.externalLabel, 'status neutral'), node('h3', check.provider));
      if (check.grade) {
        card.append(node('p', check.grade + ' / ' + check.score, 'check-score'), node('p', textLang === 'zh' ? `${check.total} 项通过 ${check.passed} 项；算法版本 ${check.algorithmVersion}。` : `${check.passed} of ${check.total} tests passed; algorithm ${check.algorithmVersion}.`), node('p', check.scannedAt, 'small'));
      } else {
        card.append(node('p', check.grades.join(' / '), 'check-score'), node('p', textLang === 'zh' ? '两个被测入口的独立结果；不是所有地区的统一评分。' : 'Separate results for two observed endpoints, not a universal grade.'), node('p', '2026-11-01 / SSL Report ' + check.reportVersion, 'small'));
      }
      const buttons = node('div', undefined, 'download-row');
      buttons.append(link(c.provider, check.url, true), link(c.snapshot, check.snapshot)); card.append(buttons); return card;
    }));
    const referenceCards = records => records.map(item => { const card = node('article', undefined, 'evidence'); const a = link(item.name, item.url, true); a.className = 'reference-link'; card.append(node('h3'), node('p', localized(item.text, lang))); card.firstChild.append(a); return card; });
    replace('referenceLibraries', referenceCards(data.publicReferenceLibraries));
    replace('freeResources', referenceCards(data.resources));
    const archive = node('article', undefined, 'evidence');
    archive.append(node('span', c.historicalLabel, 'status neutral'), node('p', '2026-09-24 / AB-MA-READY-2026-09-24', 'small'), node('h3', c.archiveTitle), node('p', c.archiveBody));
    const archiveButtons = node('div', undefined, 'download-row'); archiveButtons.append(link(c.json, '/audits/ma-astrobridge-integration-2026-09-24.json')); archive.append(archiveButtons); replace('historicalReview', [archive]);

    const reader = document.getElementById('reviewArticle');
    if (reader) {
      const slug = new URLSearchParams(location.search).get('report');
      const report = data.reports.find(item => item.slug === slug);
      reader.replaceChildren();
      if (!report) { reader.append(node('h1', c.notFound), link(c.returnCentre, '/astrobridge-internal-certification.html?lang=' + textLang)); return; }
      document.title = localized(report.title, lang) + ' | AstroBridge';
      const top = node('section', undefined, 'hero');
      top.append(node('span', c.internalLabel, 'badge'), node('h1', localized(report.title, lang)), node('p', localized(report.scope, lang), 'lead'), node('p', report.date + ' / ' + report.id, 'small'), node('p', localized(report.status, lang), 'review-state'));
      reader.append(top);
      for (const section of report.sections) { const block = node('section', undefined, 'section'); block.append(node('h2', localized(section.title, lang))); const list = node('ul', undefined, 'review-list'); for (const item of section.items) list.append(node('li', localized(item, lang))); block.append(list); reader.append(block); }
      const bottom = node('section', undefined, 'section'); bottom.append(node('p', c.confidential), link(c.json, '/audits/' + report.slug + '.json'), link(c.returnCentre, '/astrobridge-internal-certification.html?lang=' + textLang)); reader.append(bottom);
    }
  }
  if (select) select.addEventListener('change', event => { const lang = event.target.value; const url = new URL(location.href); url.searchParams.set('lang', lang); history.replaceState(null, '', url); render(lang); });
  render(current);
})();
