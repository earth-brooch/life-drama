import axios from 'axios'

/**
 * ACTION TYPES
 */
const GOT_CART = 'GOT_CART'
const ADD_TO_CART = 'ADD_TO_CART'
const UPDATED_CART = 'UPDATED_CART'
/**
 * INITIAL STATE
 */
const defaultCart = []

/**
 * ACTION CREATORS
 */
const gotCart = products => ({type: GOT_CART, products})
const addProduct = product => ({type: ADD_TO_CART, product})
const updatedCart = productIdx => ({type: UPDATED_CART, productIdx})

/**
 * THUNK CREATORS
 */
export const getCart = userId => async dispatch => {
  try {
    if (userId) {
      const {data} = await axios.get(`/api/orders/${userId}`)
      const userCart = data
      dispatch(gotCart(userCart))
    }
  } catch (err) {
    console.error(err)
  }
}

export const postProduct = (userId, product) => async dispatch => {
  product.quantity = 1
  try {
    if (userId) {
      const {data} = await axios.post(`/api/orders/${userId}`, {
        userId: product.userId,
        purchasePrice: Number(product.price),
        productId: product.id
      })
      product = data
    }
    dispatch(addProduct(product || []))
  } catch (err) {
    console.error(err)
  }
}

export const updateCart = (index, userId, productId) => async dispatch => {
  try {
    if (userId) {
      const {data} = await axios.put(`/api/orders/${userId}`, productId)
    }
    dispatch(updatedCart(index))
  } catch (err) {
    console.error(err)
  }
}

/**
 * REDUCER
 */
export default function(state = defaultCart, action) {
  switch (action.type) {
    case GOT_CART:
      return action.products
    case ADD_TO_CART:
      return [...state, action.product]
    case UPDATED_CART: {
      const newState = state.slice()
      newState[action.productIdx].quantity =
        newState[action.productIdx].quantity + 1
      return newState
    }
    default:
      return state
  }
}
