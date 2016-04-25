export default function factory($, env) {
    return function task() {
        return $.gulp.src(env.paths.input.scripts )
            .pipe($.esdoc({
                destination: env.paths.doc
            }));
    };
}
