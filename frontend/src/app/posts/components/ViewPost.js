import React, { Component } from 'react';
import { connect } from 'react-redux'
import { fetchComments } from '../actions/comments';
import { withRouter } from 'react-router-dom';
import { votePost } from '../actions/posts';
import CommentList from './CommentList';
import Post from './Post';

class ViewPost extends Component {
    componentDidMount() {
        const {id} = this.props.match.params;
        this.props.dispatch(fetchComments(id));
    };

    vote = (postId, vote) => {
        this.props.dispatch(votePost(postId, vote));
    };

    render() {
        const posts = Object.entries(this.props.posts);
        const {id} = this.props.match.params;

        const post = posts.length > 0 ? posts.find(post => post[1].id === id)[1] : null;

        return (
            <div>
                <h2 className="ui header">View post</h2>

                <Post post={post}
                      basic={false}
                      onVote={this.vote}/>

                <h3>Comments</h3>
                <CommentList/>
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