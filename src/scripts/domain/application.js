import Symbol from 'es6-symbol';
import Container from 'namespaces-js';
import { createClass } from '../core/utils/object';
import { requires } from '../core/utils/contracts';
import HttpClient from '../core/http/client';

const CONTAINER = Symbol('CONTAINER');

/**
 * Represents an application.
 * @class Application
 */
export default createClass({
    /**
     * Creates new instance of Application.
     * @param {object} settings - Application's settings.
     * @constructor
     */
    constructor(settings = {}) {
        this[CONTAINER] = new Container();

        this.register('constants').value('settings', settings);
        this.register('core/services').service('http', HttpClient);
    },

    /**
     * Resolves a service by path.
     * @param {string} path - Service's path.
     * @returns {any} Any type.
     */
    resolve(path) {
        requires('path', path);
        return this[CONTAINER].resolve(path);
    },

    /**
     * Registers a service in namespace.
     * @param {string} namespace - Service's namespace.
     * @returns {any} Module registry.
     */
    register(namespace) {
        requires('namespace', namespace);
        return this[CONTAINER].namespace(namespace);
    }
});
