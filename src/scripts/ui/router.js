import composeClass from 'compose-class';
import Symbol from 'es6-symbol';
import { requires } from '../infrastructure/utils/contracts';

const FIELDS = {
    logger: Symbol('logger'),
    engine: Symbol('engine')
};

const Router = composeClass({
    consturctor(params) {
        requires('params', params);
        requires('params.logger', params.logger);
        requires('params.engine', params.engine);

        this[FIELDS.logger] = params.logger;
        this[FIELDS.engine] = params.engine;
    },

    redirect(path) {
        requires('path', path);

        this[FIELDS.engine].push(path);

        return this;
    },

    subscribe(handler) {
        requires('handler', handler);

        return this[FIELDS.engine].listen(handler);
    }
});

export default function create(...args) {
    return new Router(...args);
}
