import React, { Component } from 'react';
import { connect } from 'react-redux'
import * as moment from 'moment';
import { createComment, voteComment } from '../actions/comments';
import { withRouter } from 'react-router-dom';
import CommentForm from './CommentForm';
import * as uuid from 'uuid';
import { addPost } from '../../posts/actions/posts';

class CommentList extends Component {
    state = {
        newCommentFormOpen: false
    };

    upVote = (commentId) => {
        this.props.dispatch(voteComment(commentId, 'upVote'));
    };

    downVote = (commentId) => {
        this.props.dispatch(voteComment(commentId, 'downVote'));
    };

    formatDate = (date) => {
        return moment(date).fromNow();
    };

    submitComment = (values) => {
        const comment = {
            id: uuid.v4(),
            timestamp: Date.now(),
            body: values.body,
            author: values.name,
            parentId: this.props.match.params.id
        };
        this.props.dispatch(createComment(comment));
        this.setState({newCommentFormOpen: false});

        const post = Object.entries(this.props.posts).find(post => post[1].id === this.props.match.params.id)[1];
        post.commentCount = post.commentCount + 1;
        this.props.dispatch(addPost(post))
    };

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
                        <button className="ui button green" onClick={() => {
                            this.setState({newCommentFormOpen: true})
                        }}>
                            Add new comment
                        </button>
                    )
                }


                {comments.length > 0 && comments.map((comment) => (
                    <div className="ui fluid card" key={comment[1].id}>
                        <div className="content">
                            <div className="meta">
                                <span>Posted {this.formatDate(comment[1].timestamp)}
                                    by {comment[1].author}</span>
                            </div>
                            <p>
                                {comment[1].body}
                            </p>
                        </div>
                        <div className="extra content">
                            <span>
                                <i className="icon heart"></i>
                                Score: {comment[1].voteScore}
                            </span>
                        </div>
                        <div className="ui two bottom attached buttons">
                            <div className="ui basic green button"
                                 onClick={() => this.upVote(comment[1].id)}>
                                Upvote
                            </div>
                            <div className="ui basic red button"
                                 onClick={() => this.downVote(comment[1].id)}>
                                Downvote
                            </div>
                        </div>
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