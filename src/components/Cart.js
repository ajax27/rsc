import React, { Component } from 'react'

class Cart extends Component {
  render() {
    const { cartItems } = this.props
    return (
      <div>
        {cartItems.length === 0 ? (
          <div className='cart cart-header'>Cart is empty</div>
        ) : (
          <div className='cart cart-header'>
            Cart has {cartItems.length} items
          </div>
        )}
        <div>
          <div className='cart'>
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
                        className='button'
                        style={{ marginLeft: '1.4rem' }}
                        onClick={() => this.props.removeFromCart(item)}
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
          {cartItems.length !== 0 && (
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
                >
                  Checkout
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    )
  }
}

export default Cart
