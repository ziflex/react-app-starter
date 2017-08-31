import React from 'react';
import { Jumbotron, ButtonToolbar, Button } from 'react-bootstrap';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import FluxContextMixin from '../../mixins/flux-context-mixin';
import DynamicEventsMixin from '../../mixins/dynamic-events-mixin';
import NotificationLevels from '../../../models/notification-levels';
import Navbar from './navbar';

export default React.createClass({
    mixins: [
        DynamicEventsMixin,
        FluxContextMixin,
        PureRenderMixin
    ],

    componentWillMount() {
        this._onInfoClick = () => this._onClick(NotificationLevels.INFO);
        this._onSuccessClick = () => this._onClick(NotificationLevels.SUCCESS);
        this._onWarningClick = () => this._onClick(NotificationLevels.WARNING);
        this._onErrorClick = () => this._onClick(NotificationLevels.ERROR);
    },

    _onClick(level) {
        this.getActions('notifications').notify('Notificaton', 'Hello', level);
    },

    render() {
        return (
            <div>
                <Navbar />
                <div className="container">
                    <Jumbotron>
                        <h1>Welcome to React App Starter!</h1>
                        <ButtonToolbar>
                            <Button
                                bsStyle="info"
                                onClick={this._onInfoClick}
                            >
                              Click me
                            </Button>
                            <Button
                                bsStyle="success"
                                onClick={this._onSuccessClick}
                            >
                              Click me
                            </Button>
                            <Button
                                bsStyle="warning"
                                onClick={this._onWarningClick}
                            >
                              Click me
                            </Button>
                            <Button
                                bsStyle="danger"
                                onClick={this._onErrorClick}
                            >
                              Click me
                            </Button>
                        </ButtonToolbar>
                    </Jumbotron>
                </div>
            </div>
        );
    }
});
