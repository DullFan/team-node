const bcrypt = require('bcryptjs'); // 导入bcryptjs模块

let {sqlQuery} = require('../../model/dataBase')
let {setToken, verify_Token} = require('../../tool/token')
let {postData} = require('../../tool/resultData')

// 当前接口要操作的数据表名
let tableName = 'student'
let tableName2 = 'student_details'
let tableName3 = 'teacher'

module.exports = async (req, res, next) => {
    let {username, password} = req.body
    // console.log(username, password);

    try {
        let userInfo = []
        let roleName
        let phone
        let userId

        // 1. 根据用户名查询相关用户数据
        if(username.length === 11){
            userInfo = await sqlQuery(`select * from ${tableName3} where teacher_phone = '${username}'`)
        }else if (username.includes("@")) {
            userInfo = await sqlQuery(`select * from ${tableName3} where teacher_email = '${username}'`)
        }

        if(userInfo.length !== 0){
            phone = userInfo[0].teacher_phone
        }

        roleName = "教师"

        if(userInfo.length === 0){
            if (username.length === 11) {
                userInfo = await sqlQuery(`select * from ${tableName2} where telephone = '${username}'`)
                phone = username
            } else if (username.includes("@")) {
                userInfo = await sqlQuery(`select * from ${tableName2} where email = '${username}'`)
                console.log(userInfo)

                phone = userInfo[0].telephone
            } else {
                userInfo = await sqlQuery(`select * from ${tableName} where student_no = '${username}'`)

                var dataPhone = await sqlQuery(`select * from ${tableName2} where id = '${userInfo[0].details_id}'`)

                phone = dataPhone[0].telephone
            }
            roleName = "学生"
        }

        // 2. 数据库中是否有该用户名
        if (userInfo.length == 0) {
            res.send(postData(500, '用户名或密码不正确，请重新输入'))
            return
        }


        if(userInfo[0].password === undefined){
            userInfo = await sqlQuery(`select * from ${tableName} where details_id = '${userInfo[0].id}'`)
        }

        // 3. 比对密码是否正确 （加密后的密码与原始密码进行比对）
        let isEqual = await bcrypt.compare(password, userInfo[0].password);
        userId = userInfo[0].id

        // isEqual为true则比对正确 否则不比对
        if (isEqual) {
            // 生成token
            console.log(roleName)
            console.log(phone)
            let token = setToken(roleName,phone,userId)
            let data = postData(200, '登录成功')
            res.send({
                ...data,
                token
            })
        } else {
            res.send(postData(500, '用户名或密码不正确，请重新输入'))
        }

    } catch (error) {
        console.log(error);
        res.send(postData(500, '用户名或密码不正确，请重新输入'))
    }
}