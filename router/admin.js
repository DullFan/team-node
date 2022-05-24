const epxress = require('express')
const multer = require('multer')



const storage = multer.diskStorage({
    destination:function (req, file, cb) {
        cb(null,'public/')
    },
    //重新设置文件名称
    filename: function(req, file, cb) {
        // 设置文件名
        // Math.round(Math.random() *1E9)是生成一个整数部分9位数的随机数，再取整

        let fileData = Date.now() + "-" + Math.round(Math.random() * 1e9)
            +
            file.originalname.substring(file.originalname.indexOf("."),file.originalname.length);
        cb(null, file.fieldname + "-" + fileData)
    }
})

var upload = multer({storage:storage})

// 创建二级路由
const admin = epxress.Router()

//登录账号
admin.post('/login', require('./login/login'))

//注册学生账号
admin.post('/student/register', upload.array('avatar',1),require('./register/student_register'))
//注册教师账号
admin.post('/teacher/register', upload.array('avatar',1),require('./register/teacher_register'))

//修改密码
admin.put('/reset/pwd',require('./info/reset_pwd'))

//获取个人信息
admin.get('/student/info',require('./info/find_Info_by_id'))
//获取所有用户
admin.get('/student/list',require('./user/find_user'))

//注销学生账号
admin.delete('/student/del',require('./info/delete_info'))
//注销教师账号
admin.delete('/teacher/del',require('./info/delete_teacher_info'))

//更新学生信息
admin.put('/student/put',upload.array('avatar',1),require('./info/put_info'))
//更新教师信息
admin.put('/teacher/put',upload.array('avatar',1),require('./info/put_teacher_info'))



//添加新闻
admin.post('/news/submit', upload.array('img',5),require('./news/add_news'))
//删除新闻
admin.delete('/news/del',require('./news/del_news'))
//更新新闻
admin.put('/news/put',upload.array('img',5),require('./news/put_news'))
//获取新闻
admin.get('/news/list',require('./news/find_news'))
//添加新闻浏览数
admin.put('/news/views',require('./news/add_news_views'))

//添加轮播图
admin.post('/banner/submit',require('./banner/add_banner'))
//修改轮播图
admin.put('/banner/put',require('./banner/put_banner'))
//获取轮播图
admin.get('/banner/list',require('./banner/find_banner'))
//删除轮播图
admin.delete('/banner/del',require('./banner/del_banner'))



//添加赛项
admin.post('/tournaments/submit',require('./tournaments/add_tournaments'))
//修改赛项
admin.put('/tournaments/put',require('./tournaments/put_tournaments'))
//查询赛项
admin.get('/tournaments/list',require('./tournaments/find_tournaments'))
//删除赛项
admin.delete('/tournaments/del',require('./tournaments/del_tournaments'))

//添加荣誉
admin.post('/honors/submit', upload.array('honorsImg',5),require('./honors/add_honors'))

//修改荣誉
admin.put('/honors/put', upload.array('honorsImg',5),require('./honors/put_honors'))

//荣誉删除
admin.delete('/honors/del',require('./honors/del_honors'))

//查询所有荣誉
admin.get('/honors/list',require('./honors/find_honors'))

//通过Id获取荣誉
admin.get('/honors/list/by',require('./honors/find_honors_by'))



//生成报名表
admin.post('/registration/submit',require('./registration/add_registration'))
//审批报名表
admin.put('/registration/put',require('./registration/put_registration'))
//报名表删除
admin.delete('/registration/del',require('./registration/del_registration'))
//查询所有报名表
admin.get('/registration/list',require('./registration/find_registration'))
module.exports = {
    admin
}