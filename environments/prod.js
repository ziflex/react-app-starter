/*eslint-disable */
process.env.NODE_ENV = 'production';

module.exports = {
    name: 'prod',
    build: {
        debug: false,
        minify: true
    },
    test: {
        singleRun: true
    }
};
/*eslint-enable */
