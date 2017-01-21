/* eslint-disable global-require, import/no-extraneous-dependencies */
import path from 'path';
import fs from 'fs';
import mkdir from 'mkdirp';

export default function factory($, env) {
    function getJSONFromCssModules(input, output) {
        return function getJSON(cssFileName, json) {
            if (path.dirname(cssFileName) !== input) {
                return;
            }

            const cssName = cssFileName
                                    .replace(input, output)
                                    .replace('.css', '');
            const jsonFileName = `${cssName}.json`;
            mkdir.sync(path.dirname(jsonFileName));
            fs.writeFileSync(jsonFileName, JSON.stringify(json));
        };
    }

    return function task(done) {
        return $.gulp.src([
            path.join(env.paths.input.styles, '/**/*.css'),
            path.join(env.paths.input.scripts, '/**/*.css')
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
            require('laggard'),
            require('postcss-modules')({
                getJSON: getJSONFromCssModules(env.paths.input.scripts, env.paths.output.scripts),
                globalModulePaths: [
                    env.paths.input.styles,
                    path.join(env.paths.root, 'node_modules')
                ]
            })
        ]))
        .pipe($.if(env.build.minify, $.cssnano()))
        .pipe($.concat('bundle.css'))
        .pipe($.gulp.dest(env.paths.output.styles))
        .on('error', done);
    };
}
