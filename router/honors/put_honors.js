const bcrypt = require('bcryptjs'); // 导入bcryptjs模块
const fs = require('fs');
const sd = require('silly-datetime');

let {setToken, verify_Token} = require('../../tool/token')
let {sqlQuery} = require('../../model/dataBase')
let {postData} = require('../../tool/resultData')
let {delFsFile} = require('../../tool/tool')


// 当前接口要操作的数据表名
let tableName = 'honors'


module.exports = async (req, res, next) => {
    const token = req.headers['authorization']

    let {
        honorsId,
        tournamentsId,
        honorsAchievement,
        acquisitionTime,
        participationId,
        instructorName,
        releaseId
    } = req.body

    const time = sd.format(new Date(), 'YYYY-MM-DD HH:mm:ss');
    let tokenData = await verify_Token(token)

    if (tokenData.role == '教师') {

        if (honorsId === undefined) {
            res.send(postData(500, '缺少honorsId'))
            try {
                for (let filesKey in req.files) {
                    delFsFile(req.files[filesKey].filename)
                }
            } catch (e) {
            }
            return
        }

        if (tournamentsId === undefined) {
            res.send(postData(500, '缺少tournamentsId'))
            try {
                for (let filesKey in req.files) {
                    delFsFile(req.files[filesKey].filename)
                }
            } catch (e) {
            }
            return
        }

        if (honorsAchievement === undefined) {
            res.send(postData(500, '缺少honorsAchievement'))
            try {
                for (let filesKey in req.files) {
                    delFsFile(req.files[filesKey].filename)
                }
            } catch (e) {
            }
            return
        }

        if (acquisitionTime === undefined) {
            res.send(postData(500, '缺少acquisitionTime'))
            try {
                for (let filesKey in req.files) {
                    delFsFile(req.files[filesKey].filename)
                }
            } catch (e) {
            }
            return
        }

        if (participationId === undefined) {
            res.send(postData(500, '缺少participationId'))
            try {
                for (let filesKey in req.files) {
                    delFsFile(req.files[filesKey].filename)
                }
            } catch (e) {
            }
            return
        }

        if (releaseId === undefined) {
            res.send(postData(500, '缺少releaseId'))
            try {
                for (let filesKey in req.files) {
                    delFsFile(req.files[filesKey].filename)
                }
            } catch (e) {
            }
            return
        }

        if (instructorName === undefined) {
            res.send(postData(500, '缺少instructorName'))
            try {
                for (let filesKey in req.files) {
                    delFsFile(req.files[filesKey].filename)
                }
            } catch (e) {
            }
            return
        }

        if (req.files.length === 0) {
            res.send(postData(500, '缺少img字段'))
            return
        }

        try {
            // 将用户名和密码写入到数据库中
            // 查询最大的自增ID
            let maxID = await sqlQuery(`SELECT max(id) FROM ${tableName}`)
            maxID = maxID[0]['max(id)'] + 1

            let newsData = await sqlQuery(`select * from ${tableName} where id = ${honorsId}`)

            let imgDataOld = newsData[0].honors_imgs.split(',')


            try {
                for (let imgDataOldKey in imgDataOld) {
                    await delFsFile(imgDataOld[imgDataOldKey])
                }
            } catch (e) {

            }


            if (req.files.length === 0) {
                console.log()
            }
            let newsImg = ''
            for (let filesKey in req.files) {
                newsImg += (req.files[filesKey].filename + ',')
            }

            let dataIma = newsImg.split(',')
            console.log(newsImg)
            // 添加用户的sql语句
            let insertSQL = `update ${tableName} set
                    tournaments_id = '${tournamentsId}',
                   honors_achievement =  '${honorsAchievement}',
                   honors_imgs =  '${dataIma}',
                   acquisition_time =  '${acquisitionTime}',
                    release_id =  ${releaseId},
                   participation_id =  '${participationId}',
                    instructor_name = '${instructorName}'
                    where id = ${honorsId}`
            await sqlQuery(insertSQL)
            let data = postData(200, '修改成功')
            res.send(data)
        } catch (err) {
            console.log(err);
            res.send(postData(500, '修改失败'))
            try {
                for (let filesKey in req.files) {
                    delFsFile(req.files[filesKey].filename)
                }
            } catch (e) {

            }
        }

    } else {
        res.send(postData(500, '当前用户无法进行操作'))
    }
}