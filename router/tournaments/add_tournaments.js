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
        tournamentsName,
        tournamentsLevel,
        tournamentsType,
        tournamentsIntroduction
    } = req.body

    let tokenData = await verify_Token(token)

    if (tokenData.role == '教师') {
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
            // 查询最大的自增ID
            let maxID = await sqlQuery(`SELECT max(id) FROM ${tableName}`)
            maxID = maxID[0]['max(id)'] + 1

            // 添加用户的sql语句
            let insertSQL = `insert into ${tableName} value(${maxID},'${tournamentsName}','${tournamentsLevel}','${tournamentsType}','${tournamentsIntroduction}')`
            await sqlQuery(insertSQL)
            let data = postData(200, '添加成功')
            res.send(data)
        } catch (err) {
            console.log(err);
            res.send(postData(500, '添加失败'))
        }

    } else {
        res.send(postData(500, '当前用户权限不足'))
    }
}