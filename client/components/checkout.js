import React from 'react'
import {connect} from 'react-redux'
import {getCart, placeOrder} from '../store/cart'
import {Link} from 'react-router-dom'

class Checkout extends React.Component {
  constructor() {
    super()
    this.state = {
      cartExists: false
    }
  }

  async componentDidUpdate() {
    if (this.state.cartExists === false && this.props.userId) {
      await this.props.getCart(this.props.userId)
      this.setState({cartExists: true})
    }
  }

  calculatePrice = cart => {
    return cart.reduce((accCost, curProd) => {
      const price = curProd.userId ? curProd.purchasePrice : curProd.price
      accCost = accCost + price * curProd.quantity
      return accCost
    }, 0)
  }

  onClickHandler = (event, userId) => {
    event.preventDefault()
    this.props.placeOrder(userId)
  }

  render() {
    const cart = this.props.cart
    return (
      <div>
        <h1>Order Summmary</h1>
        <div className="Order-Summary">
          <div>
            <h2>Order Details</h2>
            {cart.map(product => {
              let {name, productName, price, purchasePrice, quantity} = product
              price = product.userId ? purchasePrice : price
              name = product.userId ? productName : name
              return (
                <div className="checkout-product" key={name}>
                  <div className="Product-name"> {name}</div>
                  <div className="Quantity"> Quantity: {quantity} </div>
                  <div className="Price"> Price: ${quantity * price}</div>
                  <br />
                </div>
              )
            })}
            <div className="Total">
              Total Price: ${this.calculatePrice(cart)} <br />
              <button
                type="submit"
                onClick={() => {
                  this.onClickHandler(event, this.props.userId)
                }}
              >
                <Link to="/confirmation">Submit</Link>
              </button>
            </div>
          </div>
          <div className="Billing-Shipping-Forms">
            <div className="Billing-Shipping-Forms">
              {' '}
              <h2>Shipping Details</h2>
              <label htmlFor="name">Name</label>
              <input name="name" />
              <label htmlFor="email">Email </label>
              <input name="email" />
              <label htmlFor="address">Address</label>
              <input name="address" />
              <label htmlFor="city">City</label>
              <input name="city" />
              <label htmlFor="state">State</label>
              <input name="state" />
              <label htmlFor="zipcode">Zip Code</label>
              <input name="zipcode" />
            </div>
            <div className="Billing-Shipping-Forms">
              {' '}
              <h2>Payment</h2>
            </div>
            <label htmlFor="name-on-card">Name On Card</label>
            <input name="name-on-card" />
            <label htmlFor="card-number">Credit card number</label>
            <input name="card-number" />
            <label htmlFor="exp-month">Exp Month</label>
            <input name="exp-month" />
            <label htmlFor="exp-year">Exp Year</label>
            <input name="exp-year" />
            <label htmlFor="cvv">CVV</label>
            <input name="cvv" /> <br />
          </div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  cart: state.cart,
  userId: state.user.id,
  product: state.product
})

const mapDispatchToProps = dispatch => ({
  getCart: userId => {
    dispatch(getCart(userId))
  },
  placeOrder: userId => {
    dispatch(placeOrder(userId))
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(Checkout)
