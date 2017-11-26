import * as ReadableAPIUtil from '../../../utils/api';

export const REPLACE_COMMENTS = 'REPLACE_COMMENTS';
export const ADD_COMMENT = 'ADD_COMMENTS';

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

export const addComment = (comment) => {
    return {
        type: ADD_COMMENT,
        comment: comment
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