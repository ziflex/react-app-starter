/*eslint-disable */
module.exports = function factory($, env) {
    return function task() {
        return $.gulp.src(env.paths.input.styles + '/**/*.less')
            .pipe($.lessImport('app.less'))
            .pipe($.less())
            .pipe($.if(env.build.minify, $.minifyCss()))
            .pipe($.autoprefixer({
                browsers: ['last 2 versions'],
                cascade: false
            }))
            .pipe($.gulp.dest(env.paths.output.styles));
    };
};
/*eslint-enable */
