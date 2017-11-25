import React, { Component } from 'react';
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom';
import * as moment from 'moment';

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

    render() {
        const {category} = this.props.match.params;

        return (
            <div>
                {
                    category ? (
                            <h1 className="ui header">Posts in category {category}</h1>
                        )
                        : (
                            <h1 className="ui header">All posts</h1>
                        )
                }

                {this.getPosts().map((post) => (
                    <div className="ui fluid card" key={post[1].id}>
                        <div className="content">
                            <div className="header">{post[1].title}</div>
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
                            <div className="ui basic green button">
                                Upvote
                            </div>
                            <div className="ui basic red button">
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