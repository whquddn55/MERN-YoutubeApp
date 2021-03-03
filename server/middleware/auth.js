// 인증처리부분
const User = require('../models/User');

let auth = (req, res, next) => {
    //client cookie에서 token을 가져옴
    let token = req.cookies.x_auth;
    //token을 복호화 한 후 user를 찾는다.
    User.findByToken(token, (err, user) => {
        if (err) throw err;
        if (!user) return res.json( {isAuth : false, err : true});
        req.user = user;
        next();
    });
}

module.exports = auth;