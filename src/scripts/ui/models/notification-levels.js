import { Record } from 'immutable';

/**
 * Represents a list of notification level.
 * @enum Notification level.
 */
const Enums = Record({
    INFO: 'info',
    SUCCESS: 'success',
    WARNING: 'warning',
    ERROR: 'error'
});

export default new Enums();
