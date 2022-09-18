module.exports = {
    extends: [
        'eslint:recommended',
        'plugin:@typescript-eslint/recommended',
        'plugin:import/recommended',
        'plugin:import/typescript',
        'prettier'
    ],
    parser: '@typescript-eslint/parser',
    plugins: ['@typescript-eslint'],
    root: true,
    settings: {
        'import/resolver': {
            typescript: true,
            node: true
        }
    },
    rules: {
        'import/order': [1, { groups: ['external', 'builtin', 'internal', 'sibling', 'parent', 'index'] }]
    }
};
