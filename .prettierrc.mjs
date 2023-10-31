/** @type {import('prettier').Config} */
export default {
  semi: false,
  tabWidth: 2,
  printWidth: 100,
  endOfLine: 'auto',
  singleQuote: true,
  proseWrap: 'never',
  jsxSingleQuote: true,
  arrowParens: 'avoid',
  singleAttributePerLine: true,
  plugins: [
    //
    'prettier-plugin-tailwindcss',
    'prettier-plugin-sh',
  ],
}
