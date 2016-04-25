import path from 'path';

export default function factory($, env) {
    return function task() {
        return $.gulp
            .src(path.join(env.paths.tests, '/unit/**/*.js'), { read: false })
            .pipe($.mocha({
                reporter: env.test.report || 'spec',
                recursive: true,
                port: env.test.port
            }));
    };
}
