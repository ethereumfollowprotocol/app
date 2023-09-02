/** @type {import('eslint').Linter.Config} */
module.exports = {
  root: true,
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    warnOnUnsupportedTypeScriptVersion: true,
  },
  env: { node: true, browser: true },
  reportUnusedDisableDirectives: true,
  extends: [
    'eslint:recommended',
    'plugin:unicorn/all',
    'plugin:yml/standard',
    'plugin:@typescript-eslint/recommended',
    'prettier',
  ],
  plugins: ['@typescript-eslint', 'prettier'],
  settings: {},
  overrides: [
    {
      files: ['*.yaml', '*.yml'],
      parser: 'yaml-eslint-parser',
      rules: {
        'yml/quotes': ['off'],
      },
    },
    {
      files: ['*.toml'],
      parser: 'toml-eslint-parser',
    },
  ],
  rules: {
    'prettier/prettier': [
      'warn',
      {},
      {
        usePrettierrc: true,
        fileInfoOptions: {
          withNodeModules: true,
        },
      },
    ],
    'array-element-newline': ['error', 'consistent'],
    'object-curly-spacing': ['error', 'always'],
    'no-mixed-operators': ['off'],
    'no-multiple-empty-lines': ['off'],
    'no-unexpected-multiline': ['off'],
    'unicorn/no-await-expression-member': ['off'],
    'unicorn/filename-case': ['off'],
    'unicorn/no-array-reduce': ['off'],
    'unicorn/numeric-separators-style': ['error', { number: { minimumDigits: 4 } }],
    'unicorn/no-array-callback-reference': ['off'],
    'unicorn/prefer-top-level-await': ['off'],
    'unicorn/no-array-for-each': ['off'],
    'unicorn/prefer-event-target': ['off'],
    'unicorn/prevent-abbreviations': [
      'error',
      {
        allowList: {
          Env: true,
          ProcessEnv: true,
        },
        checkFilenames: false,
      },
    ],
    '@typescript-eslint/no-var-requires': ['off'],
    '@typescript-eslint/consistent-type-definitions': ['error', 'interface'],
    '@typescript-eslint/no-import-type-side-effects': ['error'],
    '@typescript-eslint/explicit-module-boundary-types': 'off',
    '@typescript-eslint/no-unused-vars': [
      'warn',
      {
        argsIgnorePattern: '^_',
        varsIgnorePattern: '^(?:_.*|NodeJS|ProcessEnv)$',
        caughtErrorsIgnorePattern: '^_',
      },
    ],
    '@typescript-eslint/consistent-type-imports': ['warn', { prefer: 'type-imports' }],
    '@typescript-eslint/ban-ts-comment': ['off'],
    '@typescript-eslint/no-empty-interface': ['error', { allowSingleExtends: true }],
    '@typescript-eslint/ban-types': [
      'warn',
      {
        types: {
          '{}': false,
          Number: false,
          String: false,
        },
      },
    ],
  },
}
