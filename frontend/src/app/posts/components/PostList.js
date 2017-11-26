import React, { Component } from 'react';
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom';
import { deletePost, votePost } from '../actions/posts';
import Post from './Post';
import './PostList.css';

class PostList extends Component {
    state = {
        sorting: SORTING_VOTE_SCORE
    };

    changeSorting(sort, e) {
        e.preventDefault();
        this.setState({ sorting: sort });
    }

    deletePostInList = (postId, e) => {
        e.preventDefault();
        this.props.dispatch(deletePost(postId));
    };

    getPosts = () => {
        let posts = Object.entries(this.props.posts);
        const {category} = this.props.match.params;

        if (category && posts.length > 0) {
            posts = posts.filter(post => post[1].category === category)
        }

        return posts.sort((post1, post2) => {
            if (this.state.sorting === SORTING_VOTE_SCORE) {
                return post1[1].voteScore < post2[1].voteScore
            }
            else if (this.state.sorting === SORTING_TIMESTAMP) {
                return post1[1].timestamp < post2[1].timestamp
            }

            return true;
        });
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

                <p>
                    Order by:&nbsp;
                    <a className={this.state.sorting === SORTING_VOTE_SCORE ? 'selected' : ''}
                       href="change-sorting"
                       onClick={(e) => { this.changeSorting(SORTING_VOTE_SCORE, e) }}>score</a> |&nbsp;
                    <a className={this.state.sorting === SORTING_TIMESTAMP ? 'selected' : ''}
                       href="change-sorting"
                       onClick={(e) => { this.changeSorting(SORTING_TIMESTAMP, e) }}>timestamp</a>
                </p>

                {this.getPosts().map((post) => (
                    <div style={{marginBottom: '24px'}} key={post[1].id}>
                        <Post post={post[1]}
                              basic={true}
                              onVote={this.vote}
                              onDelete={this.deletePostInList}/>
                    </div>
                ))}
            </div>
        )
    }
}

const SORTING_VOTE_SCORE = 'voteScore';
const SORTING_TIMESTAMP = 'timestamp';

function mapStateToProps({posts}) {
    return {
        posts
    };
}

export default withRouter(connect(
    mapStateToProps
)(PostList));