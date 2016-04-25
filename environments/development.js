import minimist from 'minimist';

const argv = minimist(process.argv.slice(2));
const tasks = argv._;
const task = tasks[0];
const watch = !task || task.indexOf('build') === -1;

export default {
    name: 'development',
    build: {
        debug: true,
        minify: false
    },
    development: {
        port: 8080,
        watch
    },
    test: {
        singleRun: false
    }
};
