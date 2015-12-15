/* eslint-disable no-unused-expressions, react/no-multi-comp */
import { expect } from 'chai';
import { createClass } from '../../../../src/scripts/core/utils/object';

describe(__dirname + '/object', () => {
    it('should ignore functions', () => {
        const Constructor = function Constructor() {};
        const Class = createClass(Constructor);

        expect(Class).to.be.equal(Constructor);
    });

    it('should create without constructor', () => {
        const Class = createClass({});

        const instance1 = new Class();
        const instance2 = new Class();

        expect(instance1).to.exist;
        expect(instance2).to.exist;
    });

    it('should create with constructor', () => {
        const Class = createClass({
            constructor(name) {
                this._name = name;
            },

            getName() {
                return this._name;
            }
        });

        const instance1 = new Class('Foo');
        const instance2 = new Class('Bar');

        expect(instance1.getName()).to.be.equal('Foo');
        expect(instance2.getName()).to.be.equal('Bar');
    });
});

/* eslint-enable no-unused-expressions, react/no-multi-comp */
