const bcrypt = require('bcryptjs'); // 导入bcryptjs模块
const fs = require('fs');
const sd = require('silly-datetime');

let {sqlQuery} = require('../../model/dataBase')
let {postData} = require('../../tool/resultData')
let {delFsFile} = require('../../tool/tool')
let {setToken, verify_Token} = require('../../tool/token')


// 当前接口要操作的数据表名
let userInfoTableName = 'student'
let teacherTable = 'teacher'

module.exports = async (req, res, next) => {
    const token = req.headers['authorization']
    let {
        oldPassword,
        newPassword,
    } = req.body

    try {
        let tokenData =await verify_Token(token)
        if(oldPassword === undefined){
            res.send(postData(500, "缺少oldPassword"))
            return
        }
        if(newPassword === undefined){
            res.send(postData(500, "缺少newPassword"))
            return
        }

        let userInfo

        if(tokenData.role == '教师'){
            userInfo = await sqlQuery(`select password from ${teacherTable} where id = ${tokenData.userId}`)
        }else{
            userInfo = await sqlQuery(`select password from ${userInfoTableName} where id = ${tokenData.userId}`)
        }

        console.log(userInfo)
        let isEqual = await bcrypt.compare(oldPassword, userInfo[0].password);
        if(isEqual){
            newPassword = await bcrypt.hashSync(newPassword, 10);
            if(tokenData.role == '教师'){
                await sqlQuery(`update ${teacherTable} set password = '${newPassword}' where id = ${tokenData.userId}`)
            }else{
                await sqlQuery(`update ${userInfoTableName} set password = '${newPassword}' where id = ${tokenData.userId}`)
            }
            res.send(postData(200, "修改成功"))
        }else{
            res.send(postData(500, "输入的密码有误"))
        }

    } catch (error) {
        console.log(error);
        res.send(postData(500, '修改失败'))
    }
}