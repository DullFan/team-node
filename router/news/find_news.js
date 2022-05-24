let {sqlQuery} = require('../../model/dataBase')
let {resultData, postData} = require('../../tool/resultData')
let {setToken, verify_Token} = require('../../tool/token')
let {timeFommater, timeFommater2} = require('../../tool/tool')

// 当前接口要操作的数据表名
let userInfoTableName = 'news'

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
            sendData.push({
                id:userInfo[i].id,
                newTitle:userInfo[i].news_title,
                newContent:userInfo[i].news_content,
                newImg:userInfo[i].news_img,
                CreatedTime:userInfo[i].created_time,
                postedById:userInfo[i].posted_by_id,
                newsViews:userInfo[i].news_views,
                isSticky:userInfo[i].is_sticky,
            })
        }


        res.send(resultData("查询成功", 200, sendData))

    } catch (error) {
        console.log(error);
        res.send(postData(500, '查询失败'))
    }
}