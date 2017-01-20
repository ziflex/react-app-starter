/* eslint-disable react/require-default-props */
import React from 'react';
import Notification from 'react-notification-system';
import bind from 'lodash/bind';
import includes from 'lodash/includes';
import indexOf from 'lodash/indexOf';
import merge from 'lodash/merge';
import slice from 'lodash/slice';

export default React.createClass({
    propTypes: {
        notifications: React.PropTypes.object,
        actions: React.PropTypes.object
    },

    componentDidMount() {
        if (this.props.notifications) {
            this.props.notifications.forEach(bind(this._addNotification, this));
        }
    },

    componentWillReceiveProps(nextProps) {
        if (nextProps.notifications) {
            nextProps.notifications.forEach(bind(this._addNotification, this));
        }
    },

    _addNotification(notification) {
        if (!includes(this._visibleNotifications, notification.id)) {
            this._notificationContainer.addNotification(merge(notification.toJS(), {
                onRemove: bind(this._dismiss, this, notification.id)
            }));

            this._visibleNotifications.push(notification.id);
        }
    },

    _dismiss(id) {
        this._visibleNotifications = slice(
            this._visibleNotifications,
            indexOf(this._visibleNotifications, id),
            1
        );

        this.props.actions.dismiss(id);
    },

    _notificationContainer: null,
    _visibleNotifications: [],
    _availablePositions: ['tr', 'tl', 'tc', 'br', 'bl', 'bc'],

    render() {
        return (
            <Notification
                ref={(container) => { this._notificationContainer = container; }}
            />
        );
    }
});
