import React, { Component } from 'react';
import { connect } from 'react-redux'
import * as moment from 'moment';
import * as commentActions from '../actions/comments';
import { withRouter } from 'react-router-dom';
import CommentForm from './CommentForm';
import * as uuid from 'uuid';
import * as postActions from '../../posts/actions/posts';
import { Comment } from './Comment';

class CommentList extends Component {
    state = {
        newCommentFormOpen: false,
        editCommentFormId: null
    };

    upVote = (commentId) => {
        this.props.dispatch(commentActions.voteComment(commentId, 'upVote'));
    };

    downVote = (commentId) => {
        this.props.dispatch(commentActions.voteComment(commentId, 'downVote'));
    };

    formatDate = (date) => {
        return moment(date).fromNow();
    };

    onDeleteComment = (comment, e) => {
        e.preventDefault();

        this.props.dispatch(commentActions.deleteComment(comment.id));
        this.updatePostCommentCount(false);
    };

    onEditComment = (comment, e) => {
        e.preventDefault();

        this.setState({newCommentFormOpen: false, editCommentFormId: comment.id});
    };

    submitComment = (values, comment) => {
        if (comment) {
            this.props.dispatch(commentActions.updateComment(comment.id, values.body, Date.now()));
        }
        else {
            const comment = {
                id: uuid.v4(),
                timestamp: Date.now(),
                body: values.body,
                author: values.name,
                parentId: this.props.match.params.id
            };
            this.props.dispatch(commentActions.createComment(comment));
            this.updatePostCommentCount(true);
        }

        this.setState({newCommentFormOpen: false, editCommentFormId: null});
    };

    updatePostCommentCount(adding) {
        const post = Object.entries(this.props.posts).find(post => post[1].id === this.props.match.params.id)[1];
        post.commentCount = adding ? post.commentCount + 1 : post.commentCount - 1;
        this.props.dispatch(postActions.addPost(post))
    }

    render() {
        const comments = Object.entries(this.props.comments)
            .sort((comment1, comment2) => comment1[1].voteScore < comment2[1].voteScore);

        return (
            <div>
                {comments.length === 0 && (
                    <p>There are currently no comments.</p>
                )}

                {
                    this.state.newCommentFormOpen && (
                        <CommentForm onCommentSubmit={this.submitComment}
                                     onCancel={() => {
                                         this.setState({newCommentFormOpen: false})
                                     }}/>
                    )
                }

                {
                    !this.state.newCommentFormOpen && (
                        <p>
                            <button className="ui button green" onClick={() => {
                                this.setState({newCommentFormOpen: true, editCommentFormId: null})
                            }}>
                                Add new comment
                            </button>
                        </p>
                    )
                }


                {comments.length > 0 && comments.map((comment) => (
                    <div key={comment[1].id}>
                        {
                            this.state.editCommentFormId === comment[1].id && (
                                <CommentForm comment={comment[1]}
                                             onCommentSubmit={this.submitComment}
                                             onCancel={() => {
                                                 this.setState({editCommentFormId: null})
                                             }}/>
                            )
                        }

                        {this.state.editCommentFormId !== comment[1].id && (
                            <Comment comment={comment[1]}
                                timestamp={this.formatDate(comment[1].timestamp)}
                                upVote={this.upVote}
                                downVote={this.downVote}
                                onDeleteComment={this.onDeleteComment}
                                     onEditComment={this.onEditComment}/>
                        )}
                    </div>
                ))}


            </div>
        );
    }
}

function mapStateToProps({comments, posts}) {
    return {
        comments,
        posts
    };
}

export default withRouter(connect(
    mapStateToProps
)(CommentList));