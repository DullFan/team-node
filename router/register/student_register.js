const bcrypt = require('bcryptjs'); // 导入bcryptjs模块
const fs = require('fs');
const sd = require('silly-datetime');


let {sqlQuery} = require('../../model/dataBase')
let {postData} = require('../../tool/resultData')
let {delFsFile} = require('../../tool/tool')

// 当前接口要操作的数据表名
let tableName = 'student'
let tableName2 = 'student_details'


module.exports = async (req, res, next) => {
    let {
        studentNo,
        studentName,
        password,
        telephone,
        sex,
        email,
        direction,
        idCard,
        classesId,
        introduction,
        isHidden,
        birth,
        schoolOrWork,
    } = req.body

    const time = sd.format(new Date(), 'YYYY-MM-DD HH:mm:ss');
    try {
        var filename = req.files[0].filename
    } catch (e) {

    }


    if (studentNo === undefined) {
        res.send(postData(500, '缺少studentNo'))
        delFsFile(filename)
        return
    }

    if (studentName === undefined) {
        res.send(postData(500, '缺少studentName'))
        delFsFile(filename)
        return
    }

    if (telephone === undefined) {
        res.send(postData(500, '缺少telephone'))
        delFsFile(filename)
        return
    }

    if (direction === undefined) {
        res.send(postData(500, '缺少direction'))
        delFsFile(filename)
        return
    }

    if (sex === undefined) {
        res.send(postData(500, '缺少sex'))
        delFsFile(filename)
        return
    }

    if (email === undefined) {
        res.send(postData(500, '缺少email'))
        delFsFile(filename)
        return
    }

    if (idCard === undefined) {
        res.send(postData(500, '缺少idCard'))
        delFsFile(filename)
        return
    }

    if (classesId === undefined) {
        res.send(postData(500, '缺少classesId'))
        delFsFile(filename)
        return
    }

    if (birth === undefined) {
        res.send(postData(500, '缺少birth'))
        delFsFile(filename)
        return
    }

 if (isHidden === undefined) {
        res.send(postData(500, '缺少isHidden'))
        delFsFile(filename)
        return
    }

    try {
        // 判断数据库中是否已存在该用户名
        let find_data = await sqlQuery(`select * from ${tableName} where student_no = '${studentNo}'`)
        let find_data2 = await sqlQuery(`select * from ${tableName2} where telephone = '${telephone}'`)
        let find_data3 = await sqlQuery(`select * from ${tableName2} where email = '${email}'`)


        if (find_data.length != 0) {
            res.send(postData(500, '当前学号已被注册，请重新输入'))
            delFsFile(filename)
            return
        }

        if (find_data2.length != 0) {
            res.send(postData(500, '当前手机号已被注册，请重新输入'))
            delFsFile(filename)
            return
        }

        if (find_data3.length != 0) {
            res.send(postData(500, '当前邮箱已被注册，请重新输入'))
            delFsFile(filename)
            return
        }

        // 将用户名和密码写入到数据库中
        // 查询最大的自增ID
        let maxID = await sqlQuery(`SELECT max(id) FROM ${tableName}`)
        maxID = maxID[0]['max(id)'] + 1

        if (password === undefined) {
            password = "123456"
        }

        // 将密码进行加密
        password = await bcrypt.hashSync(password, 10);

        if(filename === undefined){
            filename = 'default_avatar.jpg'
        }

        // 添加用户的sql语句
        let insertSQL = `insert into ${tableName} value(
                     ${maxID},
                    '${studentName}',
                    '${studentNo}',
                    '${password}',
                    '${sex}',
                    ${classesId},
                    '${direction}',
                    '${introduction}',
                    '${filename}',
                     ${maxID},
                    '${time}',
                    '${isHidden}'
)`

        let insertSQL2 = `insert into ${tableName2} value(
                     ${maxID},
                    '${telephone}',
                    '${email}',
                    '${idCard}',
                    '${birth}',
                    '${schoolOrWork}'
)`

        await sqlQuery(insertSQL)
        await sqlQuery(insertSQL2)

        // console.log(token);
        let data = postData(200, '注册成功')
        res.send(data)

    } catch (err) {
        console.log(err);
        res.send(postData(500, '注册失败'))
        try {
            delFsFile(filename)
        } catch (e) {
        }
    }
}