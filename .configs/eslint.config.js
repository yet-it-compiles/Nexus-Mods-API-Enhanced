/**
 * @file eslint.config.js
 *
 * @version 1.0.0
 *
 * @summary eslint linting configuration file.
 *
 * @description defines the code styling and file formatting configuration
 * across the projects stack using eslint and integrated prettier.
 *
 * @requires js - eslint's default configuration for javascript.
 * @requires pluginnode - eslint plugin for node.js-specific linting rules.
 * @requires pluginimport - eslint plugin for import/export linting rules.
 * @requires prettierConfig - eslint configuration for prettier-specific rules.
 * @requires prettierplugin - eslint plugin for prettier-specific linting rules.
 *
 * @see {@link https://eslint.org/docs/latest/} link to official eslint
 * documentation
 *
 * @exports object - eslint configuration object
 */
import js from '@eslint/js';
import pluginnode from 'eslint-plugin-node';
import pluginimport from 'eslint-plugin-import';
import prettierConfig from 'eslint-config-prettier';
import prettierplugin from 'eslint-plugin-prettier';

export default [
    prettierConfig,
    js.configs.recommended,
    {
        files: ['**/*.{js,jsx,mjs,cjs}'],
        ignores: ['node_modules/**', 'dist/**', '**/*.min.js'],
        languageOptions: {
            ecmaVersion: 'latest',
            sourceType: 'module',
            globals: {
                global: 'readonly',
                window: 'readonly',
                console: 'readonly',
                document: 'readonly',
                process: 'readonly',
            },
        },
        plugins: {
            node: pluginnode,
            import: pluginimport,
            prettier: prettierplugin,
        },
        rules: {
            'indent': ['error', 4],
            'prettier/prettier': 'error',
            'consistent-return': 'error',
            'eqeqeq': ['error', 'always'],
            'arrow-body-style': ['error', 'as-needed'],
            'import/order': [
                'error',
                {
                    'groups': [
                        'builtin',
                        'external',
                        'internal',
                        'parent',
                        'sibling',
                        'index',
                    ],
                    'newlines-between': 'always',
                },
            ],
        },
    },
];
