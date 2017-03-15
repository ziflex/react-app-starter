import composeClass from 'compose-class';
import Symbol from 'es6-symbol';
import Promise from 'bluebird';
import Credentials from './credentials';

const FIELDS = {
    http: Symbol('http'),
    credentials: Symbol('credentials')
};

const AuthenticationService = composeClass({
    constructor(http) {
        this[FIELDS.http] = http;
        this[FIELDS.credentials] = Credentials();
    },

    getCredentials() {
        return this[FIELDS.credentials];
    },

    login(username) {
        return Promise.fromCallback((done) => {
            setTimeout(() => {
                this[FIELDS.credentials] = this[FIELDS.credentials].merge({
                    username,
                    authenticated: true
                });

                done(null, this[FIELDS.credentials]);
            }, 1000);
        });
    },

    logout() {
        return Promise.fromCallback((done) => {
            setTimeout(() => {
                this[FIELDS.credentials] = this[FIELDS.credentials].set('authenticated', false);

                done(null, this[FIELDS.credentials]);
            }, 1000);
        });
    }
});

export default function create(...args) {
    return new AuthenticationService(...args);
}
