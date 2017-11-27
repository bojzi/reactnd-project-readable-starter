import * as ReadableAPIUtil from '../../../utils/api';
import { ADD_COMMENT, REMOVE_COMMENT, REPLACE_COMMENTS } from './action.types';

export const fetchComments = (postId) => dispatch => {
    ReadableAPIUtil
        .fetchComments(postId)
        .then(comments => dispatch(replaceComments(comments)));
};

export const voteComment = (commentId, vote) => dispatch => {
    ReadableAPIUtil
        .voteComment(commentId, vote)
        .then(res => dispatch(addComment(res)));
};

export const createComment = (comment) => dispatch => {
    ReadableAPIUtil
        .createComment(comment)
        .then(res => dispatch(addComment(res)));
};

export const deleteComment = (commentId) => dispatch => {
    ReadableAPIUtil
        .deleteComment(commentId)
        .then(res => dispatch(removeComment(res)));
};

export const updateComment = (commentId, body, timestamp) => dispatch => {
    ReadableAPIUtil
        .updateComment(commentId, body, timestamp)
        .then(res => dispatch(addComment(res)));
};

export const addComment = (comment) => {
    return {
        type: ADD_COMMENT,
        comment: comment
    }
};

export const removeComment = (comment) => {
    return {
        type: REMOVE_COMMENT,
        removeComment: comment
    }
};

export const replaceComments = (comments) => {
    const reducedComments = comments.reduce((allComments, comment) => {
        return {
            ...allComments,
            [comment.id]: comment
        }
    }, {});

    return {
        type: REPLACE_COMMENTS,
        comments: reducedComments
    }
};