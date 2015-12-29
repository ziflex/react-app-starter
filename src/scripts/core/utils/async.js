import Promise from 'bluebird';
import bind from 'lodash/function/bind';
import reduce from 'lodash/collection/reduce';

/**
 * Asynchronously executes passed task.
 * @param {Function} task - The task to execute asynchronously.
 * @param {number} timeout - Timeout. Optional. Default 10 ms.
 */
export function execute(task, timeout = 0) {
    return new Promise((resolve, reject) => {
        setTimeout(bind(function executeTask(t) {
            try {
                resolve(t());
            } catch (ex) {
                reject(ex);
            }
        }, this, task), timeout);
    });
}

/**
 * Asynchronously executes passed tasks in order.
 * @param {Function[]} tasks - The collection of tasks to execute asynchronously.
 * @param {number} timeout - Timeout. Optional. Default 10 ms.
 */
export function series(tasks, timeout = 0) {
    return reduce(tasks, (previous, current) => {
        return previous.then(() => execute(current, timeout));
    }, Promise.resolve());
}
