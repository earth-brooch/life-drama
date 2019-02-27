import React from 'react'
import {connect} from 'react-redux'
import {getProducts} from '../store/product'
import ProductList from './ProductList'

class AllProducts extends React.Component {
  async componentDidMount() {
    await this.props.fetchProducts()
  }

  render() {
    return (
      <div>
        {this.props.products.length ? (
          <div>
            <h2>Add Some Drama To Your Life With All These Fine Products!</h2>
            <ProductList products={this.props.products} />
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
