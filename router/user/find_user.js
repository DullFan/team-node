let {sqlQuery} = require('../../model/dataBase')
let {resultData, postData} = require('../../tool/resultData')
let {setToken, verify_Token} = require('../../tool/token')
let {timeFommater, timeFommater2} = require('../../tool/tool')

// 当前接口要操作的数据表名
let userInfoTableName = 'student'
let classNameTableName = 'classes'

module.exports = async (req, res, next) => {
    try {
        //页码
        let pageNum = req.query.pageNum;
        //每页显示的数量
        let pageSize = req.query.pageSize

        let sendData = [];

        if (pageNum === undefined) {
            res.send(postData(500, "缺少pageNum"))
            return
        }

        if (pageSize === undefined) {
            res.send(postData(500, "缺少pageSize"))
            return
        }
        pageNum = pageNum - 1

        let userInfo = await sqlQuery(`select * from ${userInfoTableName} limit ${pageNum},${pageSize}`)

        for (let i = 0; i < userInfo.length; i++) {
            let className = await sqlQuery(`select * from ${classNameTableName} where id = '${userInfo[i].classes_id}'`)

            sendData.push({
                id:userInfo[i].id,
                studentName:userInfo[i].student_name,
                studentNo:userInfo[i].student_no,
                sex:userInfo[i].sex,
                gradeLevel:className[0].grade_level,
                className:className[0].class_name,
                introduction:userInfo[i].introduction,
                avatar:userInfo[i].avatar,
                createdTime:timeFommater(userInfo[i].created_time),
                direction:userInfo[i].direction
            })
        }


        res.send(resultData("查询成功", 200, sendData))
    } catch (error) {
        console.log(error);
        res.send(postData(500, '查询失败'))
    }
}