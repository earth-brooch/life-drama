import React from 'react'
import {connect} from 'react-redux'
import {getProducts} from '../store/product'
import {postProduct, updateCart, getCart} from '../store/cart'

class AllProducts extends React.Component {
  constructor() {
    super()
    this.state = {
      cartExists: false
    }
  }
  async componentDidMount() {
    await this.props.fetchProducts()
    // await this.props.getCart(this.props.userId)
  }

  async componentDidUpdate() {
    if (this.state.cartExists === false && this.props.userId) {
      await this.props.getCart(this.props.userId)
      this.setState({cartExists: true})
    }
  }

  render() {
    const products = this.props.products
    return (
      <div>
        {products.length ? (
          <div>
            <h2>Add Some Drama To Your Life With All These Fine Products!</h2>
            <div className="container">
              {products.map(product => {
                return (
                  <div className="product-thumb" key={product.id}>
                    <img src={product.imageUrl} />
                    <h3>The "{product.name}"</h3>
                    <h3>{product.description}</h3>
                    <h3>Price: ${product.price}</h3>
                    <button
                      type="button"
                      name="add-to-cart"
                      onClick={() => {
                        this.props.handleSubmit(
                          event,
                          product,
                          this.props.userId,
                          this.props.cart
                        )
                      }}
                    >
                      Add To Cart
                    </button>
                  </div>
                )
              })}
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
  products: state.product,
  userId: state.user.id,
  cart: state.cart
})

const mapDispatchToProps = dispatch => ({
  fetchProducts: () => {
    dispatch(getProducts())
  },
  getCart: userId => {
    dispatch(getCart(userId))
  },

  handleSubmit: async (event, product, userId, cart) => {
    let index
    const itemInCart = cart.filter((elem, idx) => {
      if (elem.id === product.id || elem.productId === product.id) {
        index = idx
        return true
      }
    })

    if (itemInCart.length) {
      dispatch(updateCart(index, userId, product.id))
    } else {
      const data = {
        userId,
        ...product
      }
      dispatch(postProduct(userId, data))
    }
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(AllProducts)
