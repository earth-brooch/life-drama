import axios from 'axios'

/**
 * ACTION TYPES
 */
const GOT_CART = 'GOT_CART'
const ADD_TO_CART = 'ADD_TO_CART'
const UPDATED_CART = 'UPDATED_CART'
const DELETE_FROM_CART = 'DELETE_FROM_CART'
const PLACED_ORDER = 'PLACED_ORDER'

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
const deleteProduct = productIdx => ({type: DELETE_FROM_CART, productIdx})
const placedOrder = () => ({type: PLACED_ORDER})

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

export const removeItem = (index, userId, productId) => async dispatch => {
  console.log('inside removeItem thunk!')

  try {
    if (userId) {
      console.log('productId inside removeThunk', productId)
      await axios.delete(`/api/orders/${userId}/${productId}`)
    }
    dispatch(deleteProduct(index))
  } catch (err) {
    console.error(err)
  }
}

export const updateCart = (index, userId, productId) => async dispatch => {
  try {
    if (userId) {
      await axios.put(`/api/orders/${userId}`, {productId})
    }
    dispatch(updatedCart(index))
  } catch (err) {
    console.error(err)
  }
}

export const placeOrder = userId => async dispatch => {
  try {
    if (userId) {
      await axios.put(`/api/orders/placeOrder/${userId}`, {userId})
    }
    dispatch(placedOrder())
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
    case DELETE_FROM_CART:
      return [
        ...state.slice(0, action.productIdx),
        ...state.slice(action.productIdx + 1)
      ]
    case UPDATED_CART: {
      const newState = state.slice()
      newState[action.productIdx].quantity =
        newState[action.productIdx].quantity + 1
      return newState
    }
    case PLACED_ORDER: {
      console.log('in reducer')
      return []
    }
    default:
      return state
  }
}
