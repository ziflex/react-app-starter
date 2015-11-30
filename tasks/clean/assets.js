/*eslint-disable */
module.exports = function factory($, env) {
    return function task(done) {
        return $.delete([env.paths.output.assets], done);
    };
};
/*eslint-enable */
