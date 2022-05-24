const bcrypt = require('bcryptjs'); // 导入bcryptjs模块
const fs = require('fs');
const sd = require('silly-datetime');

let {setToken, verify_Token} = require('../../tool/token')
let {sqlQuery} = require('../../model/dataBase')
let {postData} = require('../../tool/resultData')
let {delFsFile} = require('../../tool/tool')


// 当前接口要操作的数据表名
let tableName = 'tournaments'


module.exports = async (req, res, next) => {
    const token = req.headers['authorization']

    const time = sd.format(new Date(), 'YYYY-MM-DD HH:mm:ss');
    let tokenData = await verify_Token(token)

    let tournamentsId = req.query.tournamentsId;
    if(tournamentsId === undefined){
        res.send(postData(500, '缺少tournamentsId字段'))
        return
    }

    if (tokenData.role == '教师') {

        try {
            await sqlQuery(`delete from ${tableName} where id = ${tournamentsId}`)
            let data = postData(200, '删除成功')
            res.send(data)
        } catch (err) {
            console.log(err);
            res.send(postData(500, '删除失败'))
            try {
                for (let filesKey in req.files) {
                    delFsFile(req.files[filesKey].filename())
                }
            } catch (e) {
            }
        }

    } else {
        res.send(postData(500, '当前用户权限不足'))
    }
}