import React, {useEffect, useState} from 'react';
import {Row, Col, List, Avatar} from 'antd';
import Axios from 'axios';
import SideVideo from './Sections/SideVideo';

function VideoDetailPage(props) {
    const [videoDetail, setVideoDetail] = useState({});


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

    return (
        <div>
            {videoDetail.writer && 
                <Row gutter={[16, 16]}>
                    <Col lg = {18} xs = {24}>
                        <div style = {{width : '100^', padding : '3rem 4rem'}}>
                            <video style = {{width : '100%'}} src={`http://localhost:3000/${videoDetail.filePath}`} controls/>
                            <List.Item
                                actions
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
            }
        </div>
    )
}

export default VideoDetailPage
