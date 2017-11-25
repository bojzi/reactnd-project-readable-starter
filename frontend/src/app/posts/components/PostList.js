import React, { Component } from 'react';
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom';
import { votePost } from '../actions/posts';
import Post from './Post';

class PostList extends Component {
    getPosts = () => {
        const posts = Object.entries(this.props.posts);
        const {category} = this.props.match.params;

        if (!category || posts.length === 0) return posts;

        return posts.filter(post => post[1].category === category);
    };

    vote = (postId, vote) => {
        this.props.dispatch(votePost(postId, vote));
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
                    <div style={{marginBottom: '24px'}} key={post[1].id}>
                        <Post post={post[1]}
                              basic={true}
                              onVote={this.vote}/>
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