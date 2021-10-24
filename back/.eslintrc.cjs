module.exports = {
    env: {
        es2021: true,
        node: true,
    },
    plugins: ['prettier'],
    extends: [
        'eslint:recommended',
        'airbnb-base',
        'plugin:prettier/recommended',
    ],
    parserOptions: {
        ecmaVersion: 13,
        sourceType: 'module',
    },
    rules: {
        "no-unused-vars": "warn",
        'prettier/prettier': 'error',
    },
};
