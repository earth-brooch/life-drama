const router = require('express').Router()
const User = require('../db/models/user')
module.exports = router

router.post('/login', isAuthenticated, (user, req, res, next) => {
  try {
    req.login(user, err => (err ? next(err) : res.json(user)))
    res.status(200)
  } catch (err) {
    next(err)
  }
})

router.post('/signup', isAuthenticated, (newUser, req, res, next) => {
  try {
    req.login(newUser, err => (err ? next(err) : res.json(newUser)))
    res.status(200)
  } catch (err) {
    next(err)
  }
})

router.post('/logout', (req, res) => {
  req.logout()
  req.session.destroy()
  res.redirect('/')
})

router.get('/me', (req, res) => {
  res.json(req.user)
})

router.use('/google', require('./google'))

//Authentication Middleware Function for login and signup routes
async function isAuthenticated(req, res, next) {
  try {
    const {email, password} = req.body
    const user = await User.findOne({where: {email: email}})
    switch (req.path) {
      case '/login': {
        if (!user) {
          console.log('User not found:', email)
          res.status(403).send('Login failed: Invalid username or password')
        } else if (!user.correctPassword(password)) {
          console.log('Incorrect password entered for user:', email)
          res.status(403).send('Login failed: Invalid username or password')
        } else {
          return next(user)
        }
        break
      }
      case '/signup': {
        if (!user) {
          const newUser = await User.create(req.body)
          return next(newUser)
        } else {
          res.status(403).send('User already exists')
        }
        break
      }
      default:
        next()
    }
  } catch (err) {
    next(err)
  }
}
