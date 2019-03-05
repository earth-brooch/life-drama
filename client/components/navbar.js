import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {logout} from '../store'

export const Navbar = ({handleClick, isLoggedIn, cart}) => (
  <div>
    <h1>LIFE DRAMA</h1>
    <nav>
      {isLoggedIn ? (
        <div>
          {/* The navbar will show these links after you log in */}
          <Link to="/home">Home</Link>
          <Link to="/">Shop</Link>
          <Link to="/order-history">Order History</Link>
          <a href="#" onClick={handleClick}>
            Logout
          </a>
          <Link to="/cart">
            <div className="item fa-angle-right">
              <span className="item-badge">
                {cart.reduce((total, item) => {
                  return total + item.quantity
                }, 0)}
              </span>
              <img src="/shopping-cart-icon.jpg" className="icon" />
            </div>
          </Link>
        </div>
      ) : (
        <div>
          {/* The navbar will show these links before you log in */}
          <Link to="/">Shop</Link>
          <Link to="/login">Login</Link>
          <Link to="/signup">Sign Up</Link>

          <Link to="/cart">
            <div className="item">
              <span className="item-badge fa-angle-right">
                {cart.reduce((total, item) => {
                  return total + item.quantity
                }, 0)}
              </span>
              <img src="/shopping-cart-icon.jpg" className="icon" />
            </div>
          </Link>
        </div>
      )}
    </nav>
    <hr />
  </div>
)

/**
 * CONTAINER
 */
const mapState = state => {
  console.log('mapping state and state.cart is', state.cart)
  return {
    isLoggedIn: !!state.user.id,
    cart: state.cart
  }
}

const mapDispatch = dispatch => {
  return {
    handleClick() {
      dispatch(logout())
    }
  }
}

export default connect(mapState, mapDispatch)(Navbar)

/**
 * PROP TYPES
 */
Navbar.propTypes = {
  handleClick: PropTypes.func.isRequired,
  isLoggedIn: PropTypes.bool.isRequired
}
