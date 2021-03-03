import React, {useState} from 'react';
import { Typography, Button, Form, message, Input} from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import Dropzone from 'react-dropzone';

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

function VideoUploadPage() {
    const [videoTitle, setVideoTitle] = useState('');
    const [description, setDescription] = useState('');
    const [accessOption, setAccessOption] = useState(0); // 0 : private, 1 : public;
    const [catergory, setCatergory] = useState('Film & Animation');

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

    return (
        <div style = {{maxWidth : '700px', margin : '2rem auto'}}>
            <div style = {{ textAlign:'center', marginBottom:'2rem'}}>
                <Title level={2}>Upload Video</Title>
            </div>
            <Form onSubmit>
                <div style = {{display : 'flex', justifyContent : 'space-between'}}>
                    <Dropzone
                        onDrop
                        multiple
                        maxSize
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


                    <div>
                        <img src alt/>
                    </div>
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
                <Button type = "primary" size ="large" onClick>
                    Submit
                </Button>
            </Form>
        </div>
    )
}

export default VideoUploadPage;