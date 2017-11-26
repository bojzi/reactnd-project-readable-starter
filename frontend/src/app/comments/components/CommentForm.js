import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import serializeForm from 'form-serialize';
import PropTypes from 'prop-types';

class CommentForm extends Component {
    static propTypes = {
        comment: PropTypes.object,
        onCommentSubmit: PropTypes.func.isRequired,
        onCancel: PropTypes.func.isRequired
    };

    handleCommentForm = (e) => {
        e.preventDefault();

        const values = serializeForm(e.target, {hash: true});

        this.props.onCommentSubmit(values);
    };

    componentWillReceiveProps(props) {
        if (props.comment) {
            const comment = props.comment;

            if (comment) {
                this.refs.commentBody.value = comment.body;
                this.refs.commentName.value = comment.author;
            }
        }
    }


    render() {
        const {comment} = this.props;

        return (
            <div className="ui segment">
                <h3 className="ui header">{comment ? 'Edit' : 'Add'} Comment</h3>
                <form className="ui form" onSubmit={this.handleCommentForm}>
                    <div className="field">
                        <label htmlFor="comment-body">Comment</label>
                        <textarea name="body" ref="commentBody" id="comment-body" cols="30" rows="10"
                                  defaultValue={comment ? comment.body : ''}></textarea>
                    </div>
                    {
                        !comment && (
                            <div>
                                <div className="field">
                                    <label htmlFor="comment-name">Your name</label>
                                    <input type="text" ref="commentName" id="comment-name" name="name"
                                           defaultValue={comment ? comment.author : ''} placeholder="Your name"/>
                                </div>
                            </div>
                        )
                    }
                    <p>
                        <button className="ui button primary" type="submit">Submit</button>
                        <button type="button" className="ui button" onClick={this.props.onCancel}>Cancel</button>
                    </p>
                </form>
            </div>
        )
    }
}

export default withRouter(CommentForm);