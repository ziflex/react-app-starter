/* eslint-disable no-unused-expressions */
import { expect } from '../../../utils/dynamic-expect';
import { toString, toDate, toNumber, toMoment } from '../../../../src/scripts/core/utils/converters';
import isString from 'lodash/isString';
import isNull from 'lodash/isNull';
import isDate from 'lodash/isDate';
import isNumber from 'lodash/isNumber';
import moment from 'moment';

const SUCCESS_DESCRIPTION = 'should successfully process convertable values';
const FAILURE_DESCRIPTION = 'should return null for non-convertable values';

describe('core/utils/converters', () => {
    describe('.toString', () => {
        expect({
            description: SUCCESS_DESCRIPTION,
            values: [
                'foo',
                111,
                [1, 2, 3],
                ['a', 'b', 'c'],
                {foo: 'bar', quz: 1, wsx: ['a', 'b']},
                function Test() {}
            ],
            test: toString,
            check: isString
        });

        expect({
            description: FAILURE_DESCRIPTION,
            values: [
                undefined,
                null,
                NaN
            ],
            test: toString,
            check: isNull
        });
    });

    describe('.toDate', () => {
        expect({
            description: SUCCESS_DESCRIPTION,
            values: [
                '10/11/2012',
                [10, 11, 2012],
                new Date(),
                moment()
            ],
            test: toDate,
            check: isDate
        });

        expect({
            description: FAILURE_DESCRIPTION,
            values: [
                undefined,
                null,
                NaN,
                {'foo': 'bar'}
            ],
            test: toDate,
            check: isNull
        });
    });

    describe('.toNumber', () => {
        expect({
            description: SUCCESS_DESCRIPTION,
            values: [
                1,
                '1'
            ],
            test: toNumber,
            check: isNumber
        });

        expect({
            description: FAILURE_DESCRIPTION,
            values: [
                undefined,
                null,
                NaN,
                {'foo': 'bar'}
            ],
            test: toNumber,
            check: isNull
        });
    });

    describe('.toNumber', () => {
        expect({
            description: SUCCESS_DESCRIPTION,
            values: [
                1,
                '1'
            ],
            test: toNumber,
            check: isNumber
        });

        expect({
            description: FAILURE_DESCRIPTION,
            values: [
                undefined,
                null,
                NaN,
                {'foo': 'bar'}
            ],
            test: toNumber,
            check: isNull
        });
    });

    describe('.toMoment', () => {
        expect({
            description: SUCCESS_DESCRIPTION,
            values: [
                new Date(),
                moment(),
                '10/11/2011'
            ],
            test: toMoment,
            check: moment.isMoment
        });

        expect({
            description: FAILURE_DESCRIPTION,
            values: [
                undefined,
                null,
                NaN,
                {'foo': 'bar'}
            ],
            test: toMoment,
            check: isNull
        });
    });
});
/* eslint-enable no-unused-expressions */
