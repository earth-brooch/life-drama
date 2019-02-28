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
    console.log('req.body', req.body)
    const productToUpdate = await User.findOne({
      where: {
        id: req.params.user
      },
      include: [
        {
          model: Product,
          where: {
            id: parseInt(req.body.productId, 10)
          }
        }
      ]
    })
    console.log('productToUpdate.quantity ', productToUpdate.quantity)
    const updatedProduct = await productToUpdate.update({
      quantity: productToUpdate.quantity + 1
    })
    // console.log('updatedProduct.products',updatedProduct.products)
    res.json(updatedProduct)
  } catch (err) {
    next(err)
  }
})
