//封装MongoDB的增删改查功能
var MongoClient = require('mongodb').MongoClient;
const URL = 'mongodb://127.0.0.1:27017';
const DATABASE = 'BBS';
var add = function (collection,data,callback){
	collection.insert(data,(err,result)=>{
		if(err){
			console.log("Error:" + err)
		}else{
			callback(result)
		}
	})
};
var remove = function(collection,data,callback){
	collection.deleteOne(data,(err,result)=>{
		if(err){
			console.log("Error:" + err)
		}else{
			callback(result)
		}
	})
};
var update = function(collection,data,callback){
	collection.updateOne(data[0],data[1],(err,result)=>{
		if(err){
			console.log("Error:" + err)
		}else{
			callback(result)
		}
	})
};
var find = function(collection,data,callback){
	collection.find(data).toArray((err,result)=>{
		if(err){
			console.log("Error:" + err)
		}else{
			callback(result)
		}
	})
};
var obj = {
	add,
	remove,
	update,
	find
};
//暴露MongoDB的增删改查函数
module.exports = function(colName,type,data,callback){
	MongoClient.connect(URL,(err,client)=>{
		if(err){
			console.log("数据库链接错误:" + err)
		}else{
			var db = client.db(DATABASE);
			var collection = db.collection(colName);
			obj[type](collection,data,callback)
		}		
	})	
}
