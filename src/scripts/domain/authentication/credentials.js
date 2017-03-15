import { Record } from 'immutable';

const Credentials = Record({
    authenticated: false,
    username: ''
});

export default function create(value) {
    return new Credentials(value);
}
