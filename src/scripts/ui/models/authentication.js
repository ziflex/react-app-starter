import { Record } from 'immutable';

const AuthenticationModel = Record({
    done: false,
    username: ''
});

export default function create(value) {
    return new AuthenticationModel(value);
}
