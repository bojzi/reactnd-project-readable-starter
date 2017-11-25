import React, { Component } from 'react';
import { connect } from 'react-redux'
import { Link, withRouter } from 'react-router-dom';
import * as moment from 'moment';
import { votePost } from '../actions/posts';

class PostList extends Component {
    formatDate = (date) => {
        return moment(date).fromNow();
    };

    getPosts = () => {
        const posts = Object.entries(this.props.posts);
        const {category} = this.props.match.params;

        if (!category || posts.length === 0) return posts;

        return posts.filter(post => post[1].category === category);
    };

    upVote = (postId) => {
        this.props.dispatch(votePost(postId, 'upVote'));
    };

    downVote = (postId) => {
        this.props.dispatch(votePost(postId, 'downVote'));
    };

    render() {
        const {category} = this.props.match.params;

        return (
            <div>
                {
                    category ? (
                            <h2 className="ui header">Posts in category {category}</h2>
                        )
                        : (
                            <h2 className="ui header">All posts</h2>
                        )
                }

                {this.getPosts().map((post) => (
                    <div className="ui fluid card" key={post[1].id}>
                        <div className="content">
                            <div className="header">
                                <Link to={'/post/' + post[1].id }>
                                    {post[1].title}
                                </Link>
                            </div>
                            <div className="meta">
                                <span>Posted {this.formatDate(post[1].timestamp)} by {post[1].author} in {post[1].category}</span>
                            </div>
                        </div>

                        <div className="extra content">
                            <span className="right floated">
                                <i className="icon comment"></i>
                                Comments: {post[1].commentCount}
                            </span>
                            <span>
                                <i className="icon heart"></i>
                                Score: {post[1].voteScore}
                            </span>
                        </div>

                        <div className="ui two bottom attached buttons">
                            <div className="ui basic green button"
                                onClick={() => this.upVote(post[1].id)}>
                                Upvote
                            </div>
                            <div className="ui basic red button"
                                 onClick={() => this.downVote(post[1].id)}>
                                Downvote
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        )
    }
}

function mapStateToProps({posts}) {
    return {
        posts
    };
}

export default withRouter(connect(
    mapStateToProps
)(PostList));