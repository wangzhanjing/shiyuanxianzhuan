'use strict';

// 获取云数据库的引用
const db = uniCloud.database()
// 获取goodsList表的引用
const collection = db.collection('goodsList')
exports.main = async (event, context) => {
	//event为客户端上传的参数 context可以打印
	let res = await collection.get()
	
	//返回数据给客户端
	return res
};
