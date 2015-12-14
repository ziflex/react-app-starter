/* eslint-disable no-unused-expressions */
import chai from 'chai';
import forEach from 'lodash/collection/forEach';

export function expect({description, values, test, check}) {
    forEach(values, (v) => {
        it(`${description} ${v}`, () => {
            chai.expect(check(test(v))).to.be.true;
        });
    });
}

export function expectAsync({description, values, test, check}) {
    forEach(values, (v) => {
        it(`${description} ${v}`, (done) => {
            const quantity = values.length;
            let executed = 0;

            test(v, (result) => {
                chai.expect(check(result)).to.be.true;
                executed += 1;

                if (quantity === executed) {
                    done();
                }
            });
        });
    });
}

/* eslint-enable no-unused-expressions */
