import Immutable from 'immutable';
import isNil from 'lodash/isNil';
import isImmutable from '../../infrastructure/utils/is-immutable';

const DataSource = Immutable.Record({
    data: null,
    error: null,
    isLoading: false
});

function wrapData(data) {
    if (isNil(data)) {
        return null;
    }

    if (isImmutable(data)) {
        return data;
    }

    return Immutable.fromJS(data);
}

export default function create(value) {
    return new DataSource({
        isLoading: value ? value.isLoading : false,
        error: value ? value.error : null,
        data: value ? wrapData(value.data) : null
    });
}
