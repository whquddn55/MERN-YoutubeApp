const mongoose = require('mongoose');

const videoSchema = mongoose.Schema( {
    writer : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'User'
    },
    title : {
        type : String,
        maxlength : 50
    },
    description : {
        type : String
    },
    public : {
        type : Number
    },
    filePath : {
        type : String
    },
    catergory : {
        type : String
    },
    views : {
        type : Number,
        default : 0
    },
    duration : {
        type : String
    },
    thumbnail : {
        type : String
    }
}, {timestamps : true});


let Video = mongoose.model('Video', videoSchema);

module.exports = Video;