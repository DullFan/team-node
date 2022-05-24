const bcrypt = require('bcryptjs'); // 导入bcryptjs模块
const fs = require('fs');
const sd = require('silly-datetime');


let {sqlQuery} = require('../../model/dataBase')
let {postData} = require('../../tool/resultData')
let {delFsFile} = require('../../tool/tool')

// 当前接口要操作的数据表名
let tableName = 'teacher'

module.exports = async (req, res, next) => {

    let {
        teacherName,
        teacherPhone,
        teacherEmail,
        teacherSex,
        teacherIntroduction,
        teacherPassword
    } = req.body

    const time = sd.format(new Date(), 'YYYY-MM-DD HH:mm:ss');
    try {
        var filename = req.files[0].filename
    } catch (e) {

    }


    if (teacherName === undefined) {
        res.send(postData(500, '缺少teacherName'))
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

    if (teacherIntroduction === undefined) {
        res.send(postData(500, '缺少teacherIntroduction'))
        delFsFile(filename)
        return
    }

    try {
        // 判断数据库中是否已存在该用户名
        let find_data = await sqlQuery(`select * from ${tableName} where teacher_phone = '${teacherPhone}'`)
        let find_data2 = await sqlQuery(`select * from ${tableName} where teacher_email = '${teacherEmail}'`)

        if (find_data.length != 0) {
            res.send(postData(500, '当前手机号已被注册，请重新输入'))
            delFsFile(filename)
            return
        }

        if (find_data2.length != 0) {
            res.send(postData(500, '当前邮箱已被注册，请重新输入'))
            delFsFile(filename)
            return
        }

        // 将用户名和密码写入到数据库中
        // 查询最大的自增ID
        let maxID = await sqlQuery(`SELECT max(id) FROM ${tableName}`)
        maxID = maxID[0]['max(id)'] + 1

        if (teacherPassword === undefined) {
            teacherPassword = "123456"
        }

        // 将密码进行加密
        teacherPassword = await bcrypt.hashSync(teacherPassword, 10);

        if(filename === undefined){
            filename = 'default_avatar.jpg'
        }

        // 添加用户的sql语句
        let insertSQL = `insert into ${tableName} value(
                     ${maxID},
                    '${teacherName}',
                    '${teacherPhone}',
                    '${teacherEmail}',
                    '${filename}',
                    ${teacherSex},
                    '${teacherIntroduction}',
                    '${teacherPassword}',
                    '${time}'
)`

        await sqlQuery(insertSQL)

        // console.log(token);
        let data = postData(200, '注册成功')
        res.send(data)
    } catch (err) {
        console.log(err);
        res.send(postData(500, '注册失败'))
        delFsFile(filename)
    }
}