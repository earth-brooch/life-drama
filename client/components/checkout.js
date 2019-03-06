import React from 'react'
import {connect} from 'react-redux'
import {getCart, placeOrder} from '../store/cart'
import OrderForm from './OrderForm'

class Checkout extends React.Component {
  constructor() {
    super()
    this.state = {
      cartExists: false,
      name: '',
      email: '',
      address: '',
      city: '',
      state: '',
      zipcode: '',
      nameOnCard: '',
      cardNumber: '',
      expMonth: '',
      expYear: '',
      cvv: ''
    }

    this.onChangeHandler = this.onChangeHandler.bind(this)
    this.onSubmitHandler = this.onSubmitHandler.bind(this)
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

  onSubmitHandler = (event, userId) => {
    event.preventDefault()
    this.props.placeOrder(userId)
    this.props.history.push('/confirmation')
  }

  onChangeHandler = event => {
    this.setState({[event.target.name]: event.target.value})
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
            </div>
          </div>
          <div className="Billing-Shipping-Forms">
            <OrderForm
              userId={this.props.userId}
              state={this.state}
              onChangeHandler={this.onChangeHandler}
              onSubmitHandler={this.onSubmitHandler}
            />
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
