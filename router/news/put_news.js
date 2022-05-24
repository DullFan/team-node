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

    let {
        newsId,
        newsTitle,
        newsContent,
        isSticky
    } = req.body

    const time = sd.format(new Date(), 'YYYY-MM-DD HH:mm:ss');
    let tokenData = await verify_Token(token)

    if (tokenData.role == '教师') {
        if (newsId === undefined) {
            res.send(postData(500, '缺少newsId'))
            try {
                for (let filesKey in req.files) {
                    delFsFile(req.files[filesKey].filename())
                }
            } catch (e) {
            }
            return
        }

        if (newsTitle === undefined) {
            res.send(postData(500, '缺少newsTitle'))
            try {
                for (let filesKey in req.files) {
                    delFsFile(req.files[filesKey].filename())
                }
            } catch (e) {
            }
            return
        }

        if (newsContent === undefined) {
            res.send(postData(500, '缺少newsContent'))
            try {
                for (let filesKey in req.files) {
                    delFsFile(req.files[filesKey].filename())
                }
            } catch (e) {
            }
            return
        }

        if (isSticky === undefined) {
            res.send(postData(500, '缺少isSticky'))
            try {
                for (let filesKey in req.files) {
                    delFsFile(req.files[filesKey].filename())
                }
            } catch (e) {
            }
            return
        }

        if (req.files.length === 0) {
            res.send(postData(500, '缺少img字段'))
            return
        }

        try {

            // 将用户名和密码写入到数据库中
            // 查询最大的自增ID
            let maxID = await sqlQuery(`SELECT max(id) FROM ${tableName}`)
            maxID = maxID[0]['max(id)'] + 1
            if (req.files.length === 0) {
                console.log()
            }

            let newsImg = ''
            for (let filesKey in req.files) {
                newsImg += (req.files[filesKey].filename + ',')
            }



            let newsData = await sqlQuery(`select * from ${tableName} where id = ${newsId}`)

            let imgDataOld = newsData[0].news_img.split(',')

            try {
                for (let imgDataOldKey in imgDataOld) {
                    await delFsFile(imgDataOld[imgDataOldKey])
                }
            } catch (e) {
            }

            // 添加用户的sql语句
            let insertSQL = `update ${tableName} set 
                    news_title = '${newsTitle}',
                    news_content = '${newsContent}',
                    news_img = '${newsImg}',
                    is_sticky = '${isSticky}'
                 where id = ${newsId}`

            await sqlQuery(insertSQL)
            let data = postData(200, '修改成功')
            res.send(data)
        } catch (err) {
            console.log(err);
            res.send(postData(500, '修改失败'))
            try {
                for (let filesKey in req.files) {
                    delFsFile(req.files[filesKey].filename())
                }
            } catch (e) {
            }
        }

    } else {
        res.send(postData(500, '当前用户无法修改新闻内容'))
    }
}