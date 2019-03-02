import React from 'react'
import {connect} from 'react-redux'
import {getCart, removeItem} from '../store/cart'

class Cart extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      cartExists: false,
      cartNeedsUpdate: false
    }
    this.handleSubmit = this.handleSubmit.bind()
  }
  async componentDidMount() {
    await this.props.getCart(this.props.userId)
  }

  async componentDidUpdate() {
    console.log('ComponentDidUpdate is running in the Cart component...')
    if (this.state.cartExists === false && this.props.userId) {
      await this.props.getCart(this.props.userId)
      this.setState({
        cartExists: true
      })
    } else if (this.state.cartNeedsUpdate === true) {
      await this.props.getCart(this.props.userId)
      this.setState({cartNeedsUpdate: false})
    }
  }

  handleSubmit = (event, productId, userId, cart) => {
    event.preventDefault()
    console.log('handleSubmit product id: ', productId)
    let index
    const itemInCart = cart.filter((elem, idx) => {
      if (elem.id === productId) {
        index = idx
        return true
      }
    })
    this.setState({cartNeedsUpdate: true})
    this.props.removeItem(index, userId, productId)
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
              {cart.map(product => {
                return (
                  <div className="product-thumb" key={product.id}>
                    <img src={product.imageUrl} />
                    <button
                      name="delete-button"
                      type="submit"
                      onClick={() => {
                        this.handleSubmit(
                          event,
                          product.id,
                          this.props.userId,
                          this.props.cart
                        )
                      }}
                    >
                      <img className="delete-button" src="/button-delete.png" />
                    </button>
                    <h3>The "{product.name}"</h3>
                    <h3>Price: ${product.price}</h3>
                    <form>
                      <button>-</button>
                      <input value={product.quantity} />
                      <button>+</button>
                    </form>
                  </div>
                )
              })}
            </div>
          </div>
        ) : (
          <div> Wait just a moment please... </div>
        )}
        <div className="container" id="total">
          <h3>Total: $100.00</h3>
        </div>
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
  },
  removeItem: (index, userId, productId) => {
    dispatch(removeItem(index, userId, productId))
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(Cart)
