const { compilerOptions } = require('./.nuxt/tsconfig.server.json');

module.exports = {
  root: true,
  env: {
    browser: true,
    node: true,
  },
  parser: 'vue-eslint-parser',
  parserOptions: {
    parser: '@typescript-eslint/parser',
  },
  extends: ['@nuxtjs/eslint-config-typescript', 'prettier'],
  plugins: ['prettier', 'simple-import-sort'],
  rules: {
    'import/order': 'off',
    'simple-import-sort/imports': [
      'error',
      {
        groups: [
          ['^\\u0000'],
          ['^node:'],
          ['^@?\\w'],
          [`^(${Object.keys(compilerOptions.paths).join('|')})`],
          ['^'],
          ['^\\.'],
        ],
      },
    ],
    'no-useless-constructor': 'off',
  },
  overrides: [
    {
      files: ['*.cjs'],
      rules: {
        '@typescript-eslint/no-var-requires': 'off',
      },
    },
    {
      files: ['*.vue'],
      rules: {
        'vue/multi-word-component-names': 'off',
        'vue/no-multiple-template-root': 'off',
        'vue/require-default-prop': 'off',
      },
    },
  ],
};
