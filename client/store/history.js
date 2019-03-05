import axios from 'axios'

const GOT_HISTORY = 'GOT_HISTORY'

const OrderHistory = []

const gotHistory = historyData => ({type: GOT_HISTORY, historyData})

export const getHistory = userId => async dispatch => {
  try {
    const {data} = await axios.get(`/api/orders/history/${userId}`)
    dispatch(gotHistory(data))
  } catch (err) {
    console.error(err)
  }
}

export default function(state = OrderHistory, action) {
  switch (action.type) {
    case GOT_HISTORY:
      return action.historyData

    default:
      return state
  }
}
