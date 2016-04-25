import path from 'path';

export default function factory($, env) {
    return function task() {
        return $.gulp.src(path.join(env.paths.input.scripts, '/**/*.js'))
            .pipe($.eslint())
            .pipe($.eslint.format('stylish'))
            .pipe($.eslint.failAfterError());
    };
}
