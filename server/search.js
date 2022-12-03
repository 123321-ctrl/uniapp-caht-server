var dbserver = require('../utils/dbserver')

//用户搜索
exports.searchUser = function(req,res){
    let data = req.body.data
    dbserver.searchUser(data,res)
}
//判断是否为好友
exports.isFriend = function(req,res){
    let {uid,fid} = req.body
    dbserver.isFriend(uid,fid,res)
}
//群搜索
exports.searchGroup = function(req,res){
    let data = req.body.data
    dbserver.searchGroup(data,res)
}
//判断是否在群内
exports.isInGroup = function(req,res){
    let {uid,gid} = req.body
    dbserver.isInGroup(uid,gid,res)
}