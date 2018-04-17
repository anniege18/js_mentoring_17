module.exports = {
    "extends": "airbnb-base",
    "env": {
        "browser": true,
        "es6": true,
        "jest": true
    },
    rules: {
        'no-unused-vars': 0,
        'import/extensions': 0,
        'import/no-unresolved': 0,
        'no-plusplus': 0,
        'radix': 0,
        'no-restricted-globals': 0
    },
    parser: 'babel-eslint',
    plugins: ['react'],
};