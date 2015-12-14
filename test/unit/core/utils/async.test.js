/* eslint-disable no-unused-expressions */
import { expect } from 'chai';
import sinon from 'sinon';
import bind from 'lodash/function/bind';
import { execute, series } from '../../../../src/scripts/core/utils/async';

describe(__dirname + '/async', () => {
    describe('.execute', () => {
        it('should execute asynchronously', (done) => {
            const callback = sinon.spy();
            const success = sinon.spy();
            const failure = sinon.spy();

            execute(callback)
                .then(success)
                .catch(failure)
                .finally(() => {
                    expect(callback.called).to.be.true;
                    expect(success.called).to.be.true;
                    expect(failure.called).to.not.be.true;
                    done();
                });

            expect(callback.called).to.not.be.true;
        });

        it('should handle errors', () => {
            const success = sinon.spy();
            const failure = sinon.spy();

            execute(() => { throw new Error('Test'); })
                .then(success)
                .catch(failure)
                .finally(() => {
                    expect(success.called).to.not.be.true;
                    expect(failure.called).to.be.true;
                });
        });
    });

    describe('.series', () => {
        it('should execute asynchronously in order', (done) => {
            const callback = sinon.spy();
            const order = [];
            const task = function task(collection, number) {
                collection.push(number);
            };

            series([
                bind(task, this, order, 1),
                bind(task, this, order, 2),
                bind(task, this, order, 3),
                callback
            ]).finally(() => {
                expect(callback.called).to.be.true;
                expect(order.join(',')).to.be.equal('1,2,3');
                done();
            });

            expect(callback.called).to.not.be.true;
        });
    });
});
/* eslint-enable no-unused-expressions */
