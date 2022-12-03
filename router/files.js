const multer = require('multer')
const mkdir = require('../utils/mkdir')

//控制文件的存储
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        //路径
        let url = req.body.url
        mkdir.mkdirs('../data/'+url,err=>{
            console.log(err)
        })
        cb(null, './data/'+url)
    },
    filename: function (req, file, cb) {
        let name = req.body.name
        //正侧匹配后缀名
        let type = file.originalname.replace(/.+\./,".")
        cb(null, name+type)
    }
})

const upload = multer({ storage: storage })

module.exports = function (app) {
    //前端文件上传
    app.post('/files/upload', upload.array('file', 10), function (req, res, next) {
        //获取文件信息
        let url = req.body.url
        let name = req.files[0].filename
        let imgurl = '/'+url+'/'+name
        res.send(imgurl)
    })
}