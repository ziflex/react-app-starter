import composeClass from 'compose-class';
import Symbol from 'es6-symbol';
import get from 'lodash/get';
import defaults from 'lodash/defaults';

const DEFAULT_LOG = console;
const DEFAULT_PREFIX = '';
const DEFAULT_OPTIONS = {
    prefix: DEFAULT_PREFIX,
    debug: false
};

const FIELDS = {
    log: Symbol('log'),
    options: Symbol('options')
};

const Logger = composeClass({
    constructor(log = DEFAULT_LOG, options = {}) {
        this[FIELDS.log] = log;
        this[FIELDS.options] = defaults(options, DEFAULT_OPTIONS);
    },
    log(...args) {
        const prefix = get(this[FIELDS.options], 'prefix', DEFAULT_PREFIX);
        const log = this[FIELDS.log];
        log.log(prefix, ...args);
    },

    warn(...args) {
        const prefix = get(this[FIELDS.options], 'prefix', DEFAULT_PREFIX);
        const log = this[FIELDS.log];
        log.warn(prefix, ...args);
    },

    info(...args) {
        const prefix = get(this[FIELDS.options], 'prefix', DEFAULT_PREFIX);
        const log = this[FIELDS.log];
        log.info(prefix, ...args);
    },

    error(...args) {
        const prefix = get(this[FIELDS.options], 'prefix', DEFAULT_PREFIX);
        const log = this[FIELDS.log];
        log.error(prefix, ...args);
    },

    success(...args) {
        const prefix = get(this[FIELDS.options], 'prefix', DEFAULT_PREFIX);
        const log = this[FIELDS.log];
        log.log(prefix, ...args);
    },

    debug(...args) {
        const options = this[FIELDS.options];

        if (options.debug) {
            const prefix = get(options, 'prefix', DEFAULT_PREFIX);
            const log = this[FIELDS.log];
            log.log(prefix, '[DEBUG]', ...args);
        }
    }
});

export default function create(...args) {
    return new Logger(...args);
}
