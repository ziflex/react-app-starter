import _ from 'lodash';

_.set(process, 'env.NODE_ENV', 'production');

export default {
    name: 'production',
    build: {
        debug: false,
        minify: true
    },
    test: {
        singleRun: true
    }
};
