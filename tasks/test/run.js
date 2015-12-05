/*eslint-disable */
module.exports = function factory($, env, extraOptions) {
    var params = extraOptions || {};
    return function task(done) {
        var options = {
            reporter: env.test.report || 'spec',
            watch: params.watch || false,
            debug: params.debug || false,
            recursive: true,
            port: env.test.port
        };

        $.mochify(env.paths.tests + '/unit/**/*.js', options)
            .transform('babelify')
            .plugin('mochify-istanbul', {
                // Plugin options
                intrumenter: 'babel-istanbul',
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
