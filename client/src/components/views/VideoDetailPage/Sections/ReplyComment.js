import React, {useState, useEffect} from 'react';
import {useSelector} from 'react-redux';
import SingleComment from './SingleComment';

function ReplyComment(props) {
    const [childCount, setChildCount] = useState(0);
    const [showReplyComment, setShowReplyComment] = useState(false);
    const user = useSelector(state => state.user);

    useEffect(() => {
        let commentCount = 0;
        props.commentList.map(comment => {
            if (comment.responseTo == props.parentCommentId)
                commentCount++;
        })
        setChildCount(commentCount);
    }, [props.commentList])


    const renderReplyComment = () => (
        props.commentList.map((comment, index) => (
            (comment.responseTo === props.parentCommentId) &&
            (<div key = {index} style = {{marginLeft:'40px'}}>
                <SingleComment refreshComment = {props.refreshComment} comment = {comment} postId = {props.postId}/>
                <ReplyComment refreshComment = {props.refreshComment} commentList = {props.commentList} parentCommentId = {comment._id}  postId = {props.postId}/>
            </div>)
        ))
    )

    const viewMoreCommentClick = (event) => {
        setShowReplyComment(!showReplyComment);
    }

    return (
        <div>
            {childCount != 0 && 
                <p style = {{fontSize: '14px', margin: 0, color:  'gray'}} onClick = {viewMoreCommentClick}>
                    {showReplyComment ? `Close` : `View ${childCount} more comment(s)` }
                </p>
            }

            {showReplyComment && renderReplyComment()}
        </div>
    )
}

export default ReplyComment
