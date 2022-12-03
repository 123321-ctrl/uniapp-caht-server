//用户登录
var dbserver = require('../utils/dbserver')
var jwt = require('../utils/jwt')

//登录
exports.signIn = function(req,res){
    let {data,pwd} = req.body
    dbserver.userMatch(data,pwd,res)
}

exports.test = function(req,res){
    let {token} = req.body
    let result = jwt.verifyToken(token)
    res.send(result)
}