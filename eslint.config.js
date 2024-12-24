module.exports = [
  {
    languageOptions: {
      ecmaVersion: 2021,
      sourceType: 'commonjs',
      globals: {
        node: true,
        jest: true,
      },
    },
    plugins: {
      prettier: require('eslint-plugin-prettier'),
      node: require('eslint-plugin-node'),
      import: require('eslint-plugin-import'),
    },
    rules: {
      'prettier/prettier': 'error',
      'no-console': 'off',
    },
    ignores: ['node_modules/', 'coverage/'],
  },
];
