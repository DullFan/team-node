const fs = require('fs');


// dateTime
function timeFommater(value) {
    var dateee = new Date(value).toJSON();
    var date = new Date(+new Date(dateee) + 8 * 3600 * 1000).toISOString().replace(/T/g, ' ').replace(/\.[\d]{3}Z/, '')
    return date;
}

// date
function timeFommater2(value) {
    var dateee = new Date(value).toJSON();
    var date = new Date(+new Date(dateee) + 8 * 3600 * 1000).toISOString().replace(/T/g, ' ').replace(/\.[\d]{3}Z/, '')
    return date.substring(0,date.length-9);
}

//删除文件
function delFsFile(path){
    if(path !== undefined){
        fs.unlinkSync('public/'+ path)
    }
}

module.exports = {
    timeFommater,
    timeFommater2,
    delFsFile
}