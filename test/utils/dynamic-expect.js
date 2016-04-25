/* eslint-disable no-unused-expressions */
import chai from 'chai';
import _ from 'lodash';

const DEFAULT_CHECK = result => chai.expect(result).to.be.true;

function getDescription(description = '', value) {
    return _.isFunction(description) ? description(value) : `${description} ${_.toString(value)}`;
}

export function expect({ description, values, test, check = DEFAULT_CHECK, beforeEach, afterEach }) {
    _.forEach(values, (v) => {
        it(getDescription(description, v), () => {
            if (beforeEach) {
                beforeEach();
            }

            check(test(v), v);

            if (afterEach) {
                afterEach();
            }
        });
    });
}

export function expectAsync({ description, values, test, check = DEFAULT_CHECK, beforeEach, afterEach }) {
    _.forEach(values, (v) => {
        it(getDescription(description, v), (done) => {
            if (beforeEach) {
                beforeEach();
            }

            test(v, (err, result) => {
                if (err) {
                    console.error(err.stack);

                    if (afterEach) {
                        afterEach();
                    }

                    chai.expect(err, 'no errors').to.not.exist;
                    return;
                }

                check(result, v);

                if (afterEach) {
                    afterEach();
                }

                done();
            });
        });
    });
}

/* eslint-enable no-unused-expressions */
