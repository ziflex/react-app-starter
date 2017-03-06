import React from 'react';
import AltContainer from 'alt-container';
import FluxContextMixin from '../mixins/flux-context-mixin';
import Navbar from './root/navbar';
import Notifications from './root/notifications';

export default React.createClass({
    propTypes: {
        children: React.PropTypes.oneOfType([
            React.PropTypes.element,
            React.PropTypes.arrayOf(React.PropTypes.element)
        ]).isRequired
    },
    mixins: [
        FluxContextMixin
    ],
    render() {
        return (
            <div>
                <div>
                    <Navbar />
                </div>
                <div className="container">
                    {this.props.children}
                </div>
                <div>
                    <AltContainer
                        stores={{ notifications: this.getStore('notifications') }}
                        actions={{ actions: this.getActions('notifications') }}
                    >
                        <Notifications />
                    </AltContainer>
                </div>
            </div>
        );
    }
});
