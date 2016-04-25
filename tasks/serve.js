export default function factory($, env) {
    return function task() {
        return $.gulp.src(env.paths.output.root)
            .pipe($.webserver({
                livereload: true,
                open: false,
                port: env.development.port || 8000,
                fallback: 'index.html'
            }));
    };
}
