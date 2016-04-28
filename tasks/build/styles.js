import path from 'path';
import fs from 'fs';
import mkdir from 'mkdirp';

function modules($, env) {
    function getJSONFromCssModules(input, output) {
        return function getJSON(cssFileName, json) {
            const cssName = cssFileName
                                    .replace(input, output)
                                    .replace('.css', '');
            const jsonFileName = `${cssName}.json`;
            mkdir.sync(path.dirname(jsonFileName));
            fs.writeFileSync(jsonFileName, JSON.stringify(json));
        };
    }

    return $.gulp.src(path.join(env.paths.input.scripts, '/**/*.css'))
        .pipe($.postcss([
            require('postcss-assets')({
                relative: true
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
                getJSON: getJSONFromCssModules(env.paths.input.scripts, env.paths.output.scripts)
            })
        ]));
}

function global($, env) {
    return $.gulp.src(env.paths.input.styles);
}

export default function factory($, env) {
    return function task(done) {
        return $.mergeStream(
            global($, env),
            modules($, env)
        )
        .pipe($.if(env.build.minify, $.cssnano()))
        .pipe($.concat('bundle.css'))
        .pipe($.gulp.dest(env.paths.output.styles))
        .on('error', done);
    };
}
