const router = require('express').Router()
const User = require('../db/models/user')
const Order = require('../db/models/order')
const Product = require('../db/models/product')
module.exports = router

router.post('/:user', async (req, res, next) => {
  try {
    const {userId, productId, purchasePrice, quantity} = req.body
    const item = await Order.create({
      status: 'Cart',
      userId,
      productId,
      purchasePrice,
      quantity
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

router.put('/:user', async (req, res, next) => {
  try {
    const productToUpdate = await User.findOne({
      where: {
        id: req.params.user
      },
      include: [
        {
          model: Product,
          where: {
            id: 3
          }
        }
      ]
    })

    res.json(productToUpdate)
  } catch (err) {
    next(err)
  }
})
