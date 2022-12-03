const nodemailer = require("nodemailer");
const credentials = require('../config/credentials')

//创建传输方式
var transporter = nodemailer.createTransport({
    service: 'qq',
    auth: {
        user: credentials.qq.user,
        pass: credentials.qq.pass
    },
});

exports.emailSignUp = function(email,res){
    //发送信息内容
    let options = {
        from:'1447625819@qq.com',
        to:email,
        subject:'感谢您的注册',
        html:'<span>欢迎您的加入</span>'
    }
    //发送邮件
    transporter.sendMail(options,function(err,msg){
        if(err){
            res.send(err)
            console.log(err)
        }else{
            res.send('邮箱发送成功')
        }
    })
}