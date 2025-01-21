/**
 * @file .prettierrc.js
 *
 * @version 1.0.0
 *
 * @summary Prettier Formatting Configuration File
 *
 * @description Defines consistent code styling and file formatting using
 * Prettier across the projects stack.
 *
 * @requires prettier
 *
 * @see {@link https://prettier.io/docs/en/} link to official prettier
 * documentation
 *
 * @exports {object} Prettier configuration object.
 */
export default {
    printWidth: 80,
    tabWidth: 4,
    useTabs: false,
    semi: true,
    singleQuote: true,
    quoteProps: 'consistent',
    bracketSpacing: true,
    trailingComma: 'all',
    arrowParens: 'always',
    requirePragma: false,
    insertPragma: false,
    proseWrap: 'preserve',
    endOfLine: 'lf',
    htmlWhitespaceSensitivity: 'css',
};
