import React from 'react';

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
    },
    resolve(name) {
        return this.getApp().resolve(name);
    }
};
