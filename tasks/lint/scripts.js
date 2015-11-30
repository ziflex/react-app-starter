/*eslint-disable */
module.exports = function factory($, env) {
    return function task() {
        return $.gulp.src([env.paths.input.scripts + '/**/*.js'])
            .pipe($.eslint())
            .pipe($.eslint.format('stylish'))
            .pipe($.eslint.failAfterError());
    };
};
/*eslint-enable */
