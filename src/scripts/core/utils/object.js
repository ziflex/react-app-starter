import omit from 'lodash/object/omit';
import assign from 'lodash/object/assign';
import get from 'lodash/object/get';
import isFunction from 'lodash/lang/isFunction';

const PREDEFINED = ['mixins', 'statics'];

/**
  * Helper function for setting up prototype chains for subclasses.
  * @param {Object | Function} definition - Class definition.
  * @param {Array<Object>} mixins - Mixins.
*/
export function createClass(definition) {
    if (isFunction(definition)) {
        return definition;
    }

    const mixins = get(definition, 'mixins', []);
    const statics = get(definition, 'statics', {});
    const prototype = omit(definition, PREDEFINED);
    let Constructor = (function getConstructor(constructor) {
        return function Surrogate(...args) {
            constructor.apply(this, args);
        };
    })(prototype.constructor || function DefaultConstructor() {});

    Constructor = assign(Constructor, statics);
    Constructor.prototype = assign(prototype, ...mixins);

    return Constructor;
}
