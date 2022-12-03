const jwt = require('jsonwebtoken')
var secret = 'pppChat';
exports.generateToken = function (e) {
    let payload = { id: e, time: new Date() }
    let token = jwt.sign(payload, secret, { expiresIn: 60 * 60 * 24 * 120 }) //120天

    return token
}
//解码
exports.verifyToken = function(e){
    let payload;
    jwt.verify(e,secret,function(err,result){
        if(err){
            payload = 0
        }else{
            payload = 1
        }
    })
    return payload;
}