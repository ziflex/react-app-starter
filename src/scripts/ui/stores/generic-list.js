import composeClass from 'compose-class';
import { List } from 'immutable';
import DataSource from '../models/data-source';
import QueryResult from '../models/query-result';
import { requires } from '../../infrastructure/utils/contracts';

const PATH_QUERY_RESULT = ['data', 'result'];
const PATH_QUERY = ['data', 'query'];

export default composeClass({
    constructor(actions, router, editRoute) {
        requires('actions', actions);

        this.bindActions(actions);

        this.router = router;
        this.editRoute = editRoute;
        this.state = DataSource({
            loading: false,
            error: null,
            data: QueryResult()
        });
    },

    onCreate() {
        if (this.router && this.editRoute) {
            this.router.redirect(this.editRoute);
        }
    },

    onFind(query) {
        this.setState(this.state.withMutations((state) => {
            return state
                .set('isLoading', true)
                .setIn(PATH_QUERY, query)
                .setIn(PATH_QUERY_RESULT, List());
        }));
    },

    onFindComplete(entries) {
        this.setState(this.state.withMutations((state) => {
            return state
                .set('isLoading', false)
                .set('error', null)
                .setIn(PATH_QUERY_RESULT, entries);
        }));
    },

    onFindFail(err) {
        this.setState(this.state.withMutations((state) => {
            return state
                .set('isLoading', false)
                .set('error', err);
        }));
    }
});
