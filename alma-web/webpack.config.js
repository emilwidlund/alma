const path = require('path');
const webpack = require('webpack');
const CopyPlugin = require('copy-webpack-plugin');
const dotenv = require('dotenv');

module.exports = env => ({
    entry: './src/client/index.tsx',
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'build')
    },
    devtool: 'source-map',
    resolve: {
        extensions: ['.ts', '.tsx', '.js']
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
});
