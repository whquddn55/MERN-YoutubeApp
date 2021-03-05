import React, {useState, useEffect} from 'react';
import {useSelector} from 'react-redux';
import { Comment, Avatar, Button, Input} from 'antd';
import axios from 'axios';
import LikeDislikes from './LikeDislikes';

function SingleComment(props) {
    const [openReply, setOpenReply] = useState(false);
    const [replyText, setReplyText] = useState('');
    const [childCount, setChildCount] = useState(0);
    const [showReplyComment, setShowReplyComment] = useState(false);
    const user = useSelector(state => state.user);

    useEffect(() => {
        setChildCount( 
            props.commentList.reduce((sum, comment) => {
            if (comment.responseTo == props.comment._id)
                ++sum;
            return sum;
        }, 0)
        );
    }, [props.commentList])

    const onReplyOpenClick = () => {
        setOpenReply(!openReply);
    }

    const onReplyContentChange = (event) => {
        setReplyText(event.currentTarget.value);
    }

    const onSubmitClick = (event) => {
        event.preventDefault();

        const commentVariable = {
            content : replyText,
            writer: user.userData._id,
            postId: props.postId,
            responseTo: props.comment._id
        }

        axios.post('/api/comment/saveComment', commentVariable)
            .then(response => {
                if (response.data.success) {
                    setReplyText('');
                    setOpenReply(false);
                    props.refreshComment(response.data.result);
                }
                else {
                    alert("Fail to save comment");
                }
            })
    }

    const viewMoreCommentClick = (event) => {
        setShowReplyComment(!showReplyComment);
    }

    const renderReplyComment = () => (
        props.commentList.map((value, index) => (
            (value.responseTo == props.comment._id) &&
            (<div key = {index} style = {{marginLeft:'40px'}}>
                <SingleComment refreshComment = {props.refreshComment} commentList = {props.commentList} comment = {value} postId = {props.postId}/>
            </div>)
        ))
    )

    const renderChild = () => (
        <div>
            {childCount != 0 && 
                <p style = {{fontSize: '14px', margin: 0, color:  'gray'}} onClick = {viewMoreCommentClick}>
                    {showReplyComment ? `Close` : `View ${childCount} more comment(s)` }
                </p>
            }

            {showReplyComment && renderReplyComment()}
        </div>
    )

    return (
        <div>
            <Comment
                actions = {[
                    <span onClick = {onReplyOpenClick} key = "comment-basic-reply-to">Reply to</span>,
                    <LikeDislikes commentId = {props.comment._id}/>
                ]}
                author = {props.comment.writer.name}
                avatar = {<Avatar src = {props.comment.writer.image} alt />}
                content = {props.comment.content}
            />

            {openReply && 
                <form style = {{display : 'flex'}} onSubmit = {onSubmitClick} >
                    <Input.TextArea
                        style = {{width : '100%', orderRadius : '5px', marginLeft: '40px'}}
                        onChange = {onReplyContentChange}
                        value = {replyText}
                        placeholder="Type the comments"
                    />
                    <br/>
                    <Button style = {{width : '20%', height : '52px'}} onClick = {onSubmitClick}>Submit</Button>
                </form>
            }

            {renderChild()}
        </div>
    )
}

export default SingleComment;
