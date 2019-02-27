const router = require('express').Router()
const Order = require('../db/models/order')
module.exports = router

router.post('/:user', async (req, res, next) => {
  try {
    console.log('reqbody', req.body)
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
    const userOrder = await Order.findAll({
      where: {
        userId: req.params.user
      }
    })
    res.json(userOrder)
  } catch (err) {
    next(err)
  }
})
