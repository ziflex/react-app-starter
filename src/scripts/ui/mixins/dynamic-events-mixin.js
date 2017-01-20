import isPlainObject from 'lodash/isPlainObject';
import isFunction from 'lodash/isFunction';
import {
    requires,
    assert
} from '../../infrastructure/utils/contracts';

export default {
    emit(eventName, ...initialArgs) {
        requires('eventName', eventName);

        if (this.props.disabled) {
            return null;
        }

        return (...eventArgs) => {
            const handler = this.props[eventName];

            if (isFunction(handler)) {
                handler(eventName, ...initialArgs, ...eventArgs);
            }
        };
    },

    handle(eventName, func) {
        requires('eventName', eventName);
        requires('func', func);
        assert('"func" must be a function type', isFunction(func));

        if (this.props.disabled) {
            return null;
        }

        return (actualEvent, ...eventArgs) => {
            if (actualEvent === eventName) {
                func(...eventArgs);
            }
        };
    },

    handleAll(handlers) {
        requires('handlers', handlers);
        assert('"handlers" must be an object', isPlainObject(handlers));

        if (this.props.disabled) {
            return null;
        }

        return (eventName, ...eventArgs) => {
            const handler = handlers[eventName];

            if (isFunction(handler)) {
                handler(...eventArgs);
            }
        };
    },

    delegate(sourceEvent, targetEvent = sourceEvent) {
        requires('sourceEvent', sourceEvent);

        if (!this.props.onEvent) {
            return null;
        }

        if (this.props.disabled) {
            return null;
        }

        return this.handle(sourceEvent, this.emit(targetEvent));
    }
};
