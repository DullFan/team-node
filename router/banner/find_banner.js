const bcrypt = require('bcryptjs'); // 导入bcryptjs模块
const fs = require('fs');
const sd = require('silly-datetime');

let {setToken, verify_Token} = require('../../tool/token')
let {sqlQuery} = require('../../model/dataBase')
let {resultData,postData} = require('../../tool/resultData')
let {delFsFile} = require('../../tool/tool')
let {timeFommater, timeFommater2} = require('../../tool/tool')



// 当前接口要操作的数据表名
let tableName = 'banner'


module.exports = async (req, res, next) => {

    try {
        // 将用户名和密码写入到数据库中
        // 查询最大的自增ID
        let maxID = await sqlQuery(`SELECT max(id) FROM ${tableName}`)
        maxID = maxID[0]['max(id)'] + 1

        // 添加用户的sql语句
        let banenrInfo = `select * from ${tableName}`
        let bannerData = await sqlQuery(banenrInfo)
        let bannerNewData = []

        for (let i = 0; i < bannerData.length; i++) {
            bannerNewData.push(
                {
                    id:bannerData[i].id,
                    bannerTitle:bannerData[i].banner_title,
                    bannerImg:bannerData[i].banner_img,
                    createdTime:timeFommater(bannerData[i].created_time),
                    newsId:bannerData[i].news_id,
                }
            )
        }
        let data = resultData(200, '查询成功',bannerNewData)
        res.send(data)
    } catch (err) {
        console.log(err);
        res.send(postData(500, '查询失败'))
    }
}