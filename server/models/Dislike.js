const mongoose = require('mongoose');

const dislikeSchema = mongoose.Schema( {
    userId : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'User'
    },
    postId : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'Video'
    },
    commentId : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'Comment'
    }
});


let Dislike = mongoose.model('Dislike', dislikeSchema);

module.exports = Dislike;