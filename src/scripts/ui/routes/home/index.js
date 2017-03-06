export default function create(authentication) {
    return (nextState, replace, done) => {
        return authentication.isAuthenticated().then((isAuth) => {
            if (!isAuth) {
                replace('/login');
            }

            done();

            return null;
        }).catch(done);
    };
}
