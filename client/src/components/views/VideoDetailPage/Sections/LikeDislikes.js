import React, {useEffect, useState} from 'react'
import {useSelector} from 'react-redux';
import {Tooltip} from 'antd';
import {LikeOutlined, LikeFilled, DislikeOutlined, DislikeFilled} from '@ant-design/icons';
import axios from 'axios';

function Likedislikes(props) {
    const [likeCount, setLikeCount] = useState(0);
    const [liked, setLiked] = useState(false);
    const [dislikeCount, setDislikeCount] = useState(0);
    const [disliked, setDisliked] = useState(false);

    const user = useSelector(state => state.user);

    let variable;
    if (props.video) {
        variable = { postId: props.postId, userId: user.userData._id}
    }
    else {
        variable = { commentId: props.commentId, userId: user.userData._id}
    }

    useEffect(() => {
        axios.post('/api/like/getLikes', variable)
            .then( response => {
                if (response.data.success) {
                    setLikeCount(response.data.likes.length);
                    response.data.likes.map(like => {
                        if (like.userId == user.userData._id)
                            setLiked(true);
                    })
                }
                else {
                    alert("Fail to get likes info");
                }
            })

        axios.post('/api/like/getDislikes', variable)
        .then( response => {
            if (response.data.success) {
                setDislikeCount(response.data.dislikes.length);

                response.data.dislikes.map(dislike => {
                    if (dislike.userId == user.userData._id)
                        setDisliked(true);
                })
            }
            else {
                alert("Fail to get likes info");
            }
        })
    }, []);


    const onLikeClick = () => {
        if (liked) {
            axios.post('/api/like/unLike', variable)
                .then(response => {
                    if (response.data.success) {
                        setLikeCount(likeCount -1);
                        setLiked(false);
                    }
                    else {
                        alert("Fail to unLike");
                    }
                })
        }
        else {
            axios.post('/api/like/upLike', variable)
                .then(response => {
                    if (response.data.success) {
                        setLikeCount(likeCount + 1);
                        setLiked(true);

                        if (disliked) {
                            setDislikeCount(dislikeCount - 1);
                            setDisliked(false);
                        }
                    }
                    else {
                        alert("Fail to like");
                    }
                })
        }
    }

    const onDislikeClick = () => {
        if (disliked) {
            axios.post('/api/like/unDislike', variable)
                .then(response => {
                    if (response.data.success) {
                        setDislikeCount(dislikeCount -1);
                        setDisliked(false);
                    }
                    else {
                        alert("Fail to unLike");
                    }
                })
        }
        else {
            axios.post('/api/like/upDislike', variable)
                .then(response => {
                    if (response.data.success) {
                        setDislikeCount(dislikeCount + 1);
                        setDisliked(true);

                        if (liked) {
                            setLikeCount(likeCount - 1);
                            setLiked(false);
                        }
                    }
                    else {
                        alert("Fail to like");
                    }
                })
        }
    }


    return (
        <div>
            <span key = "comment-basic-like">
                <Tooltip title = "Like">
                    {liked ? 
                    <LikeFilled 
                        onClick = {onLikeClick}
                    /> : 
                    <LikeOutlined 
                        onClick = {onLikeClick}
                    />
                    }
                </Tooltip>
                <span style = {{paddingLeft : '8px', cursor : 'auto'}}>{likeCount}</span>
            </span>&nbsp;&nbsp;
            <span key = "comment-basic-dislike">
                <Tooltip title = "Dislike">
                {disliked ? 
                    <DislikeFilled 
                        onClick = {onDislikeClick}
                    /> : 
                    <DislikeOutlined 
                        onClick = {onDislikeClick}
                    />
                    }
                </Tooltip>
                <span style = {{paddingLeft : '8px', cursor : 'auto'}}>{dislikeCount}</span>
            </span>&nbsp;&nbsp;
            
        </div>
    )
}

export default Likedislikes
