//服务报错模块
var createError = require('http-errors');
//express框架
var express = require('express');
//地址模块，用于处理绝对地址
var path = require('path');
//cookie模块，后台的本地储存
var cookieParser = require('cookie-parser');
//morgan日志模块
var logger = require('morgan');
//后台本地储存session模块
var session = require('express-session');

//路由模块
var indexRouter = require('./routes/index');
//var usersRouter = require('./routes/users');

//入口函数
var app = express();

// view engine setup
//HTML模块
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');//或者ejs

//使用带状态码的详细日志
app.use(logger('dev'));
//使用并配置session模块
app.use(session({
	name: 'BBS',//储存session_id的cookie的名称
	secret: 'BBS',//加密字符串，必须
	cookie: {maxAge: 3600000},//cookie失效时间，毫秒
	resave: false,//每次请求是否都重新设置session
	saveUninitialized: false//每次请求是否都重新设置session
}));
//处理post请求
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
//加载cookie
app.use(cookieParser());
//开放文件夹（静态资源）  使用地址模块处理地址为绝对路径
app.use(express.static(path.join(__dirname, 'public')));

//按需加载路由
app.use('/BBS', indexRouter);//localhost:3000/BBS
//app.use('/users', usersRouter);//localhost:3000/users

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

//暴露app模块
module.exports = app;
