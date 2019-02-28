const router = require('express').Router()
const User = require('../db/models/user')
const Order = require('../db/models/order')
const Product = require('../db/models/product')
module.exports = router

router.post('/:user', async (req, res, next) => {
  try {
    const {userId, productId, purchasePrice} = req.body
    const item = await Order.create({
      status: 'Cart',
      userId,
      productId,
      purchasePrice
    })
    res.json(item)
  } catch (err) {
    next(err)
  }
})

router.get('/:user', async (req, res, next) => {
  try {
    const user = await User.findOne({
      where: {
        id: req.params.user
      },
      include: Product
    })
    const userCart = user.products
    res.json(userCart)
  } catch (err) {
    next(err)
  }
})