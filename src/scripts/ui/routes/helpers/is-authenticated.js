const PATH = ['data', 'done'];

export default function isAuthenticated(store) {
    return store.getState().getIn(PATH);
}
