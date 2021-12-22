'use strict';

const {
	verifyToken
} = require('wx-common')

exports.main = async (event, context) => {
	//event为客户端上传的参数
	console.log('event : ', event)
	// 拿到用户信息和token
	const {
		userInfo,
		token
	} = event;

	// 解密token
	const payload = verifyToken(token);

	// 获取数据库的引用
	const db = uniCloud.database()
	
	// 选择数据表
	const collection = db.collection("user")
	// 数据表查询命令
	const dbCmd = db.command;
	// 要对一个数据项进行更新
	const dbRes = await collection.where({
		// 不能直接传openid 别人获取到可以修改信息，不安全
		openid: dbCmd.eq(payload.openid) 
	}).update({
		nickName: userInfo.nickName,
		avatarUrl: userInfo.avatarUrl,
		isLogin:true
	})
	
	let userData = await db.collection("user").where({
		openid: dbCmd.eq(payload.openid) 
	}).get();
	
	delete userData.data[0]["openid"];
	
	userData.data[0]["token"] = token;
	//返回数据给客户端
	return userData.data
};
