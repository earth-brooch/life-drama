const User = require('./user')
const Product = require('./product')
const Order = require('./order')

User.belongsToMany(Product, {through: Order})
Product.belongsToMany(User, {through: Order})

module.exports = {
  User,
  Product,
  Order
}
