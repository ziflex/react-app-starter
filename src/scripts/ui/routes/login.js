import isAuthenticated from './helpers/is-authenticated';

export default function create(authenticationStore) {
    return (nextState, replace, done) => {
        if (isAuthenticated(authenticationStore)) {
            replace('/home');
        }

        done();
    };
}
