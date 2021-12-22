const appId = 'wxdbb0781e958d7e80'
const appSecret = '25ecf1a7e06f313d34e7a20affd2d8ce'

//npm install jsonwebtoken 安装jwt依赖
const jwt = require("jsonwebtoken");

// 获取token
function getToken(openid){
	return jwt.sign({openid:openid},appSecret,{expiresIn:60*60*24})
}
// 解密token
function verifyToken(token){
	return jwt.verify(token,appSecret)
}

module.exports ={
	appId:appId,
	appSecret:appSecret,
	getToken:getToken,
	verifyToken:verifyToken
}
