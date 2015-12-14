import { EventEmitter } from 'events';
import Symbol from 'es6-symbol';
import { createClass } from '../utils/object';
import getEventsSourceMixin from '../mixins/events-source';
import { execute } from '../utils/async';

const EMITTER = Symbol('EMITTER');

/**
 * Represents async event emitter.
 * @class EventEmitter
 */
export default createClass({
    mixins: [
        getEventsSourceMixin(EMITTER)
    ],

    constructor() {
        this[EMITTER] = new EventEmitter();
    },

    emit(...args) {
        execute(() => {
            this[EMITTER].emit(...args);
        });
    }
});
