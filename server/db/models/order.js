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
  },
  orderNum: {
    type: Sequelize.INTEGER
  },
  orderPlaced: {
    type: Sequelize.DATE
  }
})

Order.newOrderNum = async userId => {
  const userOrders = await Order.findAll({
    where: {
      status: 'Bought',
      userId
    }
  })

  const largestOrdNum = userOrders.reduce((largestOrderNum, currProd) => {
    if (currProd.orderNum > largestOrderNum) return currProd.orderNum
    else {
      return largestOrderNum
    }
  }, 0)

  const nextOrdNum = largestOrdNum + 1
  return nextOrdNum
}

module.exports = Order
