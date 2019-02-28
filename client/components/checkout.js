import React from 'react'
import {connect} from 'react-redux'
import {getCart} from '../store/cart'

class Checkout extends React.Component {
  componentDidMount() {
    this.props.getCart(this.props.userId)
  }

  render() {
    const {cart, userId} = this.props
    console.log('props', this.props)
    console.log('product', this.props.product)
    return (
      <div>
        {cart.length ? (
          <div>
            <h2>Buy now... and get your wallet some drama!</h2>
            <div className="container">
              {cart.map(product => (
                <div className="product-thumb" key={product.id}>
                  <img src={product.imageUrl} />
                  <h3>The "{product.name}"</h3>
                  <h3>Price: ${product.price}</h3>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div> Wait just a moment please... </div>
        )}
      </div>
    )
  }
}

//Container

const mapStateToProps = state => ({
  cart: state.cart,
  userId: state.user.id,
  product: state.product
})

const mapDispatchToProps = dispatch => ({
  getCart: userId => {
    dispatch(getCart(userId))
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(Checkout)
