module.exports = {
  root: true,
  env: {
    browser: true,
    node: true,
  },
  extends: [
    '@nuxtjs/eslint-config-typescript',
    'prettier',
    'prettier/vue',
    'plugin:prettier/recommended',
    'plugin:nuxt/recommended',
  ],
  plugins: ['prettier'],
  // add your custom rules here
  rules: {
    // Vue
    'vue/attribute-hyphenation': 'off',
    'no-unused-expressions': 'off',
    'no-unused-vars': [1],
    '@typescript-eslint/no-unused-vars': [1],
    'no-console': ['warn', { allow: ['warn', 'error', 'info'] }],
    'import/order': [0],
    camelcase: [0],
  },
}
