// dotenv: 載入環境變數
if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}

// express: 建立和配置 Express 應用
const express = require('express')
const app = express()
const port = process.env.PORT || 3000

// patches: 引入中間件及配置
const passport = require('./config/passport')
const session = require('express-session')
const flash = require('connect-flash')

// express-handlebars: 設定視圖引擎為 handlebars
const exphbs = require('express-handlebars')
app.engine('handlebars', exphbs.engine({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars')

// 靜態檔案和解析器: 設定靜態檔案路徑及請求解析器
app.use(express.static('public'))
app.use(express.urlencoded({ extended: true }))

// session and messages: 配置會話和閃存訊息中間件
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true 
  })
)
app.use(passport.initialize())
app.use(passport.session())
app.use(flash())

// 設置全局變數: 設定閃存訊息至響應局部變量
app.use((req, res, next) => {
  res.locals.success_messages = req.flash('success_messages')
  res.locals.error_messages = req.flash('error_messages')
  next()
})

// router: 引入和使用路由
const router = require('./routes')
app.use('/', router)

// listener: 啟動伺服器
app.listen(port, () => {
  console.log(`The server is running on http://localhost:${port}\n伺服器已上線，網址為 http://localhost:${port}`)
})