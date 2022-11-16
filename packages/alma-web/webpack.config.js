/*eslint-env node*/

const CopyPlugin = require('copy-webpack-plugin');
const dotenv = require('dotenv');
const webpack = require('webpack');

const path = require('path');

module.exports = env => {
    return {
        entry: './src/client/index.tsx',
        output: {
            filename: 'bundle.js',
            path: path.resolve(__dirname, 'build')
        },
        devtool: 'inline-source-map',
        resolve: {
            extensions: ['.ts', '.tsx', '.js'],
            alias: {
                '@thi.ng/shader-ast-glsl/target': path.resolve(
                    __dirname,
                    '../../',
                    'node_modules/alma-glsl/build/core/Target/Target.js'
                )
            }
        },
        mode: 'development',
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
                patterns: [{ from: 'src/client/templates' }]
            }),
            new webpack.DefinePlugin({
                process: {
                    env: JSON.stringify({ ...dotenv.config().parsed, ...env })
                }
            })
        ]
    };
};
