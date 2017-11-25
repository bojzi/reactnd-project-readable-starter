import * as ReadableAPIUtil from '../../../utils/api';

export const ADD_POST = 'ADD_POST';

export const createPost = (post) => dispatch => {
    ReadableAPIUtil
        .createPost(post)
        .then((res) => dispatch(addPost(res)));
};

export const addPost = (post) => {
    return {
        type: ADD_POST,
        post: post
    }
};