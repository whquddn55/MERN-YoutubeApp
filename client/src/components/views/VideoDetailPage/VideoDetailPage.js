import React, {useEffect, useState} from 'react';
import {useSelector} from 'react-redux';
import {Row, Col, List, Avatar} from 'antd';
import Axios from 'axios';
import SideVideo from './Sections/SideVideo';
import Subscribe from './Sections/Subscribe';

function VideoDetailPage(props) {
    const [videoDetail, setVideoDetail] = useState({});
    const user = useSelector(state => state.user);

    useEffect(() => {
        let videoId = props.match.params.videoId;
        let variable = {videoId};
        Axios.post('/api/video/getVideoDetail', variable)
            .then(response => {
                if (response.data.success) {
                    setVideoDetail(response.data.videoDetail);
                }
                else {
                    alert(`Fail to get Video[${videoId}] Info`);
                }
            })
    }, []);

    if (videoDetail.writer && user.userData) {
        return (
            <div>
                <Row gutter={[16, 16]}>
                    <Col lg = {18} xs = {24}>
                        <div style = {{width : '100%', padding : '3rem 4rem'}}>
                            <video style = {{width : '100%'}} src={`http://localhost:3000/${videoDetail.filePath}`} controls/>
                            <List.Item
                                actions = {user.userData._id !== videoDetail.writer._id && [<Subscribe userTo = {videoDetail.writer._id} userFrom = {user.userData._id}/>]}
                            >
                                <List.Item.Meta
                                    //avatar={<Avatar src ={videoDetail.writer.image} />}
                                    title = {videoDetail.writer.name}
                                    description = {videoDetail.description}
                                />
                            </List.Item>
                        </div>

                        {/*comments*/}
                    </Col>
                    <Col lg = {6} xs = {24}>
                        <SideVideo/>
                    </Col>
                </Row>
            </div>
        )
    }
    else
    return (
        <div>

        </div>
    )
}

export default VideoDetailPage
