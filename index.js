const bodyParser = require('body-parser')
const express = require('express')
var jwt = require('./utils/jwt')

const app = express()
const port = 3000

var server = app.listen(8082)
var io = require('socket.io').listen(server)
require('./utils/socket')(io)

app.all('*', function (req, res, next) {
    // 开启跨域
    res.setHeader("Access-Control-Allow-Credentials", "true");
    const origin = req.get("Origin");
    // 允许的地址 http://127.0.0.1:9000 这样的格式
    if (origin) {
        res.setHeader("Access-Control-Allow-Origin", origin);
    }
    // 允许跨域请求的方法
    res.setHeader(
        "Access-Control-Allow-Methods",
        "POST, GET, OPTIONS, DELETE, PUT"
    );
    // 允许跨域请求 header 携带哪些东西
    res.header(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept, If-Modified-Since"
    );
    next();
})

app.use(bodyParser.urlencoded({ limit: '50mb', extended: false }))
app.use(bodyParser.json({ limit: '50mb' }))

//获取静态路径
app.use(express.static(__dirname + '/data'))

//token判断
app.use(function (req, res, next) {
    if (typeof (req.body.token) !== 'undefined') {
        let { token } = req.body
        let tokenMatch = jwt.verifyToken(token)
        if (tokenMatch === 1) {
            //通过验证
            next()
        } else {
            //验证不通过
            res.send({ status: 300, msg: '验证不通过' })
        }
    } else {
        next()
    }
})

require('./router/router')(app)
require('./router/files')(app)

//404页面
app.use(function (req, res, next) {
    let err = new Error('Not Founding')
    err.status = 404
    next(err)
})
//出现错误处理
app.use(function (err, req, res, next) {
    res.status(err.status || 500)
    res.send(err.message)
})

// server.listen(3031)
app.listen(port, () => console.log("3000 is listening"))