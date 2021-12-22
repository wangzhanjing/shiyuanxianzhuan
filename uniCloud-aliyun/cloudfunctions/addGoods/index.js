'use strict';


const {
	verifyToken
} = require('wx-common')


exports.main = async (event, context) => {
	const {
		token
	} = event;

	// 获取云数据库的引用
	const db = uniCloud.database()
	// 获取goodsList表的引用
	const collection = db.collection('goodsList')

	// 解密token
	const payload = verifyToken(token);


	//event为客户端上传的参数
	let res = await collection.add({
		openid:payload.openid,
		name: event.name,
		desc: event.desc,
		sort: event.sort,
		price: event.price,
		pre_price: event.pre_price,
		time: event.addTime,
		show_img: event.show_img
	})
	
	// 删除openid，不应该把openid传给用户
	delete res["openid"];
	res["token"] = token;
	//返回数据给客户端
	return res
};
