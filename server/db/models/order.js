const Sequelize = require('sequelize')
const db = require('../db')

const Order = db.define('order', {
  status: {
    type: Sequelize.ENUM('Bought', 'Cart')
  },
  quantity: {
    type: Sequelize.INTEGER,
    defaultValue: 1
  },
  purchasePrice: {
    type: Sequelize.DECIMAL(10, 2)
  },
  productName: {
    type: Sequelize.STRING
  },
  imageUrl: {
    type: Sequelize.STRING
  },
  productId: {
    type: Sequelize.INTEGER
  },
  userId: {
    type: Sequelize.INTEGER
  }
})

module.exports = Order
