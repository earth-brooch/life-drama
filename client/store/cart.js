import axios from 'axios'

/**
 * ACTION TYPES
 */
const GOT_CART = 'GOT_CART'
const ADD_TO_CART = 'ADD_TO_CART'
/**
 * INITIAL STATE
 */
const defaultCart = []

/**
 * ACTION CREATORS
 */
const gotCart = products => ({type: GOT_CART, products})
const addProduct = product => ({type: ADD_TO_CART, product})
/**
 * THUNK CREATORS
 */
export const getCart = userId => async dispatch => {
  try {
    if (userId) {
      const {data} = await axios.get(`/api/orders/${userId}`)
    }
    dispatch(gotCart(data || []))
  } catch (err) {
    console.error(err)
  }
}

export const postProduct = (userId, product) => async dispatch => {
  try {
    let productInfo = product
    if (userId) {
      const {data} = await axios.post(`/api/orders/${userId}`, product)
      productInfo = data
    }
    dispatch(addProduct(productInfo || []))
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
      console.log('action.product: ', action.product)
      return [...state, action.product]
    default:
      return state
  }
}
