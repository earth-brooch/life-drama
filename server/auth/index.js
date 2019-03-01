const router = require('express').Router()
const User = require('../db/models/user')
module.exports = router

async function isAuthenticated(req, res, next) {
  try {
    const user = await User.findOne({where: {email: req.body.email}})
    if (!user) {
      console.log('No such user found:', req.body.email)
      res.status(401).send('Incorrect username')
    } else if (!user.correctPassword(req.body.password)) {
      console.log('Incorrect password for user:', req.body.email)
      res.status(401).send('Incorrect password')
    } else {
      return next(user)
    }
  } catch (err) {
    next(err)
  }
}

router.post('/login', isAuthenticated, (user, req, res, next) => {
  try {
    req.login(user, err => (err ? next(err) : res.json(user)))
    res.status(200)
  } catch (err) {
    next(err)
  }
})

router.post('/signup', async (req, res, next) => {
  try {
    const user = await User.create(req.body)
    req.login(user, err => (err ? next(err) : res.json(user)))
  } catch (err) {
    if (err.name === 'SequelizeUniqueConstraintError') {
      res.status(401).send('User already exists')
    } else {
      next(err)
    }
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
