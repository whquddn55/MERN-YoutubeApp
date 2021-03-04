const mongoose = require('mongoose');

const subscriberSchema = mongoose.Schema( {
    userTo :{
        type : mongoose.Schema.Types.ObjectId,
        ref : "User"
    },
    userFrom :{
        type : mongoose.Schema.Types.ObjectId,
        ref : "User"
    }
});


let Subscriber = mongoose.model('Subscriber', subscriberSchema);

module.exports = Subscriber;