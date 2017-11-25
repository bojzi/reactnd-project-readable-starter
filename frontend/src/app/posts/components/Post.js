import React, { Component } from 'react';
import * as moment from 'moment';
import PropTypes from 'prop-types';
import { Link, withRouter } from 'react-router-dom';

class Post extends Component {
    static propTypes = {
        post: PropTypes.object,
        basic: PropTypes.bool.isRequired,
        onVote: PropTypes.func.isRequired,
        onDelete: PropTypes.func
    };

    formatDate = (date) => {
        return moment(date).fromNow();
    };

    render() {
        const {post, basic, onVote, onDelete} = this.props;

        return (
            <div>
                {
                    post ? (
                            <div>
                                <div className="ui fluid card">
                                    <div className="content">
                                        {basic ? (
                                            <p><Link to={'/post/' + post.id}>{post.title}</Link></p>
                                        ) : (
                                            <div>
                                                <div className="header">
                                                    <a title="Delete post"
                                                       href="delete-post"
                                                       onClick={(e) => { onDelete(post.id, e) }}
                                                       className="right floated">
                                                        <i className="icon trash"></i>
                                                    </a>
                                                    <Link title="Edit post" to={'/edit-post/' + post.id} className="right floated">
                                                        <i className="icon pencil"></i>
                                                    </Link>
                                                    <h3 style={{marginTop: 0}}>{post.title}</h3>
                                                </div>
                                                <div className="meta" style={{marginBottom: '12px'}}>
                                                        <span>Posted {this.formatDate(post.timestamp)}
                                                            by {post.author}
                                                            in {post.category}</span>
                                                </div>
                                                <p>
                                                    {post.body}
                                                </p>
                                            </div>
                                        )}
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
                                             onClick={(e) => onVote(post.id, 'upVote', e)}>
                                            Upvote
                                        </div>
                                        <div className="ui basic red button"
                                             onClick={(e) => onVote(post.id, 'downVote', e)}>
                                            Downvote
                                        </div>
                                    </div>
                                </div>
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

export default withRouter(Post);