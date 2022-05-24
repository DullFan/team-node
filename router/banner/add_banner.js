const bcrypt = require('bcryptjs'); // 导入bcryptjs模块
const fs = require('fs');
const sd = require('silly-datetime');

let {setToken, verify_Token} = require('../../tool/token')
let {sqlQuery} = require('../../model/dataBase')
let {postData} = require('../../tool/resultData')
let {delFsFile} = require('../../tool/tool')


// 当前接口要操作的数据表名
let tableName = 'banner'


module.exports = async (req, res, next) => {
    const token = req.headers['authorization']

    let {
        bannerTitle,
        bannerImg,
        newsId
    } = req.body

    const time = sd.format(new Date(), 'YYYY-MM-DD HH:mm:ss');
    let tokenData = await verify_Token(token)
    console.log(bannerTitle)
    console.log(bannerImg)
    console.log(newsId)
    if (tokenData.role == '教师') {

        if (bannerTitle === undefined) {
            res.send(postData(500, '缺少bannerTitle'))
            return
        }

        if (bannerImg === undefined) {
            res.send(postData(500, '缺少bannerImg'))
            return
        }

        if (newsId === undefined) {
            res.send(postData(500, '缺少newsId'))
            return
        }

        try {
            // 将用户名和密码写入到数据库中
            // 查询最大的自增ID
            let maxID = await sqlQuery(`SELECT max(id) FROM ${tableName}`)
            maxID = maxID[0]['max(id)'] + 1

            // 添加用户的sql语句
            let insertSQL = `insert into ${tableName} value(${maxID},'${bannerTitle}','${bannerImg}','${time}','${newsId}')`
            await sqlQuery(insertSQL)
            let data = postData(200, '添加成功')
            res.send(data)
        } catch (err) {
            console.log(err);
            res.send(postData(500, '添加失败'))
        }

    } else {
        res.send(postData(500, '当前用户无法添加轮播图'))
    }
}