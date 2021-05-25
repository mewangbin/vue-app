module.exports = {
  root: true,
  env: {
    node: true,
    browser: true,
    es2015: true
  },
  extends: ['eslint:recommended', 'plugin:vue/vue3-strongly-recommended', 'plugin:prettier/recommended'],
  parserOptions: {
    ecmaVersion: 2015,
    sourceType: 'module'
  },
  plugins: ['vue', 'prettier', 'html'],
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off'
  }
}
