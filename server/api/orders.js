const router = require('express').Router()
const Order = require('../db/models/order')
module.exports = router

router.post('/:user', async (req, res, next) => {
  try {
    const {userId, productId, purchasePrice, imageUrl, productName} = req.body
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

router.get('/history/:userId', async (req, res, next) => {
  try {
    const orderHistory = await Order.findAll({
      where: {
        userId: req.params.userId,
        status: 'Bought'
      }
    })
    res.json(orderHistory)
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
      await orderToUpdate.update({
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
    await Order.destroy({
      where: {
        userId: req.params.user,
        productId: productId
      }
    })
    res.sendStatus(200)
  } catch (err) {
    next(err)
  }
})

router.put('/placeOrder/:userId', async (req, res, next) => {
  try {
    const ordersToUpdate = await Order.update(
      {
        status: 'Bought',
        orderNum: await Order.newOrderNum(req.params.userId),
        orderPlaced: Date.now()
      },
      {
        where: {
          userId: req.params.userId,
          status: 'Cart'
        }
      }
    )
    res.json(ordersToUpdate)
  } catch (err) {
    next(err)
  }
})
