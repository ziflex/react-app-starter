/*eslint-disable */
module.exports = function factory($, env) {
    return function task(done) {
        var options = {
            reporter: env.test.reporter || 'spec',
            watch: env.development.watch,
            recursive: true,
            port: env.test.port,
            cover: true
        };

        mochify(env.paths.tests, options)
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
