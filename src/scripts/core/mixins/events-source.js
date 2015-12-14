/**
 * Extends an object with functions that allow to subscribe to events.
 * @param {Symbol | String} symbolOrKey - Symbol or key in order to get inner event emitter.
 * @return {Object} Mixin.
 */
export default function EventsSourceMixin(symbolOrKey) {
    return {
        on(event, handler) {
            this[symbolOrKey].on(event, handler);
        },

        once(event, handler) {
            this[symbolOrKey].once(event, handler);
        },

        off(event, handler) {
            this[symbolOrKey].once(event, handler);
        }
    };
}
