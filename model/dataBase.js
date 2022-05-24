const mysql = require('mysql')


let { db_config } = require('../config/default')

const db = mysql.createPool({
    host: db_config.host,
    user: db_config.user,
    password: db_config.password,
    database: db_config.database,
});

db.getConnection(err =>{
    if(err){
        console.log("连接数据库失败")
    }else{
        console.log("连接数据库成功")
    }
})

// 基于Promise封装SQL语句查询
function sqlQuery(sql) {
    return new Promise((resolve, reject) => {
        db.query(sql, (err, res) => {
            if (err) {
                reject(err)
            } else {
                resolve(res)
            }
        })
    })
}


module.exports = {
    sqlQuery
}