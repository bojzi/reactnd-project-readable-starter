import React from 'react';

export function Comment(props) {
    const {comment, timestamp, onDeleteComment, onEditComment, upVote, downVote} = props;

    return <div style={{marginBottom: '12px', marginTop: '12px'}} className="ui fluid card">
        <div className="content">
            <a title="Delete comment"
               href="delete-comment"
               onClick={(e) => {
                   onDeleteComment(props.comment, e)
               }}
               className="right floated">
                <i className="icon trash"></i>
            </a>
            <a title="Edit comment"
               href="edit-comment"
               onClick={(e) => {
                   onEditComment(props.comment, e)
               }}
               className="right floated">
                <i className="icon pencil"></i>
            </a>
            <div className="meta">
                <span>{timestamp} by {comment.author}</span>
            </div>
            <p>
                {comment.body}
            </p>
        </div>
        <div className="extra content">
            <span>
                <i className="icon heart"></i>
                Score: {comment.voteScore}
            </span>
        </div>
        <div className="ui two bottom attached buttons">
            <div className="ui basic green button"
                 onClick={() => upVote(comment.id)}>
                Upvote
            </div>
            <div className="ui basic red button"
                 onClick={() => downVote(comment.id)}>
                Downvote
            </div>
        </div>
    </div>
}