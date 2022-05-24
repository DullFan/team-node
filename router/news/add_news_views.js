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
    let newsId = req.query.newsId
    if(newsId === undefined){
        res.send(postData(500, '缺少newsId'))
        return
    }

    let newsData = await sqlQuery(`select news_views from ${tableName} where id = ${newsId}`)

    let views = newsData[0].news_views + 1
    console.log(views)

    // 添加用户的sql语句
    let insertSQL = `update ${tableName} set
                    news_views = '${views}'
                 where id = ${newsId}`

    await sqlQuery(insertSQL)
    res.send(postData(200, '添加成功'))

}