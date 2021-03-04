import React, {useState, useEffect} from 'react'
import {useSelector} from 'react-redux';
import {Card, Avatar, Col, Typography, Row} from 'antd';
import Meta from 'antd/lib/card/Meta';
import Axios from 'axios';
import moment from 'moment';
const {Title} = Typography;

function SubscriptionPage() {
    const [videos, setVideos] = useState([]);
    const user = useSelector(state => state.user);

    useEffect(() => {
        if (user.userData) {
            const subscriptionVaraible = {
                userFrom : user.userData._id
            }
            Axios.post('/api/video/getSubscriptionVideos', subscriptionVaraible)
                .then(response => {
                    if (response.data.success) {
                        setVideos(response.data.videos);
                    }
                    else {
                        alert("Fail to get SubScriptionVideos");
                    }
                })
        }
    }, [user]);

    const renderCards = videos.map((video, index) => {
        let minutes = Math.floor(video.duration / 60);
        let seconds = Math.floor(video.duration % 60);

        return (<Col key = {index} lg ={6} md = {8} xs = {24}>
                    <a href = {`/video/${video._id}`}>
                        <div style = {{position : 'relative'}}>
                            <img style = {{width : '100%'}} src = {`http://localhost:3000/${video.thumbnail}`}/>
                            <div className = "duration">
                                <span>{minutes}:{seconds}</span>
                            </div>
                        </div>
                    </a>
                    <br/>
                        <Meta
                            avatar = {
                                <Avatar src = {video.writer.image}/>
                            }
                            title = {video.title}
                        />
                        <span>{video.writer.name}</span><br/>
                        <span style = {{marginLeft:'3rem'}}>{video.views} views</span> - <span>{moment(video.createdAt).format("YYYY Mo DD")}</span>
                </Col>
            );
    })

    return (
        <div style = {{ width : '85%', margin : '3rem auto'}}>
            <Title level = {2}>Recommanded</Title>
            <hr/>
            <Row gutter={[32, 16]}>
                {renderCards}
            </Row>
        </div>
    )
}

export default SubscriptionPage;
