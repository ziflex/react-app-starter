/*eslint-disable */
var testTaskFactory = require('./run');

module.exports = function factory($, env) {
    return testTaskFactory($, env, {debug: true, watch: true});
};
/*eslint-enable */
