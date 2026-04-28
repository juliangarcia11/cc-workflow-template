/** @type {import('@commitlint/types').UserConfig} */
export default {
  extends: ['@commitlint/config-conventional'],
  rules: {
    // Enforce a blank line before the body
    'body-leading-blank': [1, 'always'],
    // Keep subject line concise
    'header-max-length': [2, 'always', 100],
    // Lowercase type required
    'type-case': [2, 'always', 'lower-case'],
    // Allowed commit types — customize to match your team's conventions
    'type-enum': [
      2,
      'always',
      [
        'feat',     // New feature
        'fix',      // Bug fix
        'docs',     // Documentation only
        'style',    // Formatting, no logic change
        'refactor', // Code change that is neither fix nor feature
        'test',     // Adding or fixing tests
        'chore',    // Build process, tooling, dependencies
        'ci',       // CI/CD changes
        'perf',     // Performance improvements
        'revert',   // Revert a previous commit
      ],
    ],
  },
};
