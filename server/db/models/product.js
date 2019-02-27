const Sequelize = require('sequelize')
const db = require('../db')

const Product = db.define('product', {
  name: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: true
    }
  },
  imageUrl: {
    type: Sequelize.STRING,
    defaultValue:
      'https://cdn3.iconfinder.com/data/icons/door-installation-repair-service/64/door-wood-interior-entrance-128.png'
  },
  description: {
    type: Sequelize.TEXT,
    defaultValue:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Integer feugiat scelerisque varius morbi. Accumsan tortor posuere ac ut consequat semper viverra nam libero. Vitae purus faucibus ornare suspendisse sed.'
  },
  price: {
    type: Sequelize.DECIMAL(10, 2),
    defaultValue: 9.99,
    validate: {
      min: 0
    }
  },
  quantity: {
    type: Sequelize.INTEGER,
    defaultValue: 10,
    validate: {
      min: 0
    }
  }
})

module.exports = Product
