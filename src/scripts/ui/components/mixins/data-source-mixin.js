export default {
    isLoading() {
        return this.props.source.get('isLoading') === true;
    },

    hasError() {
        return this.props.source.get('error') == null;
    },

    getError() {
        return this.props.source.get('error');
    },

    getData() {
        return this.props.source.get('data');
    }
};
