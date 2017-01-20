import { Record } from 'immutable';

/**
 * Represents a list of http events.
 * @readonly
 * @enum
 */
const Enums = Record({
    START: 'start',
    STOP: 'stop',
    ERROR: 'error',
    SUCCESS: 'success'
});

export default new Enums();
