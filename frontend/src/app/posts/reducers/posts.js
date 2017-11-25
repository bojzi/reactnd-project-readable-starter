import { ADD_POST } from '../actions/posts';

export function reducer(state = {}, action) {
    switch (action.type) {
        case ADD_POST:
            const { post } = action;

            return {
                ...state,
                [post.id]: post
            };
        default:
            return state;
    }
}