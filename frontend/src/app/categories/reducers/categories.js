import { REPLACE_CATEGORIES } from '../actions/action.types';

export function reducer(state = {}, action) {
    switch (action.type) {
        case REPLACE_CATEGORIES:
            const { categories } = action;

            return categories;
        default:
            return state;
    }
}