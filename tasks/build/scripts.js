/*eslint-disable */
module.exports = function factory($, env) {
    var customOpts = {
        entries: [env.paths.input.scripts + '/boot.js'],
        debug: env.build.debug
    };
    var opts = $.lodash.assign({}, $.watchify.args, customOpts);
    var b;

    if (env.development.watch) {
        b = $.watchify($.browserify(opts));
    } else {
        b = $.browserify(opts);
    }

    function bundle() {
        return b
            .bundle()
            .on('error', function(err) {
                $.util.log($.util.colors.red(err.toString()));
                process.exit(1);
            })
            .pipe($.vinylSourceStream('app.js'))
            .pipe($.vinylBuffer())
            .pipe($.if(env.build.minify, $.uglify()))
            .pipe($.gulp.dest(env.paths.output.scripts));
    }

    b.on('update', bundle); // on any dep update, runs the bundler
    b.on('log', $.util.log); // output build logs to terminal

    return bundle;
};
/*eslint-enable */
