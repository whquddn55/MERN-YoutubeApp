const express = require('express');
const router = express.Router();
const Video = require('../models/Video');
const multer = require('multer');
const path = require('path');
const ffmpeg = require('fluent-ffmpeg');

let storage = multer.diskStorage({
    destination : (req, file, cb) => {
        cb(null, 'uploads/');
    },
    filename : (req, file, cb) => {
        cb(null, `${Date.now()}_${file.originalname}`);
    },
});

const upload = multer({
    storage : storage, 
    fileFilter : (req, file, cb) => {
        const ext = path.extname(file.originalname);
        if (ext != '.mp4') {
            req.fileValidationError = "Only mp4 is allowed!";
            cb(null, false);
        }
        else
            cb(null, true);
    }
}).single("file");

router.get('/getVideos', (req, res) => {
    Video.find()
        .populate('writer') // writer property의 모든 정보를 다 가져옴. 그냥 쓰면? object id 만 가져옴
        .exec((err, videos) => {
            if (err) return res.status(400).send(err);
            return res.status(200).json({success : true, videos});
        })
});

router.post('/getVideoDetail', (req, res) => {
    let videoId = req.body.videoId;
    Video.findOne({"_id" : req.body.videoId})
        .populate('writer')
        .exec((err, videoDetail) => {
            if (err) return res.status(400).send(err);
            return res.status(200).json({success : true, videoDetail});
        })
});

router.post('/uploadfiles', (req, res) => {
   upload(req, res, error => {
       if (error) return res.status(400).json({success : false});
       if (req.fileValidationError) return res.status(200).json({success : false, message : req.fileValidationError});
       return res.status(200).json({success : true, url : res.req.file.path, fileName : res.req.file.filename});
   }) 
});

router.post('/thumbnail', (req, res) => {

    let filePath = "";
    let fileDuration = "";

    // 비디오 정보 가져오기
    ffmpeg.ffprobe(req.body.url, (err, metadata) => {
        fileDuration = metadata.format.duration;
    })

    // 썸네일 생성
    ffmpeg(req.body.url)
    .on('filenames', (filenames) => {
        filePath = "uploads/thumbnails/" + filenames[0];
    })
    .on('end', () =>{
        return res.status(200).json({success : true, url : filePath, fileDuration : fileDuration});
    })
    .on('error', (err) => {
        console.log(err);
        return res.json({success : false, err});
    })
    .screenshots({
        count : 1,
        folder : 'uploads/thumbnails',
        size : '320x240',
        filename : 'thumbnail-%b.png'
    });
})

router.post('/uploadvideo', (req, res) => {
     const newVideo = new Video(req.body);
     newVideo.save((err, doc) => {
         if (err) return res.json({success : false,err});
         res.status(200).json({success : true});
     })
 });


module.exports = router;