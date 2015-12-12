import { createClass } from '../../core/utils/object';

export default createClass({
    notify(title, message, level) {
        return {
            title,
            message,
            level
        };
    },
    dismiss(id) {
        return id;
    }
});
