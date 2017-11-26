import { ADD_COMMENT, REPLACE_COMMENTS } from '../actions/comments';

export function reducer(state = {}, action) {
    switch (action.type) {
        case REPLACE_COMMENTS:
            const { comments } = action;

            return comments;

        case ADD_COMMENT:
            const { comment } = action;

            return {
                ...state,
                [comment.id]: comment
            };

        default:
            return state;
    }
}