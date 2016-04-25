export default function factory($, env) {
    return function task() {
        const target = $.gulp.src(env.paths.input.html + '/index.html');
        const sources = $.gulp.src([
            env.paths.output.scripts + '/**/*.js',
            env.paths.output.styles + '/**/*.css'
        ], { read: false });

        return target
            .pipe($.inject(sources, {
                ignorePath: 'dist',
                addRootSlash: true
            }))
            .pipe($.gulp.dest(env.paths.output.html));
    };
}
