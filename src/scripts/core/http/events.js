import { Record } from 'immutable';

const Enums = Record({
    START: 'start',
    STOP: 'stop',
    ERROR: 'error',
    SUCCESS: 'success'
});

export default new Enums();
