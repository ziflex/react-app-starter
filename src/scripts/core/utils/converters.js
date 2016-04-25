import moment from 'moment';
import isUndefined from 'lodash/isUndefined';
import isNull from 'lodash/isNull';
import isString from 'lodash/isString';
import isNumber from 'lodash/isNumber';
import isArray from 'lodash/isArray';
import isFunction from 'lodash/isFunction';
import isObject from 'lodash/isObject';
import isDate from 'lodash/isDate';
import map from 'lodash/map';

/**
 * Converts passed value to string.
 * @param {any} value - Target value.
 * @return {String} Stringified value.
 */
export function toString(value) {
    if (isUndefined(value) || isNull(value)) {
        return null;
    }

    if (isString(value)) {
        return value;
    }

    if (isArray(value)) {
        return value.join(',');
    }

    if (isFunction(value)) {
        return value.toString();
    }

    if (isObject(value)) {
        return map(value, toString).join(',');
    }

    if (isNaN(value)) {
        return null;
    }

    return value.toString();
}

/**
 * Converts passed value to date.
 * @param {any} value - Target value.
 * @return {Date} Converted date.
 */
export function toDate(value) {
    if (isString(value)) {
        return moment(value).toDate();
    }

    if (moment.isMoment(value)) {
        return value.toDate();
    }

    if (isDate(value)) {
        return value;
    }

    if (isArray(value)) {
        return new Date(value);
    }

    return null;
}

/**
 * Converts passed value to number.
 * @param {any} value - Target value.
 * @return {Number} Converted number.
 */
export function toNumber(value) {
    if (isNumber(value) && !isNaN(value)) {
        return value;
    }

    const result = parseFloat(value);

    if (isNumber(result) && !isNaN(result)) {
        return result;
    }

    return null;
}

/**
 * Converts passed value to moment.
 * @param {any} value - Target value.
 * @return {Moment} Converted moment.
 */
export function toMoment(value) {
    if (isString(value)) {
        return moment(value);
    }

    if (isDate(value)) {
        return moment(value);
    }

    if (moment.isMoment(value)) {
        return value;
    }

    return null;
}
