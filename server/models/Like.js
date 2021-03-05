const mongoose = require('mongoose');

const likeSchema = mongoose.Schema( {
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


let Like = mongoose.model('Like', likeSchema);

module.exports = Like;