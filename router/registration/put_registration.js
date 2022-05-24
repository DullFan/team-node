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
    const token = req.headers['authorization']

    let {
        registrationId,
        isItPassed
    } = req.body

    let tokenData = await verify_Token(token)

    if (tokenData.role == '教师') {

        if (registrationId === undefined) {
            res.send(postData(500, '缺少registrationId'))
            return
        }

        if (isItPassed === undefined) {
            res.send(postData(500, '缺少isItPassed'))
            return
        }

        try {
            // 添加用户的sql语句
            let insertSQL = `update ${tableName} set 
                    is_it_passed = '${isItPassed}',
                    teacher_id = '${tokenData.userId}'
                 where id = ${registrationId}`

            await sqlQuery(insertSQL)
            let data = postData(200, '审批成功')
            res.send(data)
        } catch (err) {
            console.log(err);
            res.send(postData(500, '审批失败'))
            try {
                for (let filesKey in req.files) {
                    delFsFile(req.files[filesKey].filename())
                }
            } catch (e) {
            }
        }

    } else {
        res.send(postData(500, '当前用户无操作权限'))
    }
}