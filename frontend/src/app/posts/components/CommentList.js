import React, { Component } from 'react';
import { connect } from 'react-redux'
import * as moment from 'moment';
import { voteComment } from '../actions/comments';
import { withRouter } from 'react-router-dom';

class CommentList extends Component {
    upVote = (commentId) => {
        this.props.dispatch(voteComment(commentId, 'upVote'));
    };

    downVote = (commentId) => {
        this.props.dispatch(voteComment(commentId, 'downVote'));
    };

    formatDate = (date) => {
        return moment(date).fromNow();
    };

    render() {
        const comments = Object.entries(this.props.comments)
            .sort((comment1, comment2) => comment1[1].voteScore < comment2[1].voteScore);

        return (
            <div>
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

                {comments.length === 0 && (
                    <p>There are currently no comments.</p>
                )}
            </div>
        );
    }
}

function mapStateToProps({comments}) {
    return {
        comments
    };
}

export default withRouter(connect(
    mapStateToProps
)(CommentList));