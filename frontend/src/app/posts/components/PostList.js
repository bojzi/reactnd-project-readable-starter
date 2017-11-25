import React, { Component } from 'react';
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom';

class PostList extends Component {
    formatDate = (date) => {
        return (new Date(date)).toString();
    };

    render() {
        const {posts} = this.props;

        return (
            <div>
                <h1 className="ui header">Posts</h1>
                <div className="ui relaxed divided list">
                    {Object.entries(posts).map((post) => (
                        <div className="item" key={post[1].id}>
                            <div className="header">{post[1].title}</div>
                            Posted by: {post[1].author} at {this.formatDate(post[1].timestamp)}
                        </div>
                    ))}
                </div>
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