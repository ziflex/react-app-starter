export default function factory($, env) {
    return function task(done) {
        if (env.development.watch) {
            $.gulp.watch(env.paths.input.styles + '/**/*.less', ['build:styles']);
            $.gulp.watch(env.paths.input.html + '/**/*.html', ['build:html']);
        } else {
            done();
        }
    };
}
