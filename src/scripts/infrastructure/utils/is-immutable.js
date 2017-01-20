import isNil from 'lodash/isNil';
import some from 'lodash/some';
import {
    List,
    Map,
    OrderedMap,
    Set,
    OrderedSet,
    Stack,
    Seq,
    Iterable
} from 'immutable';

const comparators = [
    List.isList,
    Map.isMap,
    OrderedMap.isOrderedMap,
    Set.isSet,
    OrderedSet.isOrderedSet,
    Stack.isStack,
    Seq.isSeq,
    Iterable.isIterable
];

export default function isImmutable(value) {
    if (isNil(value)) {
        return false;
    }

    return some(comparators, i => i(value));
}
