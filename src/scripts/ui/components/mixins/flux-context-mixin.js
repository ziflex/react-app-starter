import React from 'react';

/**
 * Allows components to receive Alt instance via context.
 */
export default {
    contextTypes: {
        flux: React.PropTypes.object.isRequired
    },
    getApp() {
        return this.context.flux;
    },
    getStore(name) {
        return this.getApp().getStore(name);
    },
    getActions(name) {
        return this.getApp().getActions(name);
    }
};
