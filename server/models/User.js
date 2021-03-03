const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
// salt의 글자 수
const saltRounds = 10;
const jwt = require('jsonwebtoken');

const userSchema = mongoose.Schema( {
    name : {
        type : String,
        maxlength : 50
    },
    email : {
        type : String,
        trim : true, // thu thi@naver.com => thuthi@naver.com
        unique : 1
    },
    password : {
        type : String,
        maxLength : 70
    },
    role : {
        type : Number,
        default : 0
    },
    image : String,
    token : { // 유효성 판단
        type : String
    },
    tokenExp : { // 토큰 기간 
        type : Number
    }
});

// userSchema로 save하기 전에 항상 callback함수 실행.
userSchema.pre('save', function(next) {
    let user = this;
    // user의 password가 바뀔 때 만 비밀번호를 암호화
    if (user.isModified('password')) {
        bcrypt.genSalt(saltRounds, (err, salt) => {
            if (err) return next(err);
            bcrypt.hash(user.password, salt, (err, hash) => {
                if (err) return next(err);
                user.password = hash;
                    // next를 실행해야 다음 단계인 save로 넘어감.
                next();
            });
        });
    } else {
        next();
    }
});

// methods를 사용하면 생성되는 instance들에 method를 정의할 수 있음.
// 절대 arrow function사용하면 안 됨! this가 binding이 안 됨!
userSchema.methods.comparePassword = function(plainPassword, cb) {
    bcrypt.compare(plainPassword, this.password, (err, isMatch) => {
        if (err) return cb(err);
        cb(null, isMatch);
    });
}

userSchema.methods.generateToken = function(cb) {
    let user = this;
    let token = jwt.sign(user._id.toHexString(), 'secretToken');
    user.token = token;
    user.save(function(err, user) {
        if (err) return cb(err);
        cb(null, user);
    })
}


userSchema.statics.findByToken = function(token, cb) {
    // this means that 'User'
    jwt.verify(token, 'secretToken', function(err, decoded) {
        User.findOne({"_id" : decoded, "token" : token}, function(err, user) {
            if (err) return cb(err);
            cb(null, user);
        });
    });
}


let User = mongoose.model('User', userSchema);

module.exports = User;