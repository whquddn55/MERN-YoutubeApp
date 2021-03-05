const express = require('express');
const router = express.Router();
const Like = require('../models/Like');
const Dislike = require('../models/Dislike');

router.post('/getLikes', (req, res) => {
    let variable;
    if (req.body.postId)
        variable = { postId : req.body.postId };
    else
        variable = { commentId : req.body.commentId };
    Like.find(variable, (err, likes) => {
        if (err) return res.status(400).send(err);
        return res.status(200).json({success : true, likes});
    })
})

router.post('/getDislikes', (req, res) => {
    let variable;
    if (req.body.postId)
        variable = { postId : req.body.postId };
    else
        variable = { commentId : req.body.commentId };
    Dislike.find(variable, (err, dislikes) => {
        if (err) return res.status(400).send(err);
        return res.status(200).json({success : true, dislikes});
    })
})

router.post('/upLike', (req, res) => {
    const newLike = new Like(req.body);
    newLike.save(err => {
        if (err) return res.status(400).send(err);

        Dislike.findOneAndDelete(req.body, (err) => {
            if (err) return res.status(400).send(err);
            return res.status(200).json({success : true});
        })
    })
})

router.post('/unLike', (req, res) => {
    Like.findOneAndDelete(req.body, err => {
        if (err) return res.status(400).send(err);
        return res.status(200).json({success : true});
    })
})

router.post('/upDislike', (req, res) => {
    const newDislike = new Dislike(req.body);
    newDislike.save(err => {
        if (err) return res.status(400).send(err);

        Like.findOneAndDelete(req.body, (err) => {
            if (err) return res.status(400).send(err);
            return res.status(200).json({success : true});
        })
    })
})

router.post('/unDislike', (req, res) => {
    Dislike.findOneAndDelete(req.body, err => {
        if (err) return res.status(400).send(err);
        return res.status(200).json({success : true});
    })
})

module.exports = router;