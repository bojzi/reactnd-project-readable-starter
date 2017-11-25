import React, { Component } from 'react';
import { connect } from 'react-redux'
import * as moment from 'moment';
import { fetchComments } from '../actions/comments';
import { withRouter } from 'react-router-dom';
import { votePost } from '../actions/posts';
import CommentList from './CommentList';

class ViewPost extends Component {
    componentDidMount() {
        const {id} = this.props.match.params;
        this.props.dispatch(fetchComments(id));
    };

    upVote = (postId) => {
        this.props.dispatch(votePost(postId, 'upVote'));
    };

    downVote = (postId) => {
        this.props.dispatch(votePost(postId, 'downVote'));
    };

    formatDate = (date) => {
        return moment(date).fromNow();
    };

    render() {
        const posts = Object.entries(this.props.posts);
        const {id} = this.props.match.params;

        const post = posts.length > 0 ? posts.find(post => post[1].id === id)[1] : null;

        return (
            <div>
                <h2 className="ui header">View post</h2>
                {
                    post ? (
                            <div>
                                <div className="ui fluid card">
                                    <div className="content">
                                        <div className="header">
                                            {post.title}
                                        </div>
                                        <div className="meta">
                                            <span>Posted {this.formatDate(post.timestamp)} by {post.author}
                                                in {post.category}</span>
                                        </div>
                                        <p>
                                            {post.body}
                                        </p>
                                    </div>
                                    <div className="extra content">
                                        <span className="right floated">
                                            <i className="icon comment"></i>
                                            Comments: {post.commentCount}
                                        </span>
                                        <span>
                                            <i className="icon heart"></i>
                                            Score: {post.voteScore}
                                        </span>
                                    </div>
                                    <div className="ui two bottom attached buttons">
                                        <div className="ui basic green button"
                                             onClick={() => this.upVote(post.id)}>
                                            Upvote
                                        </div>
                                        <div className="ui basic red button"
                                             onClick={() => this.downVote(post.id)}>
                                            Downvote
                                        </div>
                                    </div>
                                </div>

                                <CommentList/>
                            </div>
                        )
                        :
                        (
                            <p>Unknown post.</p>
                        )
                }
            </div>
        );
    }
}

function mapStateToProps({posts}) {
    return {
        posts
    };
}

export default withRouter(connect(
    mapStateToProps
)(ViewPost));