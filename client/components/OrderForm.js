import React from 'react'
import {MONTHS, YEARS, STATES} from './constants'

const OrderForm = props => {
  const {userId, state, onChangeHandler, onSubmitHandler} = props
  return (
    <form onSubmit={event => onSubmitHandler(event, userId)}>
      <div className="Billing-Shipping-Forms">
        <h2>Shipping Details</h2>
        <label htmlFor="name">Name*</label>
        <input
          type="text"
          required
          placeholder="Name (e.g. John Doe)"
          onChange={event => onChangeHandler(event)}
          value={state.name}
          name="name"
        />
        <label htmlFor="email">Email*</label>
        <input
          required
          placeholder="Email (e.g. yourname@email.com"
          type="text"
          onChange={event => onChangeHandler(event)}
          value={state.email}
          name="email"
        />
        <label htmlFor="address">Address*</label>
        <input
          required
          type="text"
          placeholder="Address (e.g. 123 Main Street, Apt 3"
          onChange={event => onChangeHandler(event)}
          value={state.address}
          name="address"
        />
        <label htmlFor="city">City*</label>
        <input
          required
          type="text"
          placeholder="City (e.g. New York)"
          onChange={event => onChangeHandler(event)}
          value={state.city}
          name="city"
        />
        <label htmlFor="state">State*</label>
        <select
          required
          name="state"
          id="state"
          onChange={event => onChangeHandler(event)}
        >
          {STATES.map(state => {
            return (
              <option key={state} value={state}>
                {state}
              </option>
            )
          })}
        </select>
        <label htmlFor="zipcode">Zip Code*</label>
        <input
          required
          type="number"
          placeholder="zipcode"
          onChange={event => onChangeHandler(event)}
          value={state.zipcode}
          name="zipcode"
        />
      </div>
      <div className="Billing-Shipping-Forms">
        {' '}
        <h2>Payment</h2>
      </div>
      <label htmlFor="nameOnCard">Name On Card*</label>
      <input
        required
        type="text"
        onChange={event => onChangeHandler(event)}
        value={state.nameOnCard}
        name="nameOnCard"
      />
      <label htmlFor="cardNumber">Credit card number*</label>
      <input
        required
        type="number"
        onChange={event => onChangeHandler(event)}
        value={state.cardNumber}
        name="cardNumber"
      />
      <label htmlFor="expMonth">Exp Month*</label>
      <select
        required
        name="expMonth"
        id="expMonth"
        onChange={event => onChangeHandler(event)}
      >
        {MONTHS.map(month => {
          return (
            <option key={month} value={month}>
              {month}
            </option>
          )
        })}
      </select>
      <label htmlFor="expYear">Exp Year*</label>
      <select
        required
        name="expYear"
        id="expYear"
        onChange={event => onChangeHandler(event)}
      >
        {YEARS.map(year => {
          return (
            <option key={year} value={year}>
              {year}
            </option>
          )
        })}
      </select>
      <label htmlFor="cvv">CVV*</label>
      <input
        required
        type="text"
        size="4"
        maxLength="4"
        onChange={event => onChangeHandler(event)}
        value={state.cvv}
        name="cvv"
      />{' '}
      <br />
      <button type="submit"> Submit</button>
    </form>
  )
}

export default OrderForm
