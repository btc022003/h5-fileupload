var express = require('express')
var morgan = require('morgan')
var app = express()

//终端logger
app.use(morgan('dev'))

app.use(express.static('./public'))

//app.get('/',(req,res)=>{
//    res.send('app init success!!!!')
//})

app.listen(3000,()=>{
    console.log('服务器运行于3000端口...')
})
