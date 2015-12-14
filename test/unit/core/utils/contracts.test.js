/* eslint-disable no-unused-expressions */
import { expect } from 'chai';
import { assert, requires } from '../../../../src/scripts/core/utils/contracts';

describe(__dirname + '/contracts', () => {
    describe('.assert', () => {
        it('should not when condition is true', () => {
            expect(() => {
                assert('A must be equal to B', true);
            }).to.not.throw('A must be equal to B');
        });

        it('should throw when condition is false', () => {
            expect(() => {
                assert('A must be equal to B', 'a' === 'b');
            }).to.throw('A must be equal to B');
        });
    });

    describe('.requires', () => {
        it('should not throw when condition is true', () => {
            expect(() => {
                requires('A', 'A');
            }).to.not.throw('A is required!');

            expect(() => {
                requires('B', null);
            }).to.throw('B is required!');
        });

        it('should throw when condition is false', () => {
            expect(() => {
                requires('A');
            }).to.throw('A is required!');

            expect(() => {
                requires('B', null);
            }).to.throw('B is required!');
        });
    });
});
/* eslint-enable no-unused-expressions */
