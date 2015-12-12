import superagent from 'superagent';
import Promise from 'bluebird';
import Symbol from 'es6-symbol';
import isEmpty from 'lodash/lang/isEmpty';
import forEach from 'lodash/collection/forEach';
import uuid from 'uuid';
import EventEmitter from '../events/emitter';
import { createClass } from '../utils/object';
import getEventsSourceMixin from '../mixins/events-source';
import HttpEvents from './events';

const EMITTER = Symbol('EMITTER');

/**
 * Represents low-lever http service for communication with external services via AJAX.
 * @class
 */
export default createClass({
    mixins: [
        getEventsSourceMixin(EMITTER)
    ],
    constructor() {
        this[EMITTER] = new EventEmitter();
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
        return new Promise((resolve, reject) => {
            const methodType = (options.method === 'DELETE' ? 'DEL' : (options.method || '')).toLowerCase();
            const method = superagent[methodType];

            if (!method) {
                reject(new Error(`Unsupported http method: ${options.method}`));
            }

            if (isEmpty(options.url)) {
                reject(new Error('Empty url'));
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
            this[EMITTER].emit(HttpEvents.START, {id});

            request.end((error, response) => {
                this[EMITTER].emit(HttpEvents.STOP, {id});

                if (!error) {
                    this[EMITTER].emit(HttpEvents.SUCCESS, {id});
                    return resolve(response);
                }

                this[EMITTER].emit(HttpEvents.ERROR, {id, error});
                return reject(error);
            });
        });
    }
});
