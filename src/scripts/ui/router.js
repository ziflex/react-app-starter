import composeClass from 'compose-class';
import Symbol from 'es6-symbol';
import { requires } from '../infrastructure/utils/contracts';

const FIELDS = {
    logger: Symbol('logger'),
    engine: Symbol('engine')
};

const Router = composeClass({
    constructor(params) {
        requires('params', params);
        requires('params.logger', params.logger);
        requires('params.engine', params.engine);

        this[FIELDS.logger] = params.logger;
        this[FIELDS.engine] = params.engine;
    },

    navigate(path) {
        requires('path', path);

        this[FIELDS.engine].push(path);

        return this;
    },

    redirect(path) {
        requires('path', path);

        this[FIELDS.engine].replace(path);

        return this;
    },

    subscribe(handler) {
        requires('handler', handler);

        return this[FIELDS.engine].listen(handler);
    }
});

export default function create(params) {
    return new Router(params);
}
