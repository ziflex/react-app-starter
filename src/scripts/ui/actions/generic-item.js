/* eslint-disable lodash/prefer-constant  */
import composeClass from 'compose-class';
import { requires } from '../../infrastructure/utils/contracts';

export default composeClass({
    constructor(service) {
        requires('service', service);

        this.service = service;

        this.generateActions(
            'getComplete',
            'getFail',
            'cancel'
        );
    },

    get(id) {
        this.service.get(id)
            .then(result => this.getComplete(result))
            .catch(reason => this.getFail(reason));

        return null;
    }
});
