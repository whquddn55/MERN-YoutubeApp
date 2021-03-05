import axios from "axios";
import React, {useEffect, useState} from 'react';
import Axios from 'axios';

function SideVideo() {
    const [sideVideos, setSideVideos] = useState([]);


    useEffect(() => {
        Axios.get('/api/video/getVideos')
            .then(response => {
                if (response.data.success) {
                    setSideVideos(response.data.videos);
                }
                else {
                    alert("Fail to get Videos");
                }
            })
    }, []);

    const renderSideVideo = sideVideos.map((video, index) => {
        let minutes = Math.floor(video.duration / 60);
        let seconds = Math.floor(video.duration % 60);

        return (<div key = {index} style = {{display : 'flex', marginBottom : "1rem", padding : "0 2rem"}}>
            <div style = {{width : '60%', marginRight : '1rem'}}> 
                <a href = {`/video/${video._id}`}>
                    <img style = {{width : '100%', height : '100%'}} src = {`http://localhost:3000/${video.thumbnail}`} alt = 'thumbnail' />
                </a>
            </div>
            <div style = {{width : '30%'}}>
                <a style ={{color : 'gray'}}>
                    <div style={{fontSize: '1rem', color : 'black'}}>{video.title}</div>
                    <div>{video.writer.name}</div>
                    <div>{video.views} views</div>
                    <div>{minutes}:{seconds} </div>
                </a>
            </div>
        </div>)
    })

    return (
        <React.Fragment>
            <div style = {{marginTop : '3rem'}}>
                {sideVideos && renderSideVideo}
            </div>
        </React.Fragment>
        
    )
}

export default SideVideo
