import path from 'path';

const ROOT_DIR = path.resolve(__dirname, '..');
const SRC_DIR = path.join(ROOT_DIR, 'src');
const DIST_DIR = path.join(ROOT_DIR, 'dist');

export default {
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
        report: ['text', 'html', 'json']
    },
    paths: {
        root: ROOT_DIR,
        tests: path.join(ROOT_DIR, 'test'),
        coverage: path.join(ROOT_DIR, 'coverage'),
        doc: path.join(ROOT_DIR, 'doc'),
        input: {
            root: SRC_DIR,
            assets: path.join(SRC_DIR, 'assets'),
            scripts: path.join(SRC_DIR, 'scripts'),
            fonts: [
                path.join(ROOT_DIR, 'node_modules/font-awesome/fonts/**.*')
            ],
            styles: path.join(SRC_DIR, 'styles'),
            html: SRC_DIR
        },
        output: {
            root: DIST_DIR,
            assets: path.join(DIST_DIR, 'assets'),
            scripts: path.join(DIST_DIR, 'scripts'),
            fonts: path.join(DIST_DIR, 'fonts'),
            styles: path.join(DIST_DIR, 'styles'),
            html: DIST_DIR
        }
    }
};
