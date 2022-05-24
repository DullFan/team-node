let {sqlQuery} = require('../../model/dataBase')
let {resultData, postData} = require('../../tool/resultData')
let {setToken, verify_Token} = require('../../tool/token')
let {timeFommater, timeFommater2} = require('../../tool/tool')

// 当前接口要操作的数据表名
let userInfoTableName = 'student'
let classNameTableName = 'classes'
let detailsTableName = 'student_details'

module.exports = async (req, res, next) => {
    const token = req.headers['authorization']
    try {
        var data = await verify_Token(token)
        let user_id = req.query.userId;
        let sendData;

        if(user_id === undefined){

            if(data.role !== '教师'){
                // 1. 根据学号去查找对应的数据
                let detailsData = await sqlQuery(`select * from ${detailsTableName} where telephone = '${data.phone}'`)

                let userInfo = await sqlQuery(`select * from ${userInfoTableName} where details_id = '${detailsData[0].id}'`)

                let className = await sqlQuery(`select * from ${classNameTableName} where id = '${userInfo[0].classes_id}'`)

                sendData = {
                    id: userInfo[0].id,
                    studentName: userInfo[0].student_name,
                    studentNo: userInfo[0].student_no,
                    sex: userInfo[0].sex,
                    avatar: userInfo[0].avatar,
                    introduction:userInfo[0].introduction,
                    createdTime: timeFommater(userInfo[0].created_time),
                    gradeLevel: className[0].grade_level,
                    className: className[0].class_name,
                    telephone: detailsData[0].telephone,
                    email: detailsData[0].email,
                    birthTime: timeFommater2(detailsData[0].birth_time),
                    schoolOrWorkplace: detailsData[0].school_or_workplace,
                    idCard: detailsData[0].id_card,
                    direction:userInfo[0].direction
                }
            }else{
                res.send(postData(500, '缺少userId'))
                return
            }
        }else{
            // 1. 根据学号去查找对应的数据
            let detailsData = await sqlQuery(`select * from ${detailsTableName} where id = '${user_id}'`)

            let userInfo = await sqlQuery(`select * from ${userInfoTableName} where details_id = '${detailsData[0].id}'`)

            let className = await sqlQuery(`select * from ${classNameTableName} where id = '${userInfo[0].classes_id}'`)


            console.log(data.role)
            if (data.role === '教师') {
                sendData = {
                    id: userInfo[0].id,
                    studentName: userInfo[0].student_name,
                    studentNo: userInfo[0].student_no,
                    sex: userInfo[0].sex,
                    avatar: userInfo[0].avatar,
                    introduction:userInfo[0].introduction,
                    createdTime: timeFommater(userInfo[0].created_time),
                    gradeLevel: className[0].grade_level,
                    className: className[0].class_name,
                    telephone: detailsData[0].telephone,
                    email: detailsData[0].email,
                    birthTime: timeFommater2(detailsData[0].birth_time),
                    schoolOrWorkplace: detailsData[0].school_or_workplace,
                    idCard: detailsData[0].id_card,
                    direction:userInfo[0].direction
                }

            } else if (userInfo[0].is_hidden === "F") {
                sendData = {
                    id: userInfo[0].id,
                    studentName: userInfo[0].student_name,
                    studentNo: userInfo[0].student_no,
                    sex: userInfo[0].sex,
                    avatar: userInfo[0].avatar,
                    introduction:userInfo[0].introduction,
                    createdTime: timeFommater(userInfo[0].created_time),
                    gradeLevel: className[0].grade_level,
                    className: className[0].class_name,
                    telephone: detailsData[0].telephone,
                    email: detailsData[0].email,
                    birthTime: timeFommater2(detailsData[0].birth_time),
                    schoolOrWorkplace: detailsData[0].school_or_workplace,
                    direction:userInfo[0].direction
                }
            } else {
                sendData = {
                    id: userInfo[0].id,
                    studentName: userInfo[0].student_name,
                    studentNo: userInfo[0].student_no,
                    sex: userInfo[0].sex,
                    avatar: userInfo[0].avatar,
                    introduction:userInfo[0].introduction,
                    createdTime: timeFommater(userInfo[0].created_time),
                    gradeLevel: className[0].grade_level,
                    className: className[0].class_name,
                    direction:userInfo[0].direction
                }
            }
        }

        res.send(resultData(200, "查询成功", sendData))
    } catch (error) {
        console.log(error);
        res.send(postData(500, '查询失败'))
    }
}