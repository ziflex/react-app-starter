/* eslint-disable global-require, import/no-extraneous-dependencies */
import path from 'path';

export default function factory($, env) {
    return function task(done) {
        return $.gulp.src([
            path.join(env.paths.input.styles, '/**/*.css')
        ])
        .pipe($.postcss([
            require('postcss-assets')({
                relative: true,
                loadPaths: [path.join(env.paths.root, 'node_modules')]
            }),
            require('postcss-import'),
            require('postcss-each'),
            require('postcss-mixins'),
            require('postcss-nested'),
            require('postcss-reference'),
            require('postcss-simple-vars'),
            require('css-mqpacker'),
            require('autoprefixer')({ browsers: ['last 2 versions'] }),
            require('laggard')
        ]))
        .pipe($.if(env.build.minify, $.cssnano()))
        .pipe($.concat('global.css'))
        .pipe($.gulp.dest(env.paths.output.styles))
        .on('error', done);
    };
}
