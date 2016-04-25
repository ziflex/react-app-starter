import Promise from 'bluebird';
import reduce from 'lodash/reduce';

/**
 * Asynchronously executes passed task.
 * @param {Function} task - The task to execute asynchronously.
 * @param {number} timeout - Timeout. Optional. Default 10 ms.
 */
export function execute(task, timeout = 0) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            try {
                resolve(task());
            } catch (ex) {
                reject(ex);
            }
        }, timeout);
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
