module.exports = function (api) {
    api.cache(true);
    return {
        presets: ['babel-preset-expo', ['@babel/preset-env', { targets: { node: 'current' }, modules: false }]],
        plugins: [
            '@babel/plugin-transform-runtime',
            'babel-plugin-transform-import-meta',
            'babel-plugin-transform-vite-meta-env',
            'import-graphql'
        ]
    };
};
