import * as ReadableAPIUtil from '../../../utils/api';

export const ADD_POST = 'ADD_POST';
export const REMOVE_POST = 'REMOVE_POST';
export const REPLACE_POSTS = 'REPLACE_POSTS';

export const fetchPosts = (posts) => dispatch => {
    ReadableAPIUtil
        .fetchPosts()
        .then(posts => dispatch(replacePosts(posts)));
};

export const deletePost = (postId) => dispatch => {
    ReadableAPIUtil
        .deletePost(postId)
        .then(res => dispatch(removePost(res)));
};

export const createPost = (post) => dispatch => {
    ReadableAPIUtil
        .createPost(post)
        .then(res => dispatch(addPost(res)));
};

export const updatePost = (postId, title, body) => dispatch => {
    ReadableAPIUtil
        .updatePost(postId, title, body)
        .then(res => dispatch(addPost(res)));
};

export const votePost = (postId, vote) => dispatch => {
    ReadableAPIUtil
        .votePost(postId, vote)
        .then(res => dispatch(addPost(res)));
};

export const addPost = (post) => {
    return {
        type: ADD_POST,
        post: post
    }
};

export const removePost = (post) => {
    return {
        type: REMOVE_POST,
        removePost: post
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