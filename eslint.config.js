// eslint.config.js
// [CUSTOMIZE] Add framework-specific plugins here (e.g. eslint-plugin-react)
export default [
  {
    ignores: ['node_modules/**', 'dist/**', 'build/**', 'coverage/**'],
  },
  {
    rules: {
      // Start minimal — add rules as your project needs them
      'no-unused-vars': 'warn',
      'no-console': 'warn',
      'prefer-const': 'error',
    },
  },
];
