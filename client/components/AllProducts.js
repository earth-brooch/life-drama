import React from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'

class AllProducts extends React.Component {
  async componentDidMount() {}

  render() {
    return <h3>Test test test 123</h3>
  }
}

//Container

const mapStateToProps = state => ({
  products: products
})

export default connect()(AllProducts)
