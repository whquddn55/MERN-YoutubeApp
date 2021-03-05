import React, {useState} from 'react';
import {useSelector} from 'react-redux';
import { Comment, Avatar, Button, Input} from 'antd';
import axios from 'axios';

function SingleComment(props) {
    const [openReply, setOpenReply] = useState(false);
    const [replyText, setReplyText] = useState('');
    const user = useSelector(state => state.user);


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

    const actions = [
        <span onClick = {onReplyOpenClick} key = "comment-basic-reply-to">Reply to</span>
    ]

    return (
        <div>
            <Comment
                actions = {actions}
                author = {props.comment.writer.name}
                avatar = {<Avatar src = {props.comment.writer.image} alt />}
                content = {props.comment.content}
            />
            {openReply && 
                <form style = {{display : 'flex'}} onSubmit = {onSubmitClick} >
                    <Input.TextArea
                        style = {{width : '100%', orderRadius : '5px'}}
                        onChange = {onReplyContentChange}
                        value = {replyText}
                        placeholder="Type the comments"
                    />
                    <br/>
                    <Button style = {{width : '20%', height : '52px'}} onClick = {onSubmitClick}>Submit</Button>
                </form>
            }
        </div>
    )
}

export default SingleComment;
