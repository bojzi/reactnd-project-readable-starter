import * as ReadableAPIUtil from '../../../utils/api';

export const ADD_POST = 'ADD_POST';
export const REPLACE_POSTS = 'REPLACE_POSTS';

export const getPosts = (posts) => dispatch => {
    ReadableAPIUtil
        .fetchPosts()
        .then(posts => dispatch(replacePosts(posts)));
};

export const createPost = (post) => dispatch => {
    ReadableAPIUtil
        .createPost(post)
        .then(res => dispatch(addPost(res)));
};

export const addPost = (post) => {
    return {
        type: ADD_POST,
        post: post
    }
};

export const replacePosts = (posts) => {
    const reducedPosts = posts.reduce((allPosts, post) => {
        return {
            ...allPosts,
            [post.id]: post
        }
    }, {});

    return {
        type: REPLACE_POSTS,
        posts: reducedPosts
    }
};