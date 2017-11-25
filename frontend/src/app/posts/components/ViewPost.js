import React, { Component } from 'react';
import { connect } from 'react-redux'
import * as moment from 'moment';
import { fetchComments } from '../actions/comments';
import { withRouter } from 'react-router-dom';

class ViewPost extends Component {
    componentDidMount() {
        const {id} = this.props.match.params;
        this.props.dispatch(fetchComments(id));
    };

    formatDate = (date) => {
        return moment(date).fromNow();
    };

    render() {
        const posts = Object.entries(this.props.posts);
        const comments = Object.entries(this.props.comments);
        const {id} = this.props.match.params;

        const post = posts.length > 0 ? posts.find(post => post[1].id === id)[1] : null;
        console.log(post);

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
                                        <div className="ui basic green button">
                                            Upvote
                                        </div>
                                        <div className="ui basic red button">
                                            Downvote
                                        </div>
                                    </div>
                                </div>

                                <h3 className="ui header">Comments</h3>
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
                                            <div className="ui basic green button">
                                                Upvote
                                            </div>
                                            <div className="ui basic red button">
                                                Downvote
                                            </div>
                                        </div>
                                    </div>
                                ))}

                                {comments.length === 0 && (
                                    <p>There are currently no comments.</p>
                                )}
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

function mapStateToProps({posts, comments}) {
    return {
        posts,
        comments
    };
}

export default withRouter(connect(
    mapStateToProps
)(ViewPost));