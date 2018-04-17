'use strict';

const path = require('path');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

const outputPath = path.resolve(__dirname, '../public/');
const jsBundleName = '[name].min.js';
const cssBundleName = '[name].min.css';

module.exports = {
    devtool: 'cheap-inline-source-map',
    cache: true,
    resolve: {
        modules: [path.resolve(__dirname, '../src'), 'node_modules'],
        extensions: ['.js', '.jsx', '.scss'],
    },
    entry: {
        main: ['babel-polyfill', './src/js/index'],
        vendor: [
            'react',
            'react-dom',
        ],
    },
    output: {
        path: outputPath,
        filename: jsBundleName,
    },
    module: {
        rules: [
            {
                test: /\.jsx?$/,
                include: path.resolve(__dirname, '../src/js'),
                exclude: /node_modules/,
                use: [
                    {
                        loader: 'babel-loader',
                    },
                ],
            },
            {
                test: /\.scss$/,
                include: path.resolve(__dirname, '../src/css'),
                loader: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: [
                        {
                            loader: 'css-loader',
                            options: {
                                sourceMap: true,
                            },
                        },
                        {
                            loader: 'sass-loader',
                            options: {
                                sourceMap: true,
                                includePaths: [path.resolve(__dirname, '../src/css')],
                            },
                        },
                    ],
                }),
            },
            {
                test: /\.scss$/,
                include: path.resolve(__dirname, '../src/js'),
                loader: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: [
                        {
                            loader: 'css-loader',
                            options: {
                                modules: true,
                                importLoaders: 1,
                                localIdentName: '[name]__[local]___[hash:base64:5]',
                                sourceMap: true,
                            },
                        },
                        {
                            loader: 'sass-loader',
                            options: {
                                sourceMap: true,
                                includePaths: [path.resolve(__dirname, '../src/css')],
                            },
                        },
                    ],
                }),
            },
            {
                test: /\.css$/,
                loader: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: [
                        {
                            loader: 'css-loader',
                            options: {
                                sourceMap: true,
                            },
                        },
                    ],
                }),
            },
            {
                test: /\.(woff|woff2|ttf|eot)/,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            prefix: 'fonts/',
                            name: 'fonts/[name].[ext]',
                        },
                    },
                ],
            },
            {
                test: /\.(jpe?g|png|gif)$/i,
                use: [
                    {
                        loader: 'url-loader',
                        options: {
                            limit: 8192,
                            name: 'img/[name].[ext]',
                        },
                    },
                ],
            },
        ],
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin(),
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: JSON.stringify(process.env.NODE_ENV || 'development'),
            },
        }),
        new webpack.NoEmitOnErrorsPlugin(),
        new webpack.optimize.CommonsChunkPlugin({
            name: 'vendor',
            filename: jsBundleName,
        }),
        new ExtractTextPlugin({ filename: cssBundleName, disable: true, allChunks: true, }),
    ],
    devServer: {
        inline: true,
        hot: true,
        contentBase: path.resolve(__dirname, './../public'),
        historyApiFallback: true,
        port: 3001,
        proxy: {
            '/api': {
                target: 'http://localhost:8080',
                secure: false
            }
        }
    },
};
