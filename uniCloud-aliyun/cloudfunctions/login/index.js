'use strict';
//利用公共模块获取 appId appSecret
const {
	appId,
	appSecret,
	getToken
} = require("wx-common");
exports.main = async (event, context) => {
	//event为客户端上传的参数
	// console.log('event : ', event)

	// 获取云数据库的引用
	const db = uniCloud.database()

	const {
		code
	} = event;
	const res = await uniCloud.httpclient.request(
		"https://api.weixin.qq.com/sns/jscode2session?appid=" + appId + "&secret=" + appSecret +
		"&js_code=" + code + "&grant_type=authorization_code", {
			dataType: "json"
		})

	const openid = res.data.openid;

	const token = getToken(openid)
	
	let userData;

	let dbRes = await db.collection("user").where({
		openid: openid
	}).limit(1).get();

	if (dbRes.affectedDocs <= 0) {



		// 创建一个用户信息
		userData = {
			openid: openid,
			nickName: '',
			avatarUrl: '',
			isLogin:false
		}

		// 获取user表的引用
		const collection = db.collection('user')
		// 向user表中增加用户信息
		await collection.add(userData)
		
	}else{
		userData = dbRes.data[0]
	}
     // 看到了  1:59:03

    // 删除openid，不应该把openid传给用户
	delete userData["openid"];
	userData["token"] = token;
	//返回数据给客户端
	return userData
};
