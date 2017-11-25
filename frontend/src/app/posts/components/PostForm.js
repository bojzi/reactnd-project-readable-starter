import React, { Component } from 'react';
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom';
import serializeForm from 'form-serialize';
import * as uuid from 'uuid';
import { createPost } from '../actions/posts';

class PostForm extends Component {
    handleAddPost = (e) => {
        e.preventDefault();

        let newPost = {};
        const values = serializeForm(e.target, {hash: true});

        if (this.props.match.params.id) {
            const post = getPost(this.props);

            newPost = {
                ...post,
                timestamp: Date.now(),
                title: values.title,
                body: values.body,
                author: values.name,
                category: values.category
            }
        }
        else {
            newPost = {
                id: uuid.v4(),
                timestamp: Date.now(),
                title: values.title,
                body: values.body,
                author: values.name,
                category: values.category
            };
        }

        this.props.dispatch(createPost(newPost));
        this.props.history.goBack();
    };

    componentWillReceiveProps(props) {
        if (this.props.match.params.id && props.posts) {
            const post = getPost(props);

            if (post) {
                this.refs.postTitle.value = post.title;
                this.refs.postBody.value = post.body;
                this.refs.postName.value = post.author;
                this.refs.postCategory.value = post.category;
            }
        }
    }


    render() {
        const {categories} = this.props;

        let post = {};
        if (this.props.match.params.id) {
            post = getPost(this.props);
        }

        return (
            <div>
                <h1 className="ui header">Add Post</h1>
                <form className="ui form" onSubmit={this.handleAddPost}>
                    <div className="field">
                        <label htmlFor="post-title">Title</label>
                        <input type="text" ref="postTitle" id="post-title" name="title"
                               defaultValue={post ? post.title : ''} placeholder="Title"/>
                    </div>
                    <div className="field">
                        <label htmlFor="post-body">Content</label>
                        <textarea name="body" ref="postBody" id="post-body" cols="30" rows="10"
                                  defaultValue={post ? post.body : ''}></textarea>
                    </div>
                    <div className="field">
                        <label htmlFor="post-name">Your name</label>
                        <input type="text" ref="postName" id="post-name" name="name"
                               defaultValue={post ? post.author : ''} placeholder="Your name"/>
                    </div>
                    <div className="field">
                        <label htmlFor="post-category">Category</label>
                        <select name="category" ref="postCategory" id="post-category"
                                defaultValue={post ? post.category : ''}>
                            {Object.entries(categories).map((category) => (
                                <option key={category[1].name} value={category[1].name}>
                                    {category[1].name}
                                </option>
                            ))}
                        </select>
                    </div>
                    <button className="ui button primary" type="submit">Submit post</button>
                </form>
            </div>
        )
    }
}

function getPost(props) {
    const {id} = props.match.params;
    const post = Object.entries(props.posts).find(post => post[1].id === id);
    return post ? post[1] : null;
}

function mapStateToProps({categories, posts}) {
    return {
        categories,
        posts
    };
}

export default withRouter(connect(
    mapStateToProps
)(PostForm));