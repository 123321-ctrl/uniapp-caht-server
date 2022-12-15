var dbserver = require('./dbserver')

module.exports = function (io) {
    var user = {} //socket注册用户
    io.on('connection', (socket) => {
        socket.on('login', (id) => {
            console.log(id,socket.id)
            //回复客户端
            socket.name = id
            user[id] = socket.id
            socket.emit('login', socket.id)
        })

        socket.on('msg', (msg,fromID,toID) => {
            console.log(msg,fromID,toID)

            //修改好友最好通信时间
            dbserver.upFriendLastTime({uid:fromID,fid:toID})
            //存储一对一消息
            dbserver.insertMsg(fromID, toID, msg.message, msg.type)

            //发送给对方
            if(user[toID]){
                socket.to(user[toID]).emit('msg',msg,fromID,0)
            }
            //发送给自己
            socket.emit('msg', msg,toID,1)
        })

        //用户离开
        socket.on('disconnecting',()=>{
            console.log(user)
            if(user.hasOwnProperty(socket.name)){
                delete user[socket.name]
                console.log(socket.id + '离开')
            }
        })
    })
}
