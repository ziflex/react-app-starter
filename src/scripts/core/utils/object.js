/* eslint-disable lodash/prefer-noop, prefer-arrow-callback */
import omit from 'lodash/omit';
import assign from 'lodash/assign';
import get from 'lodash/get';
import isFunction from 'lodash/isFunction';

const PREDEFINED = ['mixins', 'statics'];

/**
  * Creates class.
  * Possible to extend passed definition with mixins.
  * @param {Object | Function} definition - Class definition.
  * @return {Function} Constructor.
*/
export function createClass(definition) {
    if (isFunction(definition)) {
        return definition;
    }

    const mixins = get(definition, 'mixins', []);
    const statics = get(definition, 'statics', {});
    const prototype = omit(definition, PREDEFINED);
    let Constructor = ((function getConstructor(constructor) {
        return function Surrogate(...args) {
            constructor.apply(this, args);
        };
    })(prototype.constructor || function DefaultConstructor() {}));

    Constructor = assign(Constructor, omit(statics, ['constructor', 'prototype']));
    Constructor.prototype = assign(prototype, ...mixins);

    return Constructor;
}
