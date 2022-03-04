module.exports = {
    env: {
        browser: true,
        es2021: true,
    },
    parser: '@typescript-eslint/parser',
    extends: [
        "eslint-config-prettier",
        'eslint:recommended',
        'plugin:@typescript-eslint/recommended'
    ],
    parserOptions: {
        ecmaVersion: "latest",
        sourceType: 'module',
        tsconfigRootDir: __dirname,
        project: ['./tsconfig.json'],
        extraFileExtensions: ['.svelte','.cjs']
    },
    rules: {
        'prettier/prettier': 'error',
    },
    overrides: [
        {
            files: ['*.svelte'],
            processor: 'svelte3/svelte3',
        },
    ],
    settings: {
        'svelte3/typescript': () => require('typescript'), // pass the TypeScript package to the Svelte plugin
    },
    plugins: ["eslint-plugin-prettier", '@typescript-eslint','svelte3',],
    ignorePatterns: ['node_modules','svelte.config.js','commitlint.config.cjs','.cz-config.js']
}
