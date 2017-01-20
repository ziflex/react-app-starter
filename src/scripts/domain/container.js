import composeClass from 'compose-class';
import Symbol from 'es6-symbol';
import ContainerEngine from 'namespaces-js';
import { requires } from '../infrastructure/utils/contracts';
import HttpClient from '../infrastructure/http/client';
import Logger from '../infrastructure/logging/logger';
import AuthManager from './auth/manager';

const SEPARATOR = '.';
const NAMESPACES = ContainerEngine.map({
    infrastructure: [
        'http',
        'logging'
    ],
    domain: [
        'authentication'
    ],
    ui: [
        'actions',
        'stores',
        'routes'
    ]
}, SEPARATOR);

const FIELDS = {
    container: Symbol('container')
};

/**
 * Represents an application container.
 * @class Application
 */
const ApplicationConainer = composeClass({
    /**
     * Creates new instance of Application.
     * @param {object} settings - Application's settings.
     * @constructor
     */
    constructor(params = {}) {
        this[FIELDS.container] = new ContainerEngine({ separator: SEPARATOR });

        this[FIELDS.container].value('settings', params);
        this[FIELDS.container].const('log', params.logger || console);
        this[FIELDS.container].factory('logger', ['log', 'settings'], (log, settings) => {
            return (prefix) => {
                return Logger(log, { prefix: `[${prefix}]`, debug: settings.debug });
            };
        });

        this.register(NAMESPACES.infrastructure.http()).service('client', HttpClient);

        this.register(NAMESPACES.domain()).service('authentication', AuthManager);
    },

    createLogger(source) {
        return this[FIELDS.container].resolve('logger')(source);
    },

    /**
     * Resolves a service by path.
     * @param {string} path - Service's path.
     * @returns {any} Any type.
     */
    resolve(path) {
        requires('path', path);
        return this[FIELDS.container].resolve(path);
    },

    resolveAll(from) {
        requires('namespace', from);
        return this[FIELDS.container].resolveAll(from);
    },

    /**
     * Registers a service in namespace.
     * @param {string} namespace - Service's namespace.
     * @returns {any} Module registry.
     */
    register(namespace) {
        requires('namespace', namespace);
        return this[FIELDS.container].namespace(namespace);
    }
});

export const namespaces = NAMESPACES;

export function Container(...args) {
    return new ApplicationConainer(...args);
}
