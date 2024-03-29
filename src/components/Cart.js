import React, { Component } from 'react'
import Modal from 'react-modal'
import Zoom from 'react-reveal/Zoom'
import { connect } from 'react-redux'
import Fade from 'react-reveal/Fade'
import { removeFromCart } from '../actions/cartActions'
import { createOrder, clearOrder } from '../actions/orderActions'

class Cart extends Component {
  constructor(props) {
    super(props)

    this.state = {
      email: '',
      name: '',
      address: '',
      showCheckout: false,
    }
  }

  handleInput = (e) => {
    this.setState({ [e.target.name]: e.target.value })
  }

  createOrder = (e) => {
    e.preventDefault()
    const order = {
      name: this.state.name,
      email: this.state.email,
      address: this.state.address,
      cartItems: this.props.cartItems,
      total: this.props.cartItems.reduce((a, c) => a + c.price * c.count, 0),
    }
    this.props.createOrder(order)
  }

  closeModal = () => {
    this.props.clearOrder()
  }

  render() {
    const { cartItems, order } = this.props
    return (
      <div>
        {cartItems.length === 0 ? (
          <div className='cart cart-header'>Cart is empty</div>
        ) : (
          <div className='cart cart-header'>
            Cart has {cartItems.length} items
          </div>
        )}
        {order && (
          <Modal isOpen={true} onRequestClose={this.closeModal}>
            <Zoom>
              <button className='close-modal' onClick={this.closeModal}>
                x
              </button>
              <div className='order-details'>
                <h3 className='success-message'>
                  Success, your order has been placed!
                </h3>
                <h2>Order ref: {order._id}</h2>
                <ul>
                  <li>
                    <div>Name: </div>
                    <div>{order.name}</div>
                  </li>
                  <li>
                    <div>Email: </div>
                    <div>{order.email}</div>
                  </li>
                  <li>
                    <div>Address: </div>
                    <div>{order.address}</div>
                  </li>
                  <li>
                    <div>Total: </div>
                    <div>£{order.total.toFixed(2)}</div>
                  </li>
                  <li>
                    <div>Order Date: </div>
                    <div>{order.createdAt}</div>
                  </li>
                  <li>
                    <div>Cart Items: </div>
                    <div className='items'>
                      {order.cartItems.map((p, i) => (
                        <div key={i}>
                          {p.count} {' * '} {p.title}
                        </div>
                      ))}
                    </div>
                  </li>
                </ul>
              </div>
            </Zoom>
          </Modal>
        )}
        <div>
          <div className='cart'>
            <Fade left cascade>
              <ul className='cart-items'>
                {cartItems.map((item) => (
                  <li key={item._id}>
                    <div>
                      <img src={item.image} alt={item.title} />
                    </div>
                    <div>
                      <div>{item.title}</div>
                      <div className='right'>
                        £{item.price.toFixed(2)} x {item.count}{' '}
                        <button
                          className='button remove'
                          style={{ marginLeft: '1rem' }}
                          onClick={() => this.props.removeFromCart(item)}
                        >
                          Remove
                        </button>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </Fade>
          </div>
          {cartItems.length !== 0 && (
            <div>
              <div className='cart'>
                <div className='total'>
                  <div className='total-price'>
                    Total: £
                    {cartItems
                      .reduce((a, c) => a + c.price * c.count, 0)
                      .toFixed(2)}
                  </div>
                  <button
                    style={{ marginRight: '3rem' }}
                    className='button primary'
                    onClick={() => {
                      this.setState({ showCheckout: true })
                    }}
                  >
                    Proceed
                  </button>
                </div>
              </div>
              {this.state.showCheckout && (
                <Fade right cascade>
                  <div className='cart'>
                    <form onSubmit={this.createOrder}>
                      <ul className='form-container'>
                        <li>
                          <label>Email</label>
                          <input
                            name='email'
                            type='email'
                            onChange={this.handleInput}
                            required
                          />
                        </li>
                        <li>
                          <label>Name</label>
                          <input
                            name='name'
                            type='text'
                            onChange={this.handleInput}
                            required
                          />
                        </li>
                        <li>
                          <label>Address</label>
                          <input
                            name='address'
                            type='text'
                            onChange={this.handleInput}
                            required
                          />
                        </li>
                        <li>
                          <button className='button primary' type='submit'>
                            Checkout
                          </button>
                        </li>
                      </ul>
                    </form>
                  </div>
                </Fade>
              )}
            </div>
          )}
        </div>
      </div>
    )
  }
}

export default connect(
  (state) => ({
    cartItems: state.cart.cartItems,
    order: state.order.order,
  }),
  { removeFromCart, createOrder, clearOrder }
)(Cart)
