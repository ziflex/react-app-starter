import React from 'react';
import Notification from 'react-notification-system';
import bind from 'lodash/function/bind';
import indexOf from 'lodash/array/indexOf';
import merge from 'lodash/object/merge';
import FluxContextMixin from '../../../mixins/flux-context-mixin';

export default React.createClass({
    propTypes: {
        notifications: React.PropTypes.object
    },
    mixins: [
        FluxContextMixin
    ],
    componentDidMount() {
        this._notificationContainer = this.refs.notificationContainer;
        const notificationStore = this.getStore('notifications');
        notificationStore.listen(this._onChange);
        notificationStore.getState().forEach((n) => {
            this._addNotification(n);
        });
    },
    _addNotification(notification) {
        if (indexOf(this._visibleNotifications, notification.id) < 0) {
            this._notificationContainer.addNotification(merge({}, notification.toJS(), {
                onRemove: bind(this._dismiss, this, notification.id)
            }));
            this._visibleNotifications.push(notification.id);
        }
    },
    _onChange() {
        const notifications = this.getStore('notifications').getState();

        notifications.forEach((n) => {
            this._addNotification(n);
        });
    },
    _dismiss(id) {
        this._visibleNotifications = this._visibleNotifications.slice(indexOf(this._visibleNotifications, id), 1);
        this.getActions('notifications').dismiss(id);
    },
    _notificationContainer: null,
    _visibleNotifications: [],
    _availablePositions: ['tr', 'tl', 'tc', 'br', 'bl', 'bc'],
    render() {
        return (
            <Notification ref="notificationContainer" />
        );
    }
});
