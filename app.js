// dotenv
if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}

// express
const express = require('express')
const app = express()
const port = process.env.PORT || 3000

// express-handlebars
const exphbs = require('express-handlebars')
app.engine('handlebars', exphbs.engine({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars')

// router
const router = require('./routes')

// bootstrap, popper
app.use(express.static('public'))
app.use(express.urlencoded({ extended: true }))

// routes
app.use('/', router)

// listener
app.listen(port, () => {
  console.log(`The server is running on http://localhost:${port}`)
})