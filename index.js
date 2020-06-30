var express = require('express');
var bodyParser = require('body-parser');
var multipart = require('connect-multiparty');
var path = require('path');
const session = require('express-session')
const MongoStore = require('connect-mongo')(session)
const flash = require('connect-flash')
const config = require('config-lite')(__dirname)
const routes = require('./routes')
const pkg = require('./package')
const winston = require('winston')
const expressWinston = require('express-winston')

// 创建服务
var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// 使用 body-parser 中间件来获取 req.body
// create application/json parser
app.use(bodyParser.json())
// create application/x-www-form-urlencoded parser
app.use(bodyParser.urlencoded({
  extended: false
}));


// app.use(cookieParser()); 获取 cookie 解析 req.headers.cookie

// 静态文件默认路径
app.use(express.static(path.join(__dirname, 'public')));

// session 中间件
app.use(session({
  name: config.session.key, // 设置 cookie 中保存 session id 的字段名称
  secret: config.session.secret, // 通过设置 secret 来计算 hash 值并放在 cookie 中，使产生的 signedCookie 防篡改
  resave: true, // 强制更新 session
  saveUninitialized: false, // 设置为 false，强制创建一个 session，即使用户未登录
  cookie: {
    maxAge: config.session.maxAge // 过期时间，过期后 cookie 中的 session id 自动删除
  },
  store: new MongoStore({ // 将 session 存储到 mongodb
    url: config.mongodb // mongodb 地址
  })
}))

// flash 中间件，用来显示通知
app.use(flash())

app.use(multipart())


// 添加模板必需的 3 个变量
app.use(function (req, res, next) {
  res.locals.user = req.session.user
  res.locals.success = req.flash('success').toString()
  res.locals.error = req.flash('error').toString()
  next()
})

// 正常请求的日志
app.use(expressWinston.logger({
  transports: [
    new(winston.transports.Console)({
      json: true,
      colorize: true
    }),
    new winston.transports.File({
      filename: 'logs/success.log'
    })
  ]
}))


// 路由
routes(app)

// 错误请求的日志
app.use(expressWinston.errorLogger({
  transports: [
    new winston.transports.Console({
      json: true,
      colorize: true
    }),
    new winston.transports.File({
      filename: 'logs/error.log'
    })
  ]
}))

app.use(function (err, req, res, next) {
  console.error(err)
  req.flash('error', err.message)
  res.redirect('/')
})

// 监听端口，启动程序
app.listen(config.port, function () {
  console.log("\n \033[42;30m" + pkg.name +
    "\033[40;32m Web Server: http://localhost:" + config.port + " (bind address 127.0.0.1)\n" +
    "\n \033[47;30m Press Ctrl+C to stop \033[0m \n");
})