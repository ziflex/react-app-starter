/*eslint-disable */
module.exports = function factory($, env) {
    return function task() {
        return $.gulp.src([env.paths.input.assets + '/**/*.*'])
            .pipe($.gulp.dest(env.paths.output.assets));
    };
};
/*eslint-enable */
