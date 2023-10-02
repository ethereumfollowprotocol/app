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
    'eslint-config-turbo',
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
      files: ['*.jsx', '*.tsx'],
      extends: ['eslint:recommended', 'next'],
      rules: {
        'no-unused-vars': ['warn'],
      },
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
    'unicorn/no-null': ['off'],

    'unicorn/no-array-for-each': ['off'],
    'unicorn/no-keyword-prefix': [
      'error',
      {
        disallowedPrefixes: ['new', 'for'],
      },
    ],
    'unicorn/prefer-event-target': ['off'],
    'unicorn/prevent-abbreviations': [
      'error',
      {
        allowList: {
          props: true,
          ProcessEnv: true,
        },
        checkFilenames: false,
      },
    ],
    '@typescript-eslint/no-var-requires': ['off'],
    '@typescript-eslint/triple-slash-reference': ['off'],
    '@typescript-eslint/consistent-type-definitions': ['error', 'interface'],
    '@typescript-eslint/no-import-type-side-effects': ['error'],
    '@typescript-eslint/explicit-module-boundary-types': ['off'],
    'no-unused-vars': [
      'warn',
      {
        argsIgnorePattern: '^_',
        varsIgnorePattern: '^(?:_.*|NodeJS|ProcessEnv)$',
        caughtErrorsIgnorePattern: '^_',
      },
    ],
    '@typescript-eslint/no-unused-vars':
      process.env.NODE_ENV === 'production'
        ? [
            'warn',
            {
              argsIgnorePattern: '^_',
              varsIgnorePattern: '^(?:_.*|NodeJS|ProcessEnv)$',
              caughtErrorsIgnorePattern: '^_',
            },
          ]
        : ['off'],
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
