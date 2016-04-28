import React from 'react';
import { Router, browserHistory } from 'react-router';
import ApplicationUI from './application-ui';
import routes from './routes';

const app = new ApplicationUI();

export default React.createClass({
    childContextTypes: {
        flux: React.PropTypes.object.isRequired
    },

    getChildContext() {
        return {
            flux: app
        };
    },

    render() {
        return <Router history={browserHistory} routes={routes} />;
    }
});
