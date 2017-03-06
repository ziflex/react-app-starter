import Alt from 'alt';
import immutableUtil from 'alt-utils/lib/ImmutableUtil';
import Symbol from 'es6-symbol';
import {
    namespaces,
    Container
} from '../domain/container';
import Router from './router';
import AuthActions from './actions/authentication';
import AuthStore from './stores/authentication';
import NotificationsActions from './actions/notifications';
import NotificationsStore from './stores/notifications';
import LoginRoute from './routes/login';
import HomeRoute from './routes/home/index';

const FIELDS = {
    container: Symbol('container')
};

class Application extends Alt {
    constructor(params) {
        super({});

        this[FIELDS.container] = Container(params);
        this[FIELDS.container].register(namespaces.ui()).factory('router', [
            'logger',
            'settings'
        ], (createLogger, settings) => {
            return Router({
                logger: createLogger('router'),
                engine: settings.history
            });
        });

        this.addActions('authentication', [
            namespaces.domain('authentication')
        ], AuthActions);
        this.addStore('authentication', [
            namespaces.ui.actions('authentication'),
            namespaces.ui('router')
        ], AuthStore);

        this.addActions('notifications', [], NotificationsActions);
        this.addStore('notifications', [
            namespaces.ui.actions('notifications'),
            namespaces.ui('router')
        ], NotificationsStore);

        this.addRouteHandler('login', [
            namespaces.domain('authentication')
        ], LoginRoute);

        this.addRouteHandler('home', [
            namespaces.domain('authentication')
        ], HomeRoute);
    }

    addActions(name, dependencies = [], constructor) {
        this[FIELDS.container].register(namespaces.ui.actions()).factory(name, dependencies, (...args) => {
            const action = super.createActions(constructor, {}, ...args);

            this.actions[name] = action;

            return action;
        });
    }

    addStore(name, dependencies = [], constructor) {
        this[FIELDS.container].register(namespaces.ui.stores()).factory(name, dependencies, (...args) => {
            super.addStore(name, constructor, ...args);
            return this.stores[name];
        });
    }

    addRouteHandler(name, dependencies = [], constructor) {
        this[FIELDS.container].register(namespaces.ui.routes()).factory(name, dependencies, constructor);
    }

    createStore(constructor, ...args) {
        return super.createStore(immutableUtil(constructor), ...args);
    }

    getActions(name) {
        return this[FIELDS.container].resolve(namespaces.ui.actions(name));
    }

    getStore(name) {
        return this[FIELDS.container].resolve(namespaces.ui.stores(name));
    }

    getRouteHandler(name) {
        return this[FIELDS.container].resolve(namespaces.ui.routes(name));
    }
}

export default function create(settings) {
    return new Application(settings);
}
