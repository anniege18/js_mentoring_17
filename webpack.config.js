'use strict';

const webpackDevConfig = require('./webpack/webpack.config.dev');
const webpackProdConfig = require('./webpack/webpack.config.prod');

const ENV_PRODUCTION = 'production';
const ENV_DEVELOPMENT = 'development';

const NODE_ENV = process.env.NODE_ENV || ENV_DEVELOPMENT;

function config(env) {
    switch (env) {
        case ENV_DEVELOPMENT:
            return webpackDevConfig;
        case ENV_PRODUCTION:
            return webpackProdConfig;
        default:
            return webpackDevConfig;
    }
}

module.exports = config(NODE_ENV);
