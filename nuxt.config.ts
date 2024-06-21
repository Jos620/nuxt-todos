import { resolve } from 'node:path';

function resolvePath(path: string) {
  return resolve(__dirname, path);
}

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  ssr: process.env.BUILD_TYPE !== 'preview',
  srcDir: './src/ui',
  serverDir: './src/infra/http',
  modules: [
    '@unocss/nuxt',
    '@pinia/nuxt',
    '@vueuse/nuxt',
    '@nuxt/test-utils/module',
  ],
  alias: {
    '~': resolvePath('src'),
    '@': resolvePath('src'),
  },
  runtimeConfig: {
    databaseUrl: process.env.NUXT_DATABASE_URL,
    databaseAuthToken: process.env.NUXT_DATABASE_AUTH_TOKEN,
  },
  ignore: [process.env.NODE_ENV === 'production' ? '**/@*/*' : ''],
});
