import React, {useState, useEffect} from 'react';
import {useSelector} from 'react-redux';
import {Input, Button} from 'antd';
import axios from 'axios';
import SingleComment from './SingleComment';
import ReplyComment from './ReplyComment';

function Comment(props) {
    const [commentText, setCommentText] = useState('');
    const user = useSelector(state => state.user);

    const onCommentChange = (event) => {
        setCommentText(event.currentTarget.value);
    }

    const onSubmitClick = (event) => {
        event.preventDefault();

        const commentVariable = {
            content : commentText,
            writer: user.userData._id,
            postId: props.postId,
        }

        axios.post('/api/comment/saveComment', commentVariable)
            .then(response => {
                if (response.data.success) {
                    setCommentText('');
                    props.refreshComment(response.data.result);
                }
                else {
                    alert("Fail to save comment");
                }
            })
    }

    return (
        <div>
            <br/>
            <p>Comments</p>
            <hr/>

            {/* Comment Lists*/}

            {props.commentList && 
            props.commentList.map((comment, index) => (
                (!comment.responseTo &&
                <div key = {index}>
                    <SingleComment refreshComment = {props.refreshComment} key = {index} comment = {comment} postId = {props.postId}/>
                    <ReplyComment refreshComment = {props.refreshComment} commentList = {props.commentList} parentCommentId = {comment._id} postId = {props.postId}/>
                </div>
            )))}

            

            {/* Root Comment Form */}
            <form style = {{display : 'flex'}} onSubmit = {onSubmitClick}>
                <Input.TextArea
                    style = {{width : '100%', orderRadius : '5px'}}
                    onChange = {onCommentChange}
                    value = {commentText}
                    placeholder="Type the comments"
                />
                <br/>
                <Button style = {{width : '20%', height : '52px'}} onClick = {onSubmitClick}>Submit</Button>
            </form>
        </div>
    )
}

export default Comment