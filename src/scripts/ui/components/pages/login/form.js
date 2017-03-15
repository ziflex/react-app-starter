import React from 'react';
import cn from 'classnames';
import DataSourceMixin from '../../mixins/data-source-mixin';
import { signin as signinCss } from './form.css';

const USERNAME_PATH = ['data', 'username'];
const IS_DONE_PATH = ['data', 'authenticated'];

export default React.createClass({
    propTypes: {
        source: React.PropTypes.object,
        actions: React.PropTypes.object
    },

    mixins: [
        DataSourceMixin
    ],

    getInitialState() {
        return {
            username: this.props.source.getIn(USERNAME_PATH),
            password: ''
        };
    },

    _isDone() {
        return this.props.source.getIn(IS_DONE_PATH);
    },

    _onSubmit(e) {
        e.preventDefault();
        if (!this.isLoading()) {
            this.props.actions.login(this.state.username, this.state.password);
        }
    },

    _renderLoader() {
        if (this.isLoading()) {
            return 'Wait...';
        }

        return null;
    },

    _btnLabel() {
        if (!this.isLoading()) {
            return 'Login';
        }

        return 'Wait';
    },

    _handleChange(key, value) {
        this.setState({
            [key]: value
        });
    },

    render() {
        const attrs = {};

        if (this.isLoading() || this._isDone()) {
            attrs.disabled = true;
        }

        const className = cn({
            container: true,
            [signinCss]: true
        });

        return (
            <div className={className}>
                <form onSubmit={this._onSubmit}>
                    <div
                        className="form-group"
                    >
                        <label htmlFor="inputUsername" className="sr-only">Username</label>
                        <input
                            type="text"
                            id="inputUsername"
                            className="form-control"
                            placeholder="Username" required=""
                            autoFocus=""
                            onChange={e => this._handleChange('username', e.target.value)}
                            {...attrs}
                        />
                    </div>
                    <div
                        className="form-group"
                    >
                        <label htmlFor="inputPassword" className="sr-only">Password</label>
                        <input
                            type="password"
                            id="inputPassword"
                            className="form-control"
                            placeholder="Password"
                            required=""
                            onChange={e => this._handleChange('password', e.target.value)}
                            {...attrs}
                        />
                    </div>
                    <button className="btn btn-lg btn-primary btn-block" type="submit" {...attrs}>
                        {this.disabled ? 'Wait...' : 'Login'}
                    </button>
                </form>
            </div>
        );
    }
});
