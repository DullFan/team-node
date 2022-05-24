const bcrypt = require('bcryptjs'); // 导入bcryptjs模块
const fs = require('fs');
const sd = require('silly-datetime');

let {setToken, verify_Token} = require('../../tool/token')
let {sqlQuery} = require('../../model/dataBase')
let {postData} = require('../../tool/resultData')
let {delFsFile} = require('../../tool/tool')


// 当前接口要操作的数据表名
let tableName = 'tournaments'


module.exports = async (req, res, next) => {
    const token = req.headers['authorization']

    let {
        id,
        tournamentsName,
        tournamentsLevel,
        tournamentsType,
        tournamentsIntroduction
    } = req.body

    let tokenData = await verify_Token(token)

    if (tokenData.role == '教师') {

        if (id === undefined) {
            res.send(postData(500, '缺少id'))
            return
        }

        if (tournamentsName === undefined) {
            res.send(postData(500, '缺少tournamentsName'))
            return
        }

        if (tournamentsLevel === undefined) {
            res.send(postData(500, '缺少tournamentsLevel'))
            return
        }

        if (tournamentsType === undefined) {
            res.send(postData(500, '缺少tournamentsType'))
            return
        }

        if (tournamentsIntroduction === 0) {
            res.send(postData(500, '缺少tournamentsIntroduction'))
            return
        }

        try {
            // 添加用户的sql语句
            let insertSQL = `update ${tableName} set 
                    tournaments_name = '${tournamentsName}',
                    tournaments_level = '${tournamentsLevel}',
                    tournaments_type = '${tournamentsType}',
                    tournaments_introduction = '${tournamentsIntroduction}'
                 where id = ${id}`

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