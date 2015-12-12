import { List } from 'immutable';
import { createClass } from '../../core/utils/object';
import Notification from '../models/notification';

export default createClass({
    constructor(notificationActions) {
        this.bindActions(notificationActions);

        this.state = List();
    },

    onNotify(obj) {
        this.setState(this.state.push(Notification(obj)));
    },

    onDismiss(id) {
        const index = this.state.findIndex((notification) => {
            return notification.id === id;
        });
        this.setState(this.state.delete(index));
    }
});
