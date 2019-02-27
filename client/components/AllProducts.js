import React from 'react'
import {connect} from 'react-redux'
import {getProducts} from '../store/product'

class AllProducts extends React.Component {
  async componentDidMount() {
    await this.props.fetchProducts()
  }

  render() {
    return (
      <div>
        {this.props.products.length ? (
          <div>
            {this.props.products.map(product => {
              return (
                <div className="product-thumb" key={product.id}>
                  <img src={product.imageUrl} />
                  <h3>Name: {product.name}</h3>
                  <h3>Description: {product.description}</h3>
                  <h3>Price: ${product.price}</h3>
                </div>
              )
            })}
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
  products: state.product
})

const mapDispatchToProps = dispatch => ({
  fetchProducts: () => {
    dispatch(getProducts())
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(AllProducts)
