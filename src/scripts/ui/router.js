import React from 'react';
import AltRouter from 'alt-router';
import createBrowserHistory from 'history/lib/createBrowserHistory';
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
        return <AltRouter history={createBrowserHistory()} routes={routes} />;
    }
});
