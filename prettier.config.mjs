/**
 * @see https://prettier.io/docs/configuration
 * @type {import("prettier").Config}
 */
const config = {
  singleQuote: true,
  arrowParens: 'always',
  printWidth: 100,
  tabWidth: 2,
  useTabs: false,
  plugins: ['prettier-plugin-tailwindcss'],
};

export default config;
