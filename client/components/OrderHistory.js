import React from 'react'
import {connect} from 'react-redux'
import {getHistory} from '../store/history'
import moment from 'moment'

class OrderHistory extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      gotHistory: false
    }
  }
  componentDidMount() {
    this.props.getHistory(this.props.userId)
  }

  componentDidUpdate() {
    if (this.state.gotHistory === false && this.props.userId) {
      this.setState({gotHistory: true})
      this.props.getHistory(this.props.userId)
    }
  }

  sumTotal(orderNum) {
    return this.props.orderHistory.reduce((total, product) => {
      if (product.orderNum === orderNum) {
        total = total + product.quantity * product.purchasePrice
      }
      return total
    }, 0)
  }

  getOrderTime(orderNum) {
    const dateAndTime = this.props.orderHistory.filter(product => {
      if (product.orderNum === orderNum) {
        return true
      }
    })[0].orderPlaced

    moment.defaultFormat = 'YYYY-MM-DDTHH:mm:ssZ'
    const string = moment(dateAndTime)
      .format('dddd, MMMM Do YYYY, h:mm:ss a')
      .toString()

    return string
  }

  render() {
    const {orderHistory} = this.props
    const orderNums = orderHistory
      .reduce((accNums, productPurchased) => {
        if (accNums.indexOf(productPurchased.orderNum) === -1)
          accNums.push(productPurchased.orderNum)
        return accNums
      }, [])
      .sort()

    return (
      <div className="orderHistory">
        {this.state.gotHistory ? (
          orderNums.map(orderNum => {
            return (
              <div className="historical-order" key={orderNum}>
                <h2>Order Number : {orderNum}</h2>
                <div>Order Placed: {this.getOrderTime(orderNum)}</div>
                <br />
                {orderHistory.map(product => {
                  const {productName, purchasePrice, quantity} = product
                  if (product.orderNum === orderNum)
                    return (
                      <div key={product.createdAt}>
                        Product Name: {productName}
                        <br />
                        Price: {purchasePrice}
                        <br />
                        Quantity: {quantity}
                        <br />
                        Total Price: {purchasePrice * quantity}
                        <br />
                        <br />
                      </div>
                    )
                })}
                <h3>Order Total: {this.sumTotal(orderNum)}</h3>
              </div>
            )
          })
        ) : (
          <p>Loading...</p>
        )}
      </div>
    )
  }
}

const mapStateToProps = state => ({
  userId: state.user.id,
  orderHistory: state.history
})

const mapDispatchToProps = dispatch => ({
  getHistory: userId => {
    dispatch(getHistory(userId))
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(OrderHistory)
