// 统一接口返回的数据
function resultData(code, msg, data) {
    return {
        code,
        msg,
        data: data || [],
    }
}

function postData(code, msg) {
    return {
        code,
        msg
    }
}

module.exports = {
    resultData,
    postData
}