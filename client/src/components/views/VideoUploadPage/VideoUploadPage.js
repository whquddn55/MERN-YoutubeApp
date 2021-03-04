import React, {useState} from 'react';
import { Typography, Button, Form, message, Input} from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import Dropzone from 'react-dropzone';
import Axios from 'axios';
import { useSelector } from 'react-redux';

const {TextArea} = Input;
const {Title} = Typography;

const access = [
    {value : 0, label : "Private"},
    {value : 1, label : "Public"}
]
const caterogries = [
    { value : 0, label : "Film & Animation"},
    { value : 1, label : "Autos & Vehicles"},
    { value : 2, label : "Music"},
    { value : 3, label : "Pets & Animals"},
]

function VideoUploadPage(props) {
    const user = useSelector(state => state.user);
    const [videoTitle, setVideoTitle] = useState('');
    const [description, setDescription] = useState('');
    const [accessOption, setAccessOption] = useState(0); // 0 : private, 1 : public;
    const [category, setCatergory] = useState('Film & Animation');
    const [filePath, setFilePath] = useState('');
    const [duration, setDuration] = useState('');
    const [thumbnailPath, setThumbnailPath] = useState('');

    const onTitleChange = (e) => {
        setVideoTitle(e.currentTarget.value);
    }

    const onDescriptionChange = (e) => {
        setDescription(e.currentTarget.value);
    }

    const onAccessChange = (e) => {
        setAccessOption(e.currentTarget.value);
    }

    const onCategoryChange = (e) => {
        setCatergory(e.currentTarget.value);
    }

    const onDrop = (files) => {
        let formData = new FormData;
        const config = {
            header : {'content-type' : 'multipart/form-data'}
        }
        formData.append('file', files[0]);
        
        Axios.post('/api/video/uploadfiles', formData, config)
            .then(response => {
                if (response.data.success) {
                    setFilePath(response.data.url);

                    let thumbnailVar = {
                        url : response.data.url,
                        fileName : response.data.fileName
                    }
                    Axios.post('/api/video/thumbnail', thumbnailVar)
                        .then(response => {
                            if (response.data.success) {
                                setDuration(response.data.fileDuration);
                                setThumbnailPath(response.data.url);
                            }
                            else {
                                alert('Fail to make thubmnail');
                            }
                        })
                }
                else {
                    if (response.data.message)
                        alert(response.data.message);
                    else
                        alert("Fail to upload video");
                }
            })
    }

    const onSubmit = (event) => {
        event.preventDefault();

        let variables = {
            writer: user.userData._id,
            title: videoTitle,
            description: description,
            public: accessOption,
            filePath: filePath,
            catergory: category,
            duration: duration,
            thumbnail: thumbnailPath,
        }
        Axios.post('/api/video/uploadvideo', variables)
            .then(response => {
                if (response.data.success) {
                    message.success('성공적으로 업로드했습니다!');
                    setTimeout(() => {
                        props.history.push('/');
                    }, 3000)
                } 
                else {
                    alert("Fail to upload video")
                }
            })
    }

    return (
        <div style = {{maxWidth : '700px', margin : '2rem auto'}}>
            <div style = {{ textAlign:'center', marginBottom:'2rem'}}>
                <Title level={2}>Upload Video</Title>
            </div>
            <Form onSubmit = {onSubmit}>
                <div style = {{display : 'flex', justifyContent : 'space-between'}}>
                    <Dropzone
                        onDrop = {onDrop}
                        multiple = {false} 
                        maxSize = {1 * 1024 * 1024 * 1024}
                    >
                        {({ getRootProps, getInputProps}) => (
                            <div style = {{
                                width : '300px', height : '240px', border : '1px solid lightgray', distplay : 'flex',
                                alignItems:'center', justifyContent:'center' 
                            }} {...getRootProps()}>
                                <input {...getInputProps()} />
                                <PlusOutlined style ={{fontSize : '3rem'}}/>
                            </div>
                        )}
                    </Dropzone>

                    {thumbnailPath && 
                        <div>
                            <img src = {`http://localhost:3000/${thumbnailPath}`} alt = "thumbnail"/>
                        </div>
                        
                    }
                </div>

                <br />
                <br/>
                <label>Title</label>
                <Input 
                    onChange = {onTitleChange}
                    value = {videoTitle}
                />
                <br/>
                <br/>
                <label>Description</label>
                <TextArea
                    onChange = {onDescriptionChange}
                    value = {description}
                />
                <br/>
                <br/>
                <select onChange = {onAccessChange}>
                    {access.map((item, index) => (
                        <option key ={index} value = {item.value}>{item.label}</option>
                    ))}
                </select>
                <br/>
                <br/>
                <select onChange = {onCategoryChange}>
                    {caterogries.map((item, index) => (
                        <option key ={index} value = {item.value}>{item.label}</option>
                    ))}
                </select>
                <br/>
                <br/>
                <Button type = "primary" size ="large" onClick = {onSubmit}>
                    Submit
                </Button>
            </Form>
        </div>
    )
}

export default VideoUploadPage;