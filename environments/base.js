/*eslint-disable */
var path = require('path');

var ROOT_DIR = path.resolve(__dirname, '..');
var SRC_DIR = path.join(ROOT_DIR, 'src');
var DIST_DIR = path.join(ROOT_DIR, 'dist');

module.exports = {
    name: 'base',
    build: {
        debug: false,
        minify: true
    },
    development: {
        port: 8080,
        watch: false
    },
    test: {
        port: 9000,
        report: 'spec'
    },
    coverage: {
        report: ['text', 'cobertura', 'json']
    },
    paths: {
        tests: path.join(ROOT_DIR, 'test'),
        coverage: path.join(ROOT_DIR, 'coverage'),
        input: {
            root: SRC_DIR,
            assets: path.join(SRC_DIR, 'assets'),
            scripts: path.join(SRC_DIR, 'scripts'),
            styles: path.join(SRC_DIR, 'styles'),
            html: SRC_DIR
        },
        output: {
            root: DIST_DIR,
            assets: path.join(DIST_DIR, 'assets'),
            scripts: path.join(DIST_DIR, 'scripts'),
            styles: path.join(DIST_DIR, 'styles'),
            html: DIST_DIR,
            docs: ROOT_DIR
        }
    }
};
/*eslint-enable */
