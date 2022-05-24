// 引入token相关模块
const { verify_Token } = require('../tool/token')
const { resultData } = require('../tool/resultData')

module.exports = (req, res, next) => {
    const token = req.headers['authorization']
    console.log('来到了全局中间件');
    let path = req.originalUrl
    // 登录注册接口不需要验证token
    console.log(path)
    if (path === '/team/login' || path === '/team/student/register' || path.includes(".") || path === '/team/teacher/register'
    || path.includes('/team/student/list') || path.includes('/team/news/list') || path.includes('team/news/views')
        ||path.includes('/team/banner/list') || path.includes('/team/tournaments/list') || path.includes('/team/honors/list')
    ||path.includes('/honors/list/by') || path === '/team/registration/submit') {
        return next()
    }
    
    // 判断token是否存在或是否已过期
    if (token === undefined) {
        console.log('没有token，需要重新获取token');
        res.send(resultData('请先登录', 401))
    } else {
        // 1. 校验token
        verify_Token(token).then(data => {
            // token校验成功
            console.log('token校验成功');
            next()
        }).catch(err => {
            // token校验失败
            console.log('token校验失败');
            res.send(resultData('token已失效，请重新登录', 401))
        })
    }
}