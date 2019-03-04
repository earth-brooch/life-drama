const router = require('express').Router()
const User = require('../db/models/user')
const Order = require('../db/models/order')
const Product = require('../db/models/product')
module.exports = router

router.post('/:user', async (req, res, next) => {
  try {
    const {userId, productId, purchasePrice, imageUrl, productName} = req.body
    console.log('req.body', req.body)
    const newItem = await Order.create({
      status: 'Cart',
      userId,
      productId,
      purchasePrice,
      imageUrl,
      productName
    })
    res.json(newItem)
  } catch (err) {
    next(err)
  }
})

router.get('/:user', async (req, res, next) => {
  try {
    console.log('req.body', req.body)
    const user = await Order.findAll({
      where: {
        userId: req.params.user,
        status: 'Cart'
      }
    })
    res.json(user)
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
        productId: productId,
        status: 'Cart'
      }
    })

    let updatedOrder
    if (req.body.decrease === true) {
      updatedOrder = await orderToUpdate.update({
        quantity: orderToUpdate.quantity - 1
      })
    } else {
      updatedOrder = await orderToUpdate.update({
        quantity: orderToUpdate.quantity + 1
      })
    }
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

router.put('/placeOrder/:userId', async (req, res, next) => {
  console.log('id', req.params.userId)
  try {
    const ordersToUpdate = await Order.update(
      {status: 'Bought'},
      {
        where: {userId: req.params.userId}
      }
    )
    res.json(ordersToUpdate)
  } catch (err) {
    next(err)
  }
})
