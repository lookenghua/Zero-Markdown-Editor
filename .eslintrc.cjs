/* jshint esversion: 11 */

const typescript = require('typescript');

module.exports = {
    root: true,
    env: {
        browser: true,
        node: true,
        es6: true,
    },
    parser: '@typescript-eslint/parser',
    plugins: ['svelte3', '@typescript-eslint'],
    overrides: [
        {
            files: ['**/*.svelte'],
            processor: 'svelte3/svelte3',
            rules: {
                '@typescript-eslint/no-unused-vars': 'off',
                'import/no-unresolved': 'off',
                'import/first': 'off',
                'import/no-duplicates': 'off',
                'import/no-mutable-exports': 'off',
                'import/extensions': 'off',
                '@typescript-eslint/no-unsafe-call': 'off'
            },
        },
    ],
    settings: {
        'svelte3/typescript': () => typescript,
        'svelte3/ignore-styles': () => true,
        'import/extensions': ['.js', '.ts'],
        'import/resolver': {
            node: {
                extensions: ['.js', '.ts'],
            },
            typescript: {},
        },
    },
    parserOptions: {
        tsconfigRootDir: __dirname,
        project: ['./tsconfig.json'],
        extraFileExtensions: ['.svelte'],
        sourceType: 'module',
        ecmaVersion: 2020,
    },
    extends: [
        'eslint:recommended',
        'plugin:@typescript-eslint/recommended',
        'plugin:@typescript-eslint/recommended-requiring-type-checking'
    ],
    rules: {
        'no-console': ['warn', {allow: ['warn', 'error', 'info']}],
        'tsdoc/syntax': 'warn',
        'import/no-extraneous-dependencies': ['error', {devDependencies: true}],
        'import/prefer-default-export': 'off',
        'import/no-mutable-exports': 0,
        'no-labels': 0,
        'no-restricted-syntax': 0,
        'no-restricted-exports': 0,
        'no-return-assign': 0,
        '@typescript-eslint/no-floating-promises': 0,
        'no-unused-labels': 0,
        '@typescript-eslint/no-unsafe-assignment': 0
    },
    ignorePatterns: ['*.cjs', 'static/*.js', 'svelte.config.js', 'scripts/js/*.ts', 'vite.config.ts', "src/lib/plugin/**/*.js", "dist/*.js"],
};