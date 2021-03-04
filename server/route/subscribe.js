const express = require('express');
const router = express.Router();
const Subscriber = require('../models/Subscriber');

router.post('/subscribeNumber', (req, res) => {
    Subscriber.find({userTo : req.body.userTo}, (err, subscribes) => {
        if (err) return res.status(400).send(error);
        return res.status(200).json({success : true, subscribeNumber : subscribes.length});
    });
})

router.post('/subscribed', (req, res) => {
    Subscriber.findOne({userTo : req.body.userTo, userFrom : req.body.userFrom}, (err, subscribed) => {
        if (err) return res.status(400).send(error);
        if (subscribed == null)
            return res.status(200).json({success : true, subscribed : false});
        return res.status(200).json({success : true, subscribed : true});
    });
})

router.post('/subscribe', (req, res) => {
    const newSubscribe = new Subscriber(req.body);
    newSubscribe.save(err => {
        if (err) return res.status(400).send(error);
        return res.status(200).json({success : true});
    });
})

router.post('/unsubscribe', (req, res) => {
    Subscriber.findOneAndRemove({userTo : req.body.userTo, userFrom : req.body.userFrom}, (err) => {
        if (err) return res.status(400).send(error);
        return res.status(200).json({success : true});
    });
})

module.exports = router;