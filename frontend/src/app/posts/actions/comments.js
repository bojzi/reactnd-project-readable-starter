import * as ReadableAPIUtil from '../../../utils/api';

export const REPLACE_COMMENTS = 'REPLACE_COMMENTS';

export const fetchComments = (postId) => dispatch => {
    ReadableAPIUtil
        .fetchComments(postId)
        .then(comments => dispatch(replaceComments(comments)));
};

export const replaceComments = (comments) => {
    return {
        type: REPLACE_COMMENTS,
        comments: comments
    }
};