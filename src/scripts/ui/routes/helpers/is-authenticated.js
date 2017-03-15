const PATH = ['data', 'authenticated'];

export default function isAuthenticated(store) {
    return store.getState().getIn(PATH) === true;
}
