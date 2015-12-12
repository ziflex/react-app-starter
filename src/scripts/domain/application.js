import Symbol from 'es6-symbol';
import DI from 'namespaces-js';
import { createClass } from '../core/utils/object';
import { requires } from '../core/utils/contracts';
import HttpService from '../core/http/client';

const CONTAINER = Symbol('CONTAINER');

/**
 * Represents an application.
 * @class
 */
export default createClass({
    /**
     * Creates new instance of Application.
     * @param {object} settings - Application's settings.
     * @constructor
     */
    constructor(settings = {}) {
        this[CONTAINER] = new DI();

        this.register('constants').value('settings', settings);
        this.register('core/services').service('http', HttpService);
    },

    /**
     * Resolves a service by path.
     * @param {string} path - Service's path.
     * @returns {any} Any type.
     */
    resolve(path) {
        requires('Path', path);
        return this[CONTAINER].resolve(path);
    },

    /**
     * Registers a service in namespace.
     * @param {string} namespace - Service's namespace.
     * @returns {any} Module registry.
     */
    register(namespace) {
        requires('Namespace', namespace);
        return this[CONTAINER].register(namespace);
    }
});
