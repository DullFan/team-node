const bcrypt = require('bcryptjs'); // 导入bcryptjs模块
const fs = require('fs');
const sd = require('silly-datetime');

let {setToken, verify_Token} = require('../../tool/token')
let {sqlQuery} = require('../../model/dataBase')
let {postData} = require('../../tool/resultData')
let {delFsFile} = require('../../tool/tool')


// 当前接口要操作的数据表名
let tableName = 'registration'


module.exports = async (req, res, next) => {

    let {
        classId,
        studentNo,
        studentName,
        direction,
        introduction,
        sex,
        email,
        phone
    } = req.body
        const time = sd.format(new Date(), 'YYYY-MM-DD HH:mm:ss');
        if (classId === undefined) {
            res.send(postData(500, '缺少classId'))
            return
        }

        if (studentNo === undefined) {
            res.send(postData(500, '缺少studentNo'))
            return
        }

        if (studentName === undefined) {
            res.send(postData(500, '缺少studentName'))
            return
        }

        if (direction === 0) {
            res.send(postData(500, '缺少direction'))
            return
        }

        if (introduction === 0) {
            res.send(postData(500, '缺少introduction'))
            return
        }

        if (sex === 0) {
            res.send(postData(500, '缺少sex'))
            return
        }

        if (email === 0) {
            res.send(postData(500, '缺少email'))
            return
        }

        if (phone === 0) {
            res.send(postData(500, '缺少phone'))
            return
        }

        try {
            // 查询最大的自增ID
            let maxID = await sqlQuery(`SELECT max(id) FROM ${tableName}`)
            maxID = maxID[0]['max(id)'] + 1

            // 添加用户的sql语句
            let insertSQL = `insert into ${tableName} value(
                     ${maxID},
                    '${classId}',
                    '${studentNo}',
                    '${studentName}',
                    '${direction}',
                    '${introduction}',
                    '${sex}',
                    '${email}',
                    '${phone}',
                    '${time}',
                    'F',
                    1
                    )`
            await sqlQuery(insertSQL)
            let data = postData(200, '添加成功')
            res.send(data)
        } catch (err) {
            console.log(err);
            res.send(postData(500, '添加失败'))
        }
}