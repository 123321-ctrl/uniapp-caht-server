var dbserver = require('../utils/dbserver')

//详情
exports.userDetail = function(req,res){
    let id = req.body.id
    dbserver.userDetail(id,res)
}
//用户信息修改
exports.userUpdate = function(req,res){
    let data = req.body
    dbserver.userUpdate(data,res)
}
//获取好友昵称
exports.getMarkName = function(req,res){
    let data = req.body
    dbserver.getMarkName(data,res)
}
//修改好友昵称
exports.updateMarkName = function(req,res){
    let data = req.body
    dbserver.updateMarkName(data,res)
}