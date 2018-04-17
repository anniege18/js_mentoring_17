const path = require('path');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

const outputPath = path.resolve(__dirname, '../assets/');
const jsBundleName = '[name].min.js';
const cssBundleName = '[name].min.css';

module.exports = {
    devtool: 'source-map',
    cache: false,
    resolve: {
        modules: [path.resolve(__dirname, '../src'), 'node_modules'],
        extensions: ['.js', '.jsx'],
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
                                minimize: true,
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
                                minimize: true,
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
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: JSON.stringify(process.env.NODE_ENV || 'production'),
            },
        }),
        new webpack.NoEmitOnErrorsPlugin(),
        new webpack.optimize.CommonsChunkPlugin({ name: 'vendor', filename: jsBundleName }),
        new webpack.optimize.UglifyJsPlugin({ compress: { warnings: false } }),
        new ExtractTextPlugin({ filename: cssBundleName, disable: false, allChunks: true }),
        new BundleAnalyzerPlugin()
    ],
};
