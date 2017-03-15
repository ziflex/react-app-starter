/* eslint-disable lodash/prefer-constant  */
import composeClass from 'compose-class';
import { requires } from '../../infrastructure/utils/contracts';

export default composeClass({
    constructor(service) {
        requires('auth service', service);

        this.authSrvc = service;

        this.generateActions(
            'loginComplete',
            'loginFail',
            'logoutComplete',
            'logoutFail'
        );
    },

    login(username, password) {
        this.authSrvc
          .login(username, password)
          .then(credentials => this.loginComplete(credentials))
          .catch(err => this.loginFail(err));

        return null;
    },

    logout() {
        this.authSrvc
          .logout()
          .then(() => this.logoutComplete())
          .catch(err => this.logoutFail(err));

        return this;
    }
});
