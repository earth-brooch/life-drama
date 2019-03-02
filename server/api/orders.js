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
    const productId = parseInt(req.body.productId, 10)

    const orderToUpdate = await Order.findOne({
      where: {
        userId: req.params.user,
        productId: productId
      }
    })

    const updatedOrder = await orderToUpdate.update({
      quantity: orderToUpdate.quantity + 1
    })

    res.json(updatedOrder)
  } catch (err) {
    next(err)
  }
})

router.delete('/:user/:productId', async (req, res, next) => {
  try {
    const productId = parseInt(req.params.productId, 10)
    console.log('req.body: ', req.body)
    const response = await Order.destroy({
      where: {
        userId: req.params.user,
        productId: productId
      }
    })
    console.log('response from delete:', response)
    res.sendStatus(200)
  } catch (err) {
    next(err)
  }
})
