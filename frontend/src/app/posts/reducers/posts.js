import { ADD_POST, REMOVE_POST, REPLACE_POSTS } from '../actions/posts';

export function reducer(state = {}, action) {
    switch (action.type) {
        case REPLACE_POSTS:
            const { posts } = action;

            return posts;

        case ADD_POST:
            const { post } = action;

            return {
                ...state,
                [post.id]: post
            };

        case REMOVE_POST:
            const { removePost } = action;

            let newState = { ...state };
            delete newState[removePost.id];

            return newState;

        default:
            return state;
    }
}