var express = require('express');
var router = express.Router();
var db = require('./mongodb');//加载操作后台数据库功能
/* GET home page. */
//router.get('/', function(req, res, next) {
//res.render('index', { title: 'Express' });
//});

//查询BBS数据库userList集合
router.post('/Admin', function(req, res) {//post发送的数据在req.body中
	switch(req.query.action) {            //get发送的数据在req.query中，get传参可以用来分发后台api端口
		case 'register': //注册操作，后台验证注册的数据是否符合要求
			let user = req.body.user.match(/^[\dA-z]{5,12}$/) ? req.body.user : false;
			let nickname = req.body.nickname.match(/^[\u4e00-\u9fa5]{1,12}$/) ? req.body.nickname : false;
			let truename = req.body.truename.match(/^[\u4e00-\u9fa5]{1,4}$/) ? req.body.truename : false;
			let idcard = req.body.idcard.match(/^\d{6}(19|2[01])\d\d((0[13578]|1[02])(0[1-9]|[12]\d|3[01])|((0[469]|11)(0[1-9]|[12]\d|30))|(02(0[1-9]|[12]\d)))\d{3}(\d|X)$/) ? req.body.idcard : false;
			let phone = req.body.phone.match(/^1(([358]\d)|66|7[789]|9[89])\d{8}$/) ? req.body.phone : false;
			if(user && nickname && truename && idcard && phone) {//后台验证ok后查询数据库，看是否重名
				db('userList', 'find', {}, arr => {
					let flag = arr.some(v => v.user === user);
					if(flag) {
						res.send({
							code: 400,
							err: '该账号名称已注册，请选择新的名称'
						})
					} else {
						var data = {//注册功能参数
							user,//用户账号
							pass: req.body.pass,//用户密码
							nickname,//用户昵称
							truename,//用户真实姓名
							idcard,//用户身份证
							phone,//用户手机号码
							headerpic: '',//默认头像
							tokenid: arr.length + 1//用户身份唯一标识id，用于索引
						};
						db('userList', 'add', data, result => {
							if(result.result.n > 0) {//添加成功
								res.send({
									code: 200,
									success: '注册成功'
								})
							} else {
								res.send({
									code: 400,
									err: '后台注册失败'
								})
							}
						})
					}
				})
			} else {
				res.send({
					code: 400,
					err: '输入格式有误，请检查'
				})
			}
			break;
		case 'login': //登录操作，验证用户名是否符合规范
			if(req.body.user.match(/^[\dA-z]{5,12}$/)) {
				var data = {
					user: req.body.user,
					pass: req.body.pass
				};
				db('userList', 'find', data, result => {//按账号密码查询用户是否注册
					if(result.length > 0) {//匹配到用户
						//req.session.userInfo = result[0].tokenid;在后台项目根目录的app.js文件中引入express-session框架并配置ok使用
						req.session.userInfo = {//在后台储存中记录用户id等不敏感信息，方便登录状态验证
							tokenid: result[0].tokenid
						};
						res.send({
							code: 200,
							success: '登录成功'
						})
					} else {
						res.send({
							code: 400,
							err: '登录失败，账号或密码有误'
						})
					}
				})
			} else {
				res.send({
					code: 400,
					err: '账号格式有误'
				})
			}

			break;
		case 'getUserInfo': //查询登录者信息
			if(req.session.userInfo) {//根据后台储存信息确认用户是否登录
				db('userList', 'find', {
					tokenid: req.session.userInfo.tokenid//根据登陆者id查询登录者信息
				}, result => {
					if(result.length > 0) {
						var data = {
							tokenid: result[0].tokenid,
							truename: result[0].truename,
							nickname: result[0].nickname,
							phone: result[0].phone
						};//将用户在页面中显示的信息返回，同时将此信息存储到后台用户信息中，方便用户操作时获取其他信息的验证查找
						Object.assign(req.session.userInfo, data) //对象重组，将新对象添加到目标对象中
						res.send({
							code: 200,
							success: '登录成功',
							data
						})
					} else {
						res.send({
							code: 400,
							err: '登录异常，请重新登录'
						})
					}
				})
			} else {
				res.send({
					code: 400,
					err: '请先登录'
				})
			}
			break;
	}
});
router.get('/Admin', (req, res) => {
	switch(req.query.action) {
		case 'quit': //退出登录
			req.session.userInfo = null;//清空该用户后台储存的信息
			if(req.session.userInfo == null) {
				res.send({
					code: 200,
					success: '退出登录'
				})
			} else {
				res.send({
					code: 400,
					err: '退出登录失败'
				})
			}
			break;
	}
})
//查询BBS数据库articleList集合
router.post('/Article', (req, res) => {
	//	console.log(req.session.userInfo)
	switch(req.query.action) {
		case 'publish': //发布文章
			if(req.session.userInfo) {//是否登录
				if(req.body.title && req.body.main) {//发布内容验证
					db('articleList', 'find', {}, arr => {
						var data = {//保存文章时需要的信息
							title: req.body.title,//文章标题
							main: req.body.main,//文章内容
							author: req.session.userInfo.nickname,//作者昵称
							authorid: req.session.userInfo.tokenid,//作者id
							articleid: arr.length + 1,//给每一篇文章绑定唯一标识id
							createtime: new Date().toLocaleString()//，创作时间，要转换为本地字符串样式时间
						};
						db('articleList', 'add', data, result => {
							if(result.result.n != 0) {//数据库内容添加成功
								res.send({
									code: 200,
									success: '发布成功'
								})
							} else {
								res.send({
									code: 400,
									err: '发布失败'
								})
							}
						})
					})
				} else {
					res.send({
						code: 400,
						err: '文章标题和内容不能为空'
					})
				}
			} else {
				res.send({
					code: 400,
					err: '请先登录'
				})
			}
			break;
	}
});
router.get('/Article', (req, res) => {
	switch(req.query.action) {
		case 'getMyArticle': //查询登录者发布的文章，并对返回信息做分页处理
			if(req.session.userInfo) {//是否登录
				db('articleList', 'find', {
					authorid: req.session.userInfo.tokenid//根据用户id，查找其发布的文章
				}, arr => {
					if(arr.length > 0) {//获取文章成功
						var size = 10; //每页数据条数
						res.send({
							code: 200,
							success: '获取成功',
							data: {
								total: arr.length, //总数据条数
								curpage: req.query.curpage,//当前页数
								pagesize: size,//每个数据条数
								curdata: arr.slice(req.query.curpage * 10, req.query.curpage * 10 + 10)//根据页数返回当前页数据
							}
						})
					} else {
						res.send({
							code: 400,
							err: '您还未发布任何文章，请先发布'
						})
					}
				})
			} else {
				res.send({
					code: 400,
					err: '请先登录'
				})
			}
			break;
		case 'getAllArticle': //查询所有发布的文章，并对返回信息做分页处理
			db('articleList', 'find', {}, arr => {
				if(arr.length > 0) {
					var size = 10;
					res.send({
						code: 200,
						success: '站点文章获取成功',
						data: {
							total: arr.length,
							pagesize: size,
							curpage: req.query.curpage,
							curdata: arr.slice(req.query.curpage * 10, req.query.curpage * 10 + 10)
						}
					})
				} else {
					res.send({
						code: 400,
						err: '站点未发布任何文章'
					})
				}
			})
			break;
		case 'articleDetail'://查询文章详情
		console.log(req.query.articleid)
		if(req.query.articleid){		
			db('articleList','find',{
				articleid: parseInt(req.query.articleid)//记得数据类型转换，不然匹配不到
			},arr=>{
				if(arr.length>0){
					res.send({
						code: 200,
						success: '文章内容获取成功',
						data: arr[0]
					})
				}else{
					res.send({
						code: 400,
						err: '文章内容获取失败'
					})
				}
			})
		}else{
			res.send({
					code: 400,
					err: '该文章内容不存在'
				})
		}
		break;
	};
});
//查询评论列表数据
router.get('/Discuss',(req,res)=>{
	switch (req.query.action){
		case 'publishDiscuss'://发布评论
		if(req.session.userInfo){//登录状态
			if(req.query.main && req.query.articleid){//评论内容不能为空，要评论的文章id
				db('discussList','find',{},arr=>{
					var data = {
						createtime: new Date().toLocaleString(),
						main: req.query.main,
						author: req.session.userInfo.nickname,
						okNum: 0,
						discussid: arr.length + 1,
						articleid: req.query.articleid,
						tokenid: req.session.userInfo.tokenid
					};
					db('discussList','add',data,result=>{
						if(result.result.n != 0){
							res.send({
									code: 200,
									success: '评论成功'
								})
						}else{
							res.send({
								code: 400,
								err: '评论失败'
							})
						}
					})
				})
			}else{
				res.send({
					code: 400,
					err: '评论不能为空'
				})
			}			
		}else{
			res.send({
					code: 400,
					err: '请先登录'
				})
		}
		break;
		case 'getDiscuss'://获取评论列表，同时将每个评论下的回复一起返回
		console.log(req.query.articleid)
		 if(req.query.articleid){//前端传递文章id
		 	db('discussList','find',{articleid: req.query.articleid},discussArr=>{
		 		if(discussArr.length > 0){		 			
	 				db('replyList','find',{articleid: req.query.articleid},replyArr=>{	
	 					discussArr.forEach(discussValue=>{	 						
	 						var result = replyArr.filter(replayValue=>{
	 							return replayValue.discussid == discussValue.discussid
	 						});
	 						discussValue.replyList = result;
	 					})
	 					res.send({
							code: 200,
							success: '文章评论获取成功',
							data: discussArr
						})
	 				})		 			
		 		}else{
		 			res.send({
						code: 400,
						err: '暂无评论'
					})
		 		}
		 	})
		 }else{
		 	res.send({
					code: 400,
					err: '文章获取错误'
				})
		 }
		break;
	}
});
router.get('/Reply',(req,res)=>{
	switch (req.query.action){
		case 'publishReply':
		if(req.session.userInfo){
			console.log(req.query.discussid , req.query.articleid , req.query.toid , req.query.discusser , req.query.main)
			if(req.query.discussid && req.query.articleid && req.query.toid && req.query.discusser && req.query.main){
				db('replyList','find',{},arr=>{
					var data = {
						replyid: arr.length + 1,//回复id
						discussid: req.query.discussid,//评论id
						articleid: req.query.articleid,//文章id
						fromid: req.session.userInfo.tokenid,//回复者id
						replyer: req.session.userInfo.nickname,//回复者
						toid: req.query.toid,//评论者id
						discusser: req.query.discusser,//评论者
						createtime: new Date().toLocaleString(),//回复时间
						main: req.query.main//回复内容
					};
					db('replyList','add',data,result=>{
						if(result.result.n != 0){
							res.send({
								code: 200,
								success: '回复成功'
							})
						}else{
							res.send({
								code: 400,
								err: '回复失败'
							})
						}
					})
				})
			}else{
				res.send({
					code: 400,
					err: '参数有误'
				})
			}
		}else{
			res.send({
					code: 400,
					err: '请先登录'
				})
		}
		break;		
	}
});
router.get('/Laud',(req,res)=>{
	switch (req.query.action){
		case 'addLaud':
		if(req.session.userInfo){//是否登录
			if(req.query.discussid){//前端传递评论id
				db('laudList','find',{discussid: req.query.discussid},arr=>{//根据评论id查找其点赞列表
					var flag = arr.some(v=>v.tokenid == req.session.userInfo.tokenid);//查询点赞列表中登陆者是否点赞
					if(flag){//存在
						res.send({
							code: 400,
							err: '已经点过赞了，不能重复点赞'
						})
					}else{//不存在，添加到点赞列表
						db('laudList','add',{
							discussid: req.query.discussid,
							tokenid: req.session.userInfo.tokenid,
							laudid: arr.length + 1
						},result=>{
							console.log(result)
							if(result.result.n != 0){//添加成功
								db('discussList','update',[{
									discussid: parseInt(req.query.discussid)
								},{//根据评论id找到该评论，更新评论中点赞数
									$inc: {okNum: 1}//自动加一
								}],result=>{
									if(result.result.n != 0){//更新成功
										res.send({
											code: 200,
											success: '点赞成功'
										})
									}else{
										res.send({
											code: 400,
											err: '点赞失败'
										})
									}
								})
							}else{
								res.send({
									code: 400,
									err: '添加失败'
								})
							}
						})						
					}
				})	
			}else{
				res.send({
					code: 400,
					err: '参数有误'
				})
			}			
		}else{
			res.send({
				code: 400,
				err: '请先登录'
			})
		}
		break;
	}
})
module.exports = router;
