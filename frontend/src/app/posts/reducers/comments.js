import { REPLACE_COMMENTS } from '../actions/comments';

export function reducer(state = {}, action) {
    switch (action.type) {
        case REPLACE_COMMENTS:
            const { comments } = action;

            return comments;

        default:
            return state;
    }
}