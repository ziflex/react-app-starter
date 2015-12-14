import { createClass } from '../../core/utils/object';

/**
 * Represents a notifications actions.
 * @class NotificationsActions
 */
export default createClass({
    /**
     * Show notification.
     * @param {String} title - Notification title.
     * @param {String} message - Notification message.
     * @param {String} level - Notification level.
     */
    notify(title, message, level) {
        return {
            title,
            message,
            level
        };
    },

    /**
     * Close notification.
     * @param {String} id - Notification id.
     */
    dismiss(id) {
        return id;
    }
});
