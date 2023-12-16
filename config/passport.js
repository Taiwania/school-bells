const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy
const bcrypt = require('bcryptjs')

const db = require('../models')
const User = db.User

passport.use(new LocalStrategy(
  {
    usernameField: 'email',
    passwordField: 'password',
    passReqToCallback: true
  },
  (req, email, password, cb) => {
    User.findOne({ where: { email } }).then(user => {
      if (!user) return done(null, false, req.flash('error_msg', '您所輸入的 Email 尚未註冊'))
      bcrypt.compare(password, user.password).then(isMatch => {
        if (!isMatch) return done(null, false, req.flash('error_msg', '您所輸入的密碼不正確'))
        return cb(null, user)
      })
    })
  }
))

passport.serializeUser((user, cb) => {
  cb(null, user.id)
})

passport.deserializeUser((id, cb) => {
  User.findByPk(id).then(user => {
    cb(null, user)
  })
})

module.exports = passport