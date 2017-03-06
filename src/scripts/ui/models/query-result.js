import Immutable from 'immutable';
import isNil from 'lodash/isNil';
import isImmutable from '../../infrastructure/utils/is-immutable';

const QueryResult = Immutable.Record({
    result: null,
    query: null
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
    return new QueryResult({
        result: value ? wrapData(value.result) : null,
        query: value ? wrapData(value.query) : null
    });
}
