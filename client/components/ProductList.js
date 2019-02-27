import React from 'react'

const ProductList = ({products}) => {
  return (
    <div className="container">
      {products.map(product => {
        return (
          <div className="product-thumb" key={product.id}>
            <img src={product.imageUrl} />
            <h3>The "{product.name}"</h3>
            <h3>Description: {product.description}</h3>
            <h3>Price: ${product.price}</h3>
          </div>
        )
      })}
    </div>
  )
}

export default ProductList
