/*eslint-disable */
module.exports = function factory($, env, extraOptions) {
    var params = extraOptions || {};
    return function task(done) {
        var options = {
            reporter: env.test.report || 'spec',
            watch: params.watch || false,
            debug: params.debug || false,
            cover: params.cover || false,
            recursive: true,
            port: env.test.port
        };

        var units = env.paths.tests + '/**/*.js';

        $.mochify(units, options)
            .transform('babelify')
            .plugin('mochify-istanbul', {
                // Plugin options
                instrumenter: 'babel-istanbul',
                exclude: [units, '**/node_modules/**/*'],
                // Reporter options
                report: env.coverage.report,
                dir: env.paths.coverage
            })
            .on('error', function (err) {
                done(err);
            })
            .on('end', function () {
                done();
            })
            .bundle(); // bundle at the VERY end after listeners
    };
};
/*eslint-enable */
