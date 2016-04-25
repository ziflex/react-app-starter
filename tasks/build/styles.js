import path from 'path';

export default function factory($, env) {
    return function task(done) {
        return $.gulp.src(path.join(env.paths.input.styles, '/**/*.css'))
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
              require('autoprefixer')({ browsers: ['last 2 versions'] })
          ]))
          .pipe($.gulp.dest(env.paths.output.styles))
          .on('error', done);
    };
}
