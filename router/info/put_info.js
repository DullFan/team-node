const bcrypt = require('bcryptjs'); // 导入bcryptjs模块
const fs = require('fs');
const sd = require('silly-datetime');

let {sqlQuery} = require('../../model/dataBase')
let {postData} = require('../../tool/resultData')
let {delFsFile} = require('../../tool/tool')
let {setToken, verify_Token} = require('../../tool/token')


// 当前接口要操作的数据表名
let userInfoTableName = 'student'
let detailsTableName = 'student_details'

module.exports = async (req, res, next) => {
    const token = await req.headers['authorization']
    let {
        studentId,
        studentNo,
        studentName,
        telephone,
        sex,
        email,
        idCard,
        classesId,
        introduction,
        isHidden,
        birth,
        schoolOrWork,
        direction
    } = req.body

    try {
        var data = await verify_Token(token)
        try {
            var filename = req.files[0].filename
        } catch (e) {

        }
        if (data.role === "教师") {

            if (studentId === undefined) {
                res.send(postData(500, "缺少studentId"))
                delFsFile(filename)
                return
            }
            if (direction === undefined) {
                res.send(postData(500, "缺少direction"))
                delFsFile(filename)
                return
            }

            if (telephone === undefined) {
                res.send(postData(500, '缺少telephone'))
                delFsFile(filename)
                return
            }

            if (email === undefined) {
                res.send(postData(500, '缺少email'))
                delFsFile(filename)
                return
            }

            if (introduction === undefined) {
                res.send(postData(500, '缺少introduction'))
                delFsFile(filename)
                return
            }

            if (schoolOrWork === undefined) {
                res.send(postData(500, '缺少schoolOrWork'))
                delFsFile(filename)
                return
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

            if (sex === undefined) {
                res.send(postData(500, '缺少sex'))
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


            let userInfo = await sqlQuery(`select * from ${userInfoTableName} where id = ${studentId}`)

            let data1 = await sqlQuery(`select * from ${detailsTableName} where telephone = ${telephone}`)
            if (data1.length != 0) {
                if(data1[0].id != studentId){
                    res.send(postData(500, '当前手机号已存在'))
                    delFsFile(filename)
                    return
                }
            }

            let data2 = await sqlQuery(`select * from ${detailsTableName} where email = '${email}'`)
            if (data2.length != 0) {
                if(data2[0].id != studentId){
                    res.send(postData(500, '当前邮箱已存在'))
                    delFsFile(filename)
                    return
                }
            }

            if (filename !== undefined) {
                console.log('进来了')
                if (userInfo[0].avatar != 'default_avatar.jpg') {
                    delFsFile(userInfo[0].avatar)
                }
            }

            if (filename === undefined) {
                filename = userInfo[0].avatar
            }

            console.log(filename)
            await sqlQuery(`update ${userInfoTableName} set classes_id = ${classesId} ,student_no = '${studentNo}',sex = ${sex},student_name = '${studentName}',introduction = '${introduction}',avatar = '${filename}',direction = '${direction}' where id = '${studentId}'`)
            await sqlQuery(`update ${detailsTableName} set telephone = '${telephone}',email = '${email}',school_or_workplace = '${schoolOrWork}',id_card = '${idCard}' where id = ${studentId}`)

            res.send(postData(200, "修改成功"))

        } else {
            if (telephone === undefined) {
                res.send(postData(500, '缺少telephone'))
                delFsFile(filename)
                return
            }

            if (email === undefined) {
                res.send(postData(500, '缺少email'))
                delFsFile(filename)
                return
            }

            if (introduction === undefined) {
                res.send(postData(500, '缺少introduction'))
                delFsFile(filename)
                return
            }

            if (schoolOrWork === undefined) {
                res.send(postData(500, '缺少schoolOrWork'))
                delFsFile(filename)
                return
            }

            if (isHidden === undefined) {
                res.send(postData(500, '缺少isHidden'))
                delFsFile(filename)
                return
            }

            let userInfo = await sqlQuery(`select * from ${userInfoTableName} where id = ${data.userId}`)

            let data1 = await sqlQuery(`select * from ${detailsTableName} where telephone = ${telephone}`)
            if (data1.length !== 0) {
                if(data1[0].id !== data.userId){
                    res.send(postData(500, '当前手机号已存在'))
                    return
                }
            }

            let data2 = await sqlQuery(`select * from ${detailsTableName} where email = '${email}'`)
            if (data2.length !== 0) {
                if(data2[0].id !== data.userId){
                    res.send(postData(500, '当前邮箱已存在'))
                    return
                }
            }

            if (filename !== undefined) {
                if (userInfo[0].avatar !== 'default_avatar.jpg') {
                    delFsFile(userInfo[0].avatar)
                }
            }

            if (filename === undefined) {
                filename = userInfo[0].avatar
            }

            await sqlQuery(`update ${userInfoTableName} set introduction = '${introduction}', is_hidden = '${isHidden}',avatar = '${filename}' where id = ${data.userId}`)
            await sqlQuery(`update ${detailsTableName} set telephone = '${telephone}',email = '${email}',school_or_workplace = '${schoolOrWork}' where id = ${data.userId}`)

            res.send(postData(200, "修改成功"))
        }

    } catch (error) {
        console.log(error);
        res.send(postData(500, '修改失败'))
    }
}