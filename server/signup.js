const dbserver = require('../utils/dbserver')
var email = require('../utils/emailserver')

//用户注册
exports.signUp = function(req,res){
    let {name,mail,pwd} = req.body
    //发送邮件
    email.emailSignUp(mail,res)
    dbserver.buildUser(name,mail,pwd,res)
}
//用户或邮箱是否被占用判断
exports.judgeValue = function(req,res){
    let {data,type} = req.body
    dbserver.countUserValue(data,type,res)
}