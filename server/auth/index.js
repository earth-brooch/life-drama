const router = require('express').Router()
const User = require('../db/models/user')
module.exports = router

router.post('/login', authenticateLogin, (user, req, res, next) => {
  try {
    req.login(user, err => (err ? next(err) : res.json(user)))
    res.status(200)
  } catch (err) {
    next(err)
  }
})

router.post('/signup', authenticateSignup, (newUser, req, res, next) => {
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

async function authenticateLogin(req, res, next) {
  try {
    const {email, password} = req.body
    const user = await User.findOne({where: {email: email}})
    if (!user) {
      console.log('User not found:', email)
      res.status(403).send('Login failed: Invalid username or password')
    } else if (!user.correctPassword(password)) {
      console.log('Incorrect password entered for user:', email)
      res.status(403).send('Login failed: Invalid username or password')
    } else {
      return next(user)
    }
  } catch (error) {
    next(error)
  }
}

async function authenticateSignup(req, res, next) {
  try {
    const {email, password} = req.body
    const user = await User.findOne({where: {email: email}})
    if (!isValidEmail(email)) {
      res.status(403).send('Invalid Email')
    } else if (!isValidPassword(password)) {
      res.status(403).send('Invalid password')
    } else if (user) {
      res.status(403).send('User already exists')
    } else {
      const newUser = await User.create({email, password})
      return next(newUser)
    }
  } catch (error) {
    next(error)
  }
}

//Helper Functions

function isValidEmail(email) {
  console.log('Testing email...')
  const format = new RegExp(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/)
  return format.test(email)
}

function isValidPassword(password) {
  console.log('Testing password...')
  const format = new RegExp(
    /(?=.{8,16})(?=.*[a-z]+)(?=.*[A-Z]+)(?=.*[0-9]+)(?=.*[!?&$-]+)/
  )
  //Password must be 8-16 chars long, one uppercase, one lowercase, one number, one special char
  return format.test(password)
}
