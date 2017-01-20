import { Map } from 'immutable';
import composeClass from 'compose-class';
import Notification from '../models/notification';

export default composeClass({
    constructor(notificationActions) {
        this.bindActions(notificationActions);

        this.state = Map();
    },

    onNotify(obj) {
        const notification = Notification(obj);
        this.setState(this.state.set(notification.id, notification));
    },

    onDismiss(id) {
        this.setState(this.state.delete(id));
    }
});
