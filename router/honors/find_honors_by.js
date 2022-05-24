let {sqlQuery} = require('../../model/dataBase')
let {resultData, postData} = require('../../tool/resultData')
let {setToken, verify_Token} = require('../../tool/token')
let {timeFommater, timeFommater2} = require('../../tool/tool')

// 当前接口要操作的数据表名
let userInfoTableName = 'honors'

module.exports = async (req, res, next) => {
    try {
        let participationId = req.query.participationId

        let sendData = [];

        if (participationId === undefined) {
            res.send(postData(500, "缺少participationId"))
            return
        }


        let userInfo = await sqlQuery(`select * from ${userInfoTableName} where participation_id = ${participationId}`)

        for (let i = 0; i < userInfo.length; i++) {
            sendData.push({
                id:userInfo[i].id,
                tournamentsId:userInfo[i].tournaments_id,
                honorsAchievement:userInfo[i].honors_achievement,
                honorsImgs:userInfo[i].honors_imgs,
                acquisitionTime:timeFommater2(userInfo[i].acquisition_time),
                releaseTime:timeFommater(userInfo[i].release_time),
                releaseId:userInfo[i].release_id,
                participationId:userInfo[i].participation_id,
                instructorName:userInfo[i].instructor_name
            })
        }

        res.send(resultData("查询成功", 200, sendData))

    } catch (error) {
        console.log(error);
        res.send(postData(500, '查询失败'))
    }
}