export default function factory($, env) {
    return function task() {
        return $.gulp.src(env.paths.input.fonts)
            .pipe($.gulp.dest(env.paths.output.fonts));
    };
}
