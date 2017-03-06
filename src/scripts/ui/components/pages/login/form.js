import React from 'react';

const DEFAULT_ERRORS = [];

export default React.createClass({
    propTypes: {
        source: React.PropTypes.object,
        actions: React.PropTypes.object
    },

    getInitialState() {
        return {
            username: this.props.source.getIn(['data', 'username']),
            password: ''
        };
    },

    _isLoading() {
        return this.props.source.get('isLoading');
    },

    _getErrors() {
        const err = this.props.source.get('error');

        if (!err) {
            return DEFAULT_ERRORS;
        }

        return [err.message];
    },

    _onSubmit() {
        if (!this._isLoading()) {
            this.props.actions.login(this.state.username, this.state.password);
        }
    },

    _renderLoader() {
        if (this._isLoading()) {
            return 'Wait...';
        }

        return null;
    },

    _btnLabel() {
        if (!this._isLoading()) {
            return 'Login';
        }

        return 'Wait';
    },

    render() {
        const attrs = {};

        if (this._isLoading()) {
            attrs.disabled = true;
        }

        return (
            <form className="form-login" onSubmit={this._onSubmit}>
                <label htmlFor="inputUsername" className="sr-only">Username</label>
                <input
                    type="text"
                    id="inputUsername"
                    className="form-control"
                    placeholder="Username" required=""
                    autoFocus=""
                    valueLink={this.linkState('username')}
                    {...attrs}
                />
                <label htmlFor="inputPassword" className="sr-only">Password</label>
                <input
                    type="password"
                    id="inputPassword"
                    className="form-control"
                    placeholder="Password"
                    required=""
                    valueLink={this.linkState('password')}
                    {...attrs}
                />
                <button className="btn btn-lg btn-primary btn-block" type="submit" {...attrs}>
                    {this.disabled ? 'Wait...' : 'Login'}
                </button>
            </form>
        );
    }
});
