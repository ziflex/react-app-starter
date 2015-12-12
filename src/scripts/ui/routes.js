/* eslint-disable no-unused-vars */
import React from 'react';
/* eslint-ensable no-unused-vars */
import { Route, IndexRoute } from 'react-router';

import Root from './components/pages/root';
import Home from './components/pages/home';

export default (
    <Route path="/" component={Root}>
        <IndexRoute component={Home} />
     </Route>
);
