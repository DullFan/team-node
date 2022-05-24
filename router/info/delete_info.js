let {sqlQuery} = require('../../model/dataBase')
let {resultData, postData} = require('../../tool/resultData')
let {setToken, verify_Token} = require('../../tool/token')
let {timeFommater, timeFommater2} = require('../../tool/tool')
let {delFsFile} = require('../../tool/tool')


// 当前接口要操作的数据表名
let userInfoTableName = 'student'
let detailsTableName = 'student_details'

module.exports = async (req, res, next) => {
    const token = req.headers['authorization']
    try {
        var data = await verify_Token(token)
        let user_id = req.query.userId;

        if(user_id === undefined){
            res.send(postData(500, "缺少userId"))
            return
        }
        if (data.role === '教师') {
            let newsData = await sqlQuery(`select * from ${userInfoTableName} where id = ${user_id}`)
            if(newsData[0].avatar != 'default_avatar.jpg'){
                await delFsFile(newsData[0].avatar)
            }

            await sqlQuery(`delete from ${userInfoTableName} where id = ${user_id}`)
            await sqlQuery(`delete from ${detailsTableName} where id = ${user_id}`)
            res.send(postData(200, "删除成功"))
        } else{
            res.send(postData(500, "当前用户没有权限"))
        }
    } catch (error) {
        console.log(error);
        res.send(postData(500, '删除失败'))
    }
}