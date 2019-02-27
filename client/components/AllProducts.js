import React from 'react'
import {connect} from 'react-redux'
import {getProducts} from '../store/product'
import ProductList from './ProductList'
import {postProduct} from '../store/cart'

class AllProducts extends React.Component {
  // constructor (props) {
  //   super (props)
  //   this.props.handleSubmit=this.props.handleSubmit.bind()
  // }

  async componentDidMount() {
    await this.props.fetchProducts()
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
                    <h3>Description: {product.description}</h3>
                    <h3>Price: ${product.price}</h3>
                    <button
                      type="button"
                      name="add-to-cart"
                      onClick={() => {
                        this.props.handleSubmit(
                          event,
                          product,
                          this.props.userId
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
  userId: state.user.id
})

const mapDispatchToProps = dispatch => ({
  fetchProducts: () => {
    dispatch(getProducts())
  },

  handleSubmit: (event, product, userId) => {
    const data = {
      purchasePrice: Number(product.price),
      userId,
      productId: product.id
    }
    dispatch(postProduct(userId, data))
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(AllProducts)
