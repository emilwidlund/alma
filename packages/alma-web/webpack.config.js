/*eslint-env node*/

const CopyPlugin = require('copy-webpack-plugin');
const dotenv = require('dotenv');
const NodePolyfillPlugin = require('node-polyfill-webpack-plugin');
const path = require('path');
const webpack = require('webpack');

module.exports = env => {
    return {
        entry: './src/client/index.tsx',
        output: {
            filename: 'bundle.js',
            path: path.resolve(__dirname, 'build')
        },
        resolve: {
            extensions: ['.ts', '.tsx', '.js', '.json']
        },
        mode: 'production',
        devServer: {
            port: 3000,
            historyApiFallback: true,
            compress: true,
            allowedHosts: 'all',
            https: true
        },
        module: {
            rules: [
                {
                    test: /\.tsx?$/,
                    loader: 'ts-loader'
                },
                {
                    test: /\.(graphql|gql)$/,
                    exclude: /node_modules/,
                    loader: 'graphql-tag/loader'
                }
            ]
        },
        plugins: [
            new CopyPlugin({
                patterns: [{ from: 'src/client/templates' }, { from: 'src/client/assets', to: 'assets' }]
            }),
            new webpack.DefinePlugin({
                process: {
                    env: JSON.stringify({ ...dotenv.config().parsed, ...env })
                }
            }),
            new NodePolyfillPlugin()
        ]
    };
};
