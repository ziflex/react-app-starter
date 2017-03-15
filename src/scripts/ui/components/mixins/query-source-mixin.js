import isFunction from 'lodash/isFunction';

function assertDataSourceMixin() {
    if (!isFunction(this.getData)) {
        throw new Error('Query mixin requires Data Source mixin');
    }
}

export default {
    getQuery() {
        assertDataSourceMixin();
        return this.props.source.get('data');
    },

    getQueryResult() {
        assertDataSourceMixin();

        return this.props.source.get('data');
    }
};
