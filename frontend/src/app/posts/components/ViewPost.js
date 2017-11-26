import React, { Component } from 'react';
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom';
import { deletePost, votePost } from '../actions/posts';
import Post from './Post';
import CommentList from '../../comments/components/CommentList';
import { fetchComments } from '../../comments/actions/comments';

class ViewPost extends Component {
    componentDidMount() {
        const {id} = this.props.match.params;
        this.props.dispatch(fetchComments(id));
    };

    vote = (postId, vote) => {
        this.props.dispatch(votePost(postId, vote));
    };

    deleteViewingPost = (postId, e) => {
        e.preventDefault();
        this.props.dispatch(deletePost(postId));
        this.props.history.push('/');
    };

    render() {
        const posts = Object.entries(this.props.posts);
        const {id} = this.props.match.params;

        let post = null;
        if (posts.length > 0) {
            post = posts.find(post => post[1].id === id)[1];
        }

        return (
            <div>
                <h2 className="ui header">View post</h2>

                <Post post={post}
                      basic={false}
                      onVote={this.vote}
                      onDelete={this.deleteViewingPost}/>

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