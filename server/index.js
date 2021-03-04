const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const mongoURI = require('./config/key');
const mongoose = require('mongoose');
mongoose.connect(mongoURI, {
    useNewUrlParser : true,
    useUnifiedTopology : true,
    useCreateIndex : true,
    useFindAndModify : false,
}).then(() => console.log('MongoDB connected...'))
    .catch((err) => console.log(err));

app.use(bodyParser.urlencoded({extended : true}));
app.use(bodyParser.json());
app.use(cookieParser());

// static한 파일들(image, css, js) 전부 use해줌
app.use('/uploads', express.static('uploads'));

app.use('/api/users', require('./route/user'));
app.use('/api/video', require('./route/video'));
app.use('/api/subscribe', require('./route/subscribe'));

app.listen(3000, () => console.log("App started on port 3000"));