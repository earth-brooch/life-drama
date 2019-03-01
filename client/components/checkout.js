import React from 'react'
import {connect} from 'react-redux'
import {getCart} from '../store/cart'

class Checkout extends React.Component {
  async componentDidMount() {
    await this.props.getCart(this.props.userId)
  }

  render() {
    const {cart, userId} = this.props
    console.log('userId in render', this.props.userId)
    console.log('cart in render', this.props.cart)
    return (
      <div>
        {cart.length ? (
          <div>
            <h2>Buy now... and get your wallet some drama!</h2>
            <div className="container">
              {cart.map(product => (
                <div className="product-thumb" key={product.id}>
                  <span>
                    <img src={product.imageUrl} />{' '}
                    <button type="button">
                      <img className="icon" src="/button-delete.png" />
                    </button>
                  </span>
                  <h3>The "{product.name}"</h3>
                  <h3>Price: ${product.price}</h3>
                  <form>
                    <button>-</button>
                    <input value={product.quantity} />
                    <button>+</button>
                  </form>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div> Wait just a moment please... </div>
        )}
        <h3>Total: </h3>
        <div>000</div>
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
    console.log('getting cart...')
    dispatch(getCart(userId))
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(Checkout)
