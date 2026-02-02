import { defineConfig } from 'astro/config';

export default defineConfig({
  // 这里添加你需要的 i18n 配置，设置默认语言为英文
  i18n: {
    defaultLocale: 'en',
    locales: ['en']
  }
});