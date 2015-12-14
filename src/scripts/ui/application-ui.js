import Alt from 'alt';
import immutableUtil from 'alt-utils/lib/ImmutableUtil';
import Symbol from 'es6-symbol';

import Application from '../domain/application';

import NotificationsActions from './actions/notifications';

import NotificationsStore from './stores/notifications';

const ACTIONS_NAMESPACE = 'ui/actions';
const STORES_NAMESPACE = 'ui/stores';
const APPLICATION = Symbol('APPLICATION');

export default class ApplicationUI extends Alt {
    constructor(config = {}) {
        super(config);

        this[APPLICATION] = new Application({});

        this.addActions('notifications', [], NotificationsActions);
        this.addStore('notifications', ['ui/actions/notifications'], NotificationsStore);
    }

    addActions(name, dependencies = [], constructor) {
        this[APPLICATION].register(ACTIONS_NAMESPACE).factory(name, dependencies, (...args) => {
            super.addActions(name, constructor, ...args);
            return this.actions[name];
        });
    }

    addStore(name, dependencies = [], constructor) {
        this[APPLICATION].register(STORES_NAMESPACE).factory(name, dependencies, (...args) => {
            super.addStore(name, constructor, ...args);
            return this.stores[name];
        });
    }

    createStore(constructor, ...args) {
        return super.createStore(immutableUtil(constructor), ...args);
    }

    getActions(name) {
        return this[APPLICATION].resolve(`${ACTIONS_NAMESPACE}/${name}`);
    }

    getStore(name) {
        return this[APPLICATION].resolve(`${STORES_NAMESPACE}/${name}`);
    }
}
