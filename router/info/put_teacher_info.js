const bcrypt = require('bcryptjs'); // 导入bcryptjs模块
const fs = require('fs');
const sd = require('silly-datetime');

let {sqlQuery} = require('../../model/dataBase')
let {postData} = require('../../tool/resultData')
let {delFsFile} = require('../../tool/tool')
let {setToken, verify_Token} = require('../../tool/token')


// 当前接口要操作的数据表名
let userInfoTableName = 'teacher'

module.exports = async (req, res, next) => {
    const token = req.headers['authorization']
    let {
        teacherName,
        teacherPhone,
        teacherEmail,
        teacherSex,
        teacherIntroduction
    } = req.body

    try {
        var data = await verify_Token(token)
        try {
            var filename = req.files[0].filename
        } catch (e) {

        }
        if (data.role === "教师") {

            if (teacherName === undefined) {
                res.send(postData(500, "缺少teacherName"))
                delFsFile(filename)
                return
            }

            if (teacherPhone === undefined) {
                res.send(postData(500, '缺少teacherPhone'))
                delFsFile(filename)
                return
            }

            if (teacherEmail === undefined) {
                res.send(postData(500, '缺少teacherEmail'))
                delFsFile(filename)
                return
            }

            if (teacherSex === undefined) {
                res.send(postData(500, '缺少teacherSex'))
                delFsFile(filename)
                return
            }

            if (teacherIntroduction === undefined) {
                res.send(postData(500, '缺少teacherIntroduction'))
                delFsFile(filename)
                return
            }

            let userInfo = await sqlQuery(`select * from ${userInfoTableName} where id = ${data.userId}`)

            let data1 = await sqlQuery(`select * from ${userInfoTableName} where teacher_phone = ${teacherPhone}`)
            if (data1.length != 0) {
                if(data1[0].id != data.userId){
                    res.send(postData(500, '当前手机号已存在'))
                    delFsFile(filename)
                    return
                }
            }

            let data2 = await sqlQuery(`select * from ${userInfoTableName} where teacher_email = '${teacherEmail}'`)
            if (data2.length != 0) {
                if(data2[0].id != data.userId){
                    res.send(postData(500, '当前邮箱已存在'))
                    delFsFile(filename)
                    return
                }
            }

            if (filename !== undefined) {
                if (userInfo[0].teacher_avatar != 'default_avatar.jpg') {
                    delFsFile(userInfo[0].teacher_avatar)
                }
            }

            if (filename === undefined) {
                filename = userInfo[0].teacher_avatar
            }

            await sqlQuery(`update ${userInfoTableName} set teacher_name = '${teacherName}',teacher_phone = '${teacherPhone}',teacher_email = '${teacherEmail}',teacher_sex = '${teacherSex}',teacher_introduction = '${teacherIntroduction}',teacher_avatar = '${filename}' where id = '${data.userId}'`)

            res.send(postData(200, "修改成功"))
        } else{
            res.send(postData(500, "当前用户权限不足"))
        }

    } catch (error) {
        console.log(error);
        res.send(postData(500, '修改失败'))
    }
}