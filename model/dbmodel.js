var mongoose = require('mongoose');
var db = require('../config/db')

var Schema = mongoose.Schema;
// var SchemaUser = new Schema();
var SchemaUser = new Schema({
    name: String
})
//用户表
var UserSchema = new Schema({
    name: { type: String },
    psw: { type: String },
    email: { type: String },
    sex: { type: String, default: 'asexual' },
    birth: { type: Date },
    phone: { type: Number },
    explain: { type: String },
    imgurl: { type: String, default: '/user/user.png' },
    time: { type: Date },
})
//好友表
var FriendSchema = new Schema({
    userID: { type: Schema.Types.ObjectId, ref: 'User' },
    friendID: { type: Schema.Types.ObjectId, ref: 'User' },
    state: { type: String },    //好友状态：（0为已为好友，1为申请中，2申请发送方，对方还未同意）
    markname: { type: String },
    time: { type: Date },      //生成时间
    lastTime: { type: Date },  //最后通讯时间
})
//一对一消息表
var MessageSchema = new Schema({
    userID: { type: Schema.Types.ObjectId, ref: 'User' },
    friendID: { type: Schema.Types.ObjectId, ref: 'User' },
    message: { type: String },
    types: { type: String },    //内容类型：（0文字，1图片链接，2音频链接）
    time: { type: Date },       //发送时间
    state: { type: Number }         //消息状态（0已读，1未读）
})
//群表
var GroupSchema = new Schema({
    userID: { type: Schema.Types.ObjectId, ref: 'User' },
    name: { type: String },
    imgurl: { type: String, default: 'user.png' },
    time: { type: Date },       //创建时间
    notice: { type: String }        //公告
})
//群成员表
var GroupUserSchema = new Schema({
    groupID: { type: Schema.Types.ObjectId, ref: 'Group' },
    userID: { type: Schema.Types.ObjectId, ref: 'User' },
    name: { type: String },
    tip: { type: Number, default: 0 }, //未读消息数
    time: { type: Date },       //加入时间
    lastTime: { type: Date },       //最后通讯时间
    shield: { type: Number }        //是否屏蔽群消息（0不屏蔽，1屏蔽）
})
//群消息表
var GroupMsgSchema = new Schema({
    groupID: { type: Schema.Types.ObjectId, ref: 'Group' },
    userID: { type: Schema.Types.ObjectId, ref: 'User' },
    message: { type: String },
    types: { type: String },    //内容类型：（0文字，1图片链接，2音频链接）
    time: { type: Date },       //发送时间
})

module.exports = db.model('User', UserSchema)
module.exports = db.model('Friend', FriendSchema)
module.exports = db.model('Message', MessageSchema)
module.exports = db.model('Group', GroupSchema)
module.exports = db.model('GroupUser', GroupUserSchema)
module.exports = db.model('GroupMsg', GroupMsgSchema)