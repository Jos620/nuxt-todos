// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  ssr: process.env.BUILD_TYPE !== 'preview',
  srcDir: 'src',
  modules: [
    '@unocss/nuxt',
    '@pinia/nuxt',
    '@vueuse/nuxt',
    '@nuxt/test-utils/module',
  ],
  ignore: ['**/api/**/mock.ts'],
  hooks: {
    'prepare:types'({ tsConfig }) {
      const aliasToRemove = ['~', '~/*', '~~', '~~/*'];

      aliasToRemove.forEach((alias) => {
        if (tsConfig.compilerOptions?.paths[alias]) {
          delete tsConfig.compilerOptions.paths[alias];
        }
      });
    },
  },
});
