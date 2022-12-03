var dbserver = require('../utils/dbserver')
var emailserver = require('../utils/emailserver')
var signUp = require('../server/signup')
var signIn = require('../server/signin')
var search = require('../server/search')
var user = require('../server/userDetail')
var friend = require('../server/friend')
var home = require('../server/home')
var chat = require('../server/chat')

module.exports = function(app){
    app.get('/test',(req,res)=>{
        dbserver.findUser(res)
    })
    //邮箱测试
    app.post('/email',(req,res)=>{
        let mail = req.body.mail;
        emailserver.emailSignUp(mail,res)
        // res.send(mail)
    })
    //注册
    app.post('/signup/add',function(req,res){
        signUp.signUp(req,res)
    })
    //用户或邮箱是否被占用判断
    app.post('/signup/judge',function(req,res){
        signUp.judgeValue(req,res)
    })
    //登录
    app.post('/signin/match',function(req,res){
        signIn.signIn(req,res)
    })
    //token测试
    app.post('/signin/test',function(req,res){
        // signIn.test(req,res)
        res.send('这里token正确')
    })
    //搜索用户
    app.post('/search/user',function(req,res){
        search.searchUser(req,res)
    })
    //判断是否为好友
    app.post('/search/isfriend',function(req,res){
        search.isFriend(req,res)
    })
    //搜索群
    app.post('/search/group',function(req,res){
        search.searchGroup(req,res)
    })
    //判断是否在群内
    app.post('/search/isingroup',function(req,res){
        search.isInGroup(req,res)
    })
    //用户详情
    app.post('/user/detail',function(req,res){
        user.userDetail(req,res)
    })
    //用户信息修改
    app.post('/user/update',function(req,res){
        user.userUpdate(req,res)
    })
    //获取好友昵称
    app.post('/user/getmarkname',function(req,res){
        user.getMarkName(req,res)
    })
    //修改好友昵称
    app.post('/user/updatemarkname',function(req,res){
        user.updateMarkName(req,res)
    })
    //好友申请
    app.post('/friend/applyfriend',function(req,res){
        friend.applyFriend(req,res)
    })
    //更新好友状态,通过
    app.post('/friend/updatefriendstate',function(req,res){
        friend.updateFriendState(req,res)
    })
    //拒绝或删除好友
    app.post('/friend/deletefriend',function(req,res){
        friend.deleteFriend(req,res)
    })
    //获取好友列表
    app.post('/index/getusers',function(req,res){
        home.getUsers(req,res)
    })
    //获取最后一条消息
    app.post('/index/getonemsg',function(req,res){
        home.getOneMsg(req,res)
    })
    //汇总一对一消息未读数
    app.post('/index/unreadmsg',function(req,res){
        home.unreadMsg(req,res)
    })
    //一对一消息状态修改(已读)
    app.post('/index/updatemsg',function(req,res){
        home.updateMsg(req,res)
    })
    //获取群列表
    app.post('/index/getgroup',function(req,res){
        home.getGroup(req,res)
    })
    //获取最后一条群消息
    app.post('/index/getlastgroupmsg',function(req,res){
        home.getOneGroupMsg(req,res)
    })
    //群消息状态修改(已读)
    app.post('/index/updategroupemsg',function(req,res){
        home.updateGroupMsg(req,res)
    })
    //获取数据一对一聊天数据
    app.post('/chat/msg',function(req,res){
        chat.msg(req,res)
    })
}