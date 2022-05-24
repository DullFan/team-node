const jwt = require('jsonwebtoken')

const singnKey = 'team';  //签名

//登录接口 生成token的方法
function setToken(level,phone,user_id) {
    // { user_name: user_name, user_id: user_id } 传入需要解析的值（ 一般为用户名，用户id 等）
    const token = jwt.sign(
        {role: level, phone: phone,userId:user_id},
        singnKey,
        {expiresIn: '24h'}  //expiresln 设置token过期的时间
    );
    return token
}

//各个接口需要验证token的方法
function verify_Token(token) {
    return new Promise((resolve, reject) => {
        jwt.verify(token, singnKey, (err, decode) => {
            if (err) {
                return reject(err)
            } else {
                return resolve(decode)
            }
        })
    });
}

module.exports = {
    setToken,
    verify_Token
}