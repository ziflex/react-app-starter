/* eslint-disable react/forbid-prop-types */
import React from 'react';
import { Router, Route, IndexRedirect } from 'react-router';
import Root from './pages/root';
import Home from './pages/home';

export default React.createClass({
    propTypes: {
        flux: React.PropTypes.object.isRequired,
        history: React.PropTypes.object.isRequired
    },

    childContextTypes: {
        flux: React.PropTypes.object.isRequired
    },

    getChildContext() {
        return {
            flux: this.props.flux
        };
    },

    render() {
        return (
            <Router
                history={this.props.history}
            >
                <Route
                    path="/"
                    component={Root}
                >
                    <IndexRedirect to="/home" />
                    <Route
                        path="home"
                        component={Home}
                        onEnter={this.props.flux.getRouteHandler('home')}
                    />
                </Route>
            </Router>
        );
    }
});
