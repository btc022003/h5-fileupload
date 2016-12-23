var express = require('express')
var morgan = require('morgan')
var app = express()
var bodyParser = require('body-parser')
var fs = require('fs')
//终端logger
app.use(morgan('dev'))

// 判断上传目录是否存在
fs.stat('./public/upload',(err,stat)=>{
    if(err){
        fs.mkdir('./public/upload',e=>{
            //console.log(e)
            console.log('上传目录创建成功')
        })
    }
    else{
        console.log('上传目录已存在')
    }
})

//引用body-parser插件
app.use(bodyParser.urlencoded(
    {
        extended:false,
        limit:'10mb' ///上传内容大小限制 默认100k
    })
)
app.use(bodyParser.json({limit:'10mb'}))

app.use(express.static('./public'))

//app.get('/',(req,res)=>{
//    res.send('app init success!!!!')
//})
// 上传文件数据接口
app.post('/common/api/file_upload',(req,res)=>{
    var imgData = req.body.imgData
    //为了防止文件同名,使用时间戳加随机数的方式命名文件
    var fileName = Date.now().toString()+Math.ceil(Math.random()*10000)+".jpg"
    //传递的数据进行替换
    var base64Data = imgData.replace(/^data:image\/\w+;base64,/,"")
    var dataBuffer = new Buffer(base64Data,'base64')
    fs.writeFile('./public/upload/'+fileName,dataBuffer,err=>{
        if(err){
            console.log(err)
        }
        else{
            res.json({
                status:'y',
                msg:'保存成功',
                data:fileName
            })
        }
    })
})

app.listen(3000,()=>{
    console.log('服务器运行于3000端口...')
})
