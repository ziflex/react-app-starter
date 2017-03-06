import path from 'path';
import runSequence from 'run-sequence';
import loadPlugins from 'gulp-load-plugins';
import getEnv from 'env-manager';
import registerTasks from 'gulp-tasks-registrator';
import Logger from './tools/logger';

const $ = loadPlugins({
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
        'mochify'
    ],
    replaceString: /^gulp(-|\.)/,
    rename: {
        'merge-stream': 'mergeStream',
        del: 'delete'
    }
});

const env = getEnv({
    argv: process.argv,
    dir: path.join(__dirname, 'environments'),
    base: 'base.js',
    pattern: '{env}.js',
    defaults: {
        env: 'development'
    }
});

$.logger = Logger();
$.logger.info('Running in', env.name, 'environment');

registerTasks({
    gulp: $.gulp,
    dir: path.join(__dirname, 'tasks'),
    args: [$, env],
    verbose: true,
    panic: true,
    group: true
});

$.gulp.task('build', (done) => {
    return runSequence(
        'lint',
        'test',
        'clean',
        [
            'build:scripts',
            'build:styles',
            'build:fonts'
        ],
        'build:html',
        done
    );
});

$.gulp.task('doc', (done) => {
    return runSequence('clean:doc', 'build:doc', done);
});

$.gulp.task('default', (done) => {
    runSequence('build', ['serve', 'watch'], done);
});
