/* eslint-disable lodash/prefer-constant  */
import composeClass from 'compose-class';
import { requires } from '../../infrastructure/utils/contracts';

export default composeClass({
    constructor(authSrvc) {
        requires('auth service', authSrvc);

        this.authSrvc = authSrvc;
    },

    login(username, password) {
        this.authSrvc
          .login(username, password)
          .then(() => {
              this.loginComplete(username);
              return null;
          })
          .catch(err => this.loginFail(err));

        return null;
    },

    loginComplete(username) {
        return username;
    },

    loginFail(reason) {
        return reason;
    },

    logout() {
        this.authSrvc
          .logout()
          .then(() => this.logoutComplete())
          .catch(err => this.logoutFail(err));

        return this;
    },

    logoutComplete() {
        return null;
    },

    logoutFail(reason) {
        return reason;
    }
});
