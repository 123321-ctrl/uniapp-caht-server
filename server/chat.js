var dbserver = require('../utils/dbserver')

//获取数据一对一聊天数据
exports.msg = function (req, res) {
    let data = req.body
    dbserver.msg(data, res)
}