const express = require('express')
const bodyParser = require('body-parser')
const multer = require('multer')
const upload = multer()

// 引入二级路由
const {admin} = require('./router/admin')
const app = express()
const path = require('path')

//设置跨域访问
app.all("*", function (req, res, next) {
    //设置允许跨域的域名，*代表允许任意域名跨域
    res.header("Access-Control-Allow-Origin", "*");
    //允许的header类型
    res.header("Access-Control-Allow-Headers", "content-type");
    //跨域允许的请求方式
    res.header("Access-Control-Allow-Methods", "DELETE,PUT,POST,GET,OPTIONS");
    if (req.method.toLowerCase() === 'options')
        res.send(200);  //让options尝试请求快速结束
    else
        next();
})

app.use(require('./middleware/token'))

//配置二级路由
app.use(bodyParser.json())
app.use('/team', admin)

//公开资源
app.use(express.static(path.join(__dirname, 'public')));

// 监听4000端口
app.listen(4000, () => {
    console.log('服务启动了,请访问 http://127.0.0.1:4000')
})