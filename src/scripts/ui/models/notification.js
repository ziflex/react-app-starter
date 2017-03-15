import { Record } from 'immutable';
import uuid from 'uuid';
import NotificationLevel from './notification-levels';

/**
 * Represents a Notification object
 * @class
 */
const Notification = Record({
    title: '',
    message: '',
    level: NotificationLevel.INFO,
    id: ''
});

const mapSeverityLevelToNotificationLevel = (severityLevel) => {
    return (severityLevel && NotificationLevel[severityLevel.toUpperCase()]) || NotificationLevel.ERROR;
};

/**
 * Creates new instance of Notification class
 * @param {WebError|Object} value A WebError object or custom notification temporary object
 * @returns {Notification}
 */
export default function create({ title, message, level }) {
    return new Notification({
        title,
        message,
        id: uuid.v4(),
        level: mapSeverityLevelToNotificationLevel(level)
    });
}
