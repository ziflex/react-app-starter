import React from 'react';
import { Jumbotron, ButtonToolbar, Button } from 'react-bootstrap';
import FluxContextMixin from '../../mixins/flux-context-mixin';
import NotificationLevels from '../../enums/notification-levels';

export default React.createClass({
    mixins: [
        FluxContextMixin
    ],

    _onClick(level) {
        this.getActions('notifications').notify('Notificaton', 'Hello', level);
    },

    render() {
        return (
            <Jumbotron>
                <h1>Hello from React App Starter!</h1>
                <ButtonToolbar>
                    <Button
                        bsStyle="info"
                        onClick={this._onClick.bind(this, NotificationLevels.INFO)}
                    >
                        Click me
                    </Button>
                    <Button
                        bsStyle="success"
                        onClick={this._onClick.bind(this, NotificationLevels.SUCCESS)}
                    >
                        Click me
                    </Button>
                    <Button
                        bsStyle="warning"
                        onClick={this._onClick.bind(this, NotificationLevels.WARNING)}
                    >
                        Click me
                    </Button>
                    <Button
                        bsStyle="danger"
                        onClick={this._onClick.bind(this, NotificationLevels.ERROR)}
                    >
                        Click me
                    </Button>
                </ButtonToolbar>
            </Jumbotron>
        );
    }
});
