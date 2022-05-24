const bcrypt = require('bcryptjs'); // 导入bcryptjs模块
const fs = require('fs');
const sd = require('silly-datetime');

let {setToken, verify_Token} = require('../../tool/token')
let {sqlQuery} = require('../../model/dataBase')
let {postData} = require('../../tool/resultData')
let {delFsFile} = require('../../tool/tool')


// 当前接口要操作的数据表名
let tableName = 'news'


module.exports = async (req, res, next) => {
    const token = req.headers['authorization']

    const time = sd.format(new Date(), 'YYYY-MM-DD HH:mm:ss');
    let tokenData = await verify_Token(token)

    let newId = req.query.newId;
    if(newId === undefined){
        res.send(postData(500, '缺少newId字段'))
        return
    }

    if (tokenData.role == '教师') {

        try {
            let newsData = await sqlQuery(`select * from ${tableName} where id = ${newId}`)

            let imgDataOld = newsData[0].news_img.split(',')

            try {
                for (let imgDataOldKey in imgDataOld) {
                    await delFsFile(imgDataOld[imgDataOldKey])
                }
            } catch (e) {
            }

            await sqlQuery(`delete from ${tableName} where id = ${newId}`)
            let data = postData(200, '删除成功')
            res.send(data)
        } catch (err) {
            console.log(err);
            res.send(postData(500, '删除失败'))
        }

    } else {
        res.send(postData(500, '当前用户无法删除新闻内容'))
    }
}