import { ADD_COMMENT, REMOVE_COMMENT, REPLACE_COMMENTS } from '../actions/action.types';

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

        case REMOVE_COMMENT:
            const { removeComment } = action;

            let newState = { ...state };
            delete newState[removeComment.id];

            return newState;

        default:
            return state;
    }
}