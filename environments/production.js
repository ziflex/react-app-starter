process.env.NODE_ENV = 'production';

export default {
    name: 'prod',
    build: {
        debug: false,
        minify: true
    },
    test: {
        singleRun: true
    }
};
