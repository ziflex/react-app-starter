/*eslint-disable */
var path = require('path');
var runSequence = require('run-sequence');
var $ = require('gulp-load-plugins')({
    pattern: [
        'gulp',
        'gulp-*',
        'gulp.*',
        'merge-stream',
        'del',
        'browserify',
        'watchify',
        'vinyl-source-stream',
        'vinyl-transform',
        'vinyl-buffer',
        'glob',
        'lodash',
        'less-plugin-*'
    ],
    replaceString: /^gulp(-|\.)/,
    rename: {
        'merge-stream': 'mergeStream',
        'del': 'delete'
    }
});

var env = require('env-manager')({
    argv: process.argv,
    dir: path.join(__dirname, 'environments'),
    base: 'base.js',
    pattern: '{env}.js',
    defaults: {
        'env': 'dev'
    }
});

require('gulp-tasks-registrator')({
    gulp: $.gulp,
    dir: path.join(__dirname, 'tasks'),
    args: [$, env],
    verbose: true,
    panic: true
});

$.gulp.task('clean', function task(done) {
    return runSequence('clean:assets', 'clean:html', 'clean:scripts', 'clean:styles', done);
});

$.gulp.task('lint', ['lint:scripts'], function task(done) {
    done();
});

$.gulp.task('build', function task(done) {
    return runSequence(
        'lint',
        'clean',
        [
            'build:scripts',
            'build:styles',
            'build:assets'
        ],
        'build:html',
        done
    );
});

$.gulp.task('doc', function task(done) {
    return runSequence('clean:doc', 'build:doc', done);
});

$.gulp.task('default', function task(done) {
    runSequence('build', ['serve', 'watch'], done);
});

/*eslint-enable */
