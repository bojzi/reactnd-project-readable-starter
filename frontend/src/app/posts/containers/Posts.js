import React, { Component } from 'react';
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom';
import serializeForm from 'form-serialize';
import * as uuid from 'uuid';
import { createPost } from '../actions/posts';

class Posts extends Component {
    handleAddPost = (e) => {
        e.preventDefault();

        const values = serializeForm(e.target, { hash: true });
        const post = {
            id: uuid.v4(),
            timestamp: Date.now(),
            title: values.title,
            body: values.body,
            author: values.name,
            category: values.category
        };

        this.props.dispatch(createPost(post));
    };

    render() {
        const {categories} = this.props;

        return (
            <div>
                <h1 className="ui header">Add Post</h1>
                <form className="ui form" onSubmit={this.handleAddPost}>
                    <div className="field">
                        <label htmlFor="post-title">Title</label>
                        <input type="text" id="post-title" name="title" placeholder="Title"/>
                    </div>
                    <div className="field">
                        <label htmlFor="post-body">Content</label>
                        <textarea name="body" id="post-body" cols="30" rows="10" defaultValue="Content"></textarea>
                    </div>
                    <div className="field">
                        <label htmlFor="post-name">Your name</label>
                        <input type="text" id="post-name" name="name" placeholder="Your name"/>
                    </div>
                    <div className="field">
                        <label htmlFor="post-category">Category</label>
                        <select name="category" id="post-category">
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

function mapStateToProps({categories}) {
    return {
        categories
    };
}

export default withRouter(connect(
    mapStateToProps
)(Posts));