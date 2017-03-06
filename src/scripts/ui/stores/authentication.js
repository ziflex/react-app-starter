import composeClass from 'compose-class';
import DataSource from '../models/data-source';
import AuthenticationModel from '../models/authentication';
import { requires } from '../../infrastructure/utils/contracts';

export default composeClass({
    constructor(authActions, router) {
        requires('auth actions', authActions);
        requires('router', router);

        this.bindActions(authActions);

        this.router = router;
        this.state = DataSource({
            data: AuthenticationModel()
        });
    },

    onLogin() {
        this.setState(this.state.set('isLoading', true));
    },

    onLoginComplete(username) {
        this.setState(DataSource({
            isLoading: false,
            error: null,
            data: AuthenticationModel({
                done: true,
                username
            })
        }));

        this.router.navigate('/home');
    },

    onLoginFail(err) {
        this.setState(this.state.merge({
            isLoading: false,
            error: err
        }));
    },

    onLogoutComplete() {
        this.setState(this.state.merge({
            isLoading: false,
            data: AuthenticationModel({
                username: null,
                done: false
            })
        }));

        this.router.navigate('/login');
    },

    onLogoutFail(err) {
        this.setState(this.state.merge({
            isLoading: false,
            error: err
        }));
    }
});
