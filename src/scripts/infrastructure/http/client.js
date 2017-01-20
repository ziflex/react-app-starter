import composeClass from 'compose-class';
import superagent from 'superagent';
import Promise from 'bluebird';
import Symbol from 'es6-symbol';
import isEmpty from 'lodash/isEmpty';
import forEach from 'lodash/forEach';
import uuid from 'uuid';
import EventEmitter from 'eventemitter3';
import ObservableMixin from 'observable-mixin';
import HttpEvents from './events';

const FIELDS = {
    emitter: Symbol('emitter')
};

/**
 * Represents low-lever http service for communication with external services via AJAX.
 * @class
 */
const HttpClient = composeClass({
    mixins: [
        ObservableMixin(FIELDS.emitter)
    ],

    /**
     * Creates new instance of HttpClient.
     * @constructor
     */
    constructor() {
        this[FIELDS.emitter] = new EventEmitter();
    },

    /**
     * Executes AJAX request.
     * @param {any} options - Request options. Required.
     * @param {string} options.url - Target url. Required.
     * @param {string} options.method - Http method type. (GET, POST, PUT, DELETE) Required.
     * @param {object} options.params - Query parameters. Optional.
     * @param {object} options.data - Data to send for POST/PUT requests.
     * @param {object} options.headers - Request headers. Optional.
     * @returns {Promise}
     */
    execute(options = {}) {
        return Promise.fromCallback((done) => {
            const methodType = (options.method === 'DELETE' ? 'DEL' : (options.method || '')).toLowerCase();
            const method = superagent[methodType];

            if (!method) {
                done(new Error(`Unsupported http method: ${options.method}`));
                return;
            }

            if (isEmpty(options.url)) {
                done(new Error('Empty url'));
                return;
            }

            const request = method.call(superagent, options.url);

            if (options.headers) {
                forEach(options.headers, (value, key) => request.set(key, value));
            }

            if (!options.headers || !options.headers.Accept) {
                request.set('Accept', 'application/json; charset=utf-8');
            }

            if (!options.headers || !options.headers['Content-Type']) {
                request.set('Content-Type', 'application/json; charset=utf-8');
            }

            if (options.params) {
                request.query(options.params);
            }

            if ((methodType === 'post' || methodType === 'put') && options.data) {
                request.send(options.data);
            }

            const id = uuid.v4();
            this[FIELDS.emitter].emit(HttpEvents.START, { id });

            request.end((error, response) => {
                this[FIELDS.emitter].emit(HttpEvents.STOP, { id });

                if (!error) {
                    this[FIELDS.emitter].emit(HttpEvents.SUCCESS, { id });
                    return done(null, response);
                }

                this[FIELDS.emitter].emit(HttpEvents.ERROR, { id, error });

                return done(error);
            });
        });
    }
});

export default function create(...args) {
    return new HttpClient(...args);
}
