export default function mixin(symbolOrKey) {
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
