/*eslint-env node*/

const CopyPlugin = require('copy-webpack-plugin');
const dotenv = require('dotenv');
const NodePolyfillPlugin = require('node-polyfill-webpack-plugin');
const webpack = require('webpack');

const path = require('path');

module.exports = env => {
    return {
        entry: './src/client/index.tsx',
        output: {
            filename: 'bundle.js',
            path: path.resolve(__dirname, 'build')
        },
        resolve: {
            extensions: ['.ts', '.tsx', '.js']
        },
        mode: 'production',
        devServer: {
            port: 3000,
            historyApiFallback: true
        },
        module: {
            rules: [
                {
                    test: /\.tsx?$/,
                    loader: 'ts-loader'
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
