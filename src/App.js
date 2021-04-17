// test feature
import React from 'react'
import { Provider } from 'react-redux'
import store from './store'
import Cart from './components/Cart'
import Filter from './components/Filter'
import Products from './components/Products'

class App extends React.Component {
  constructor() {
    super()

    this.state = {
      cartItems: localStorage.getItem('cartItems')
        ? JSON.parse(localStorage.getItem('cartItems'))
        : [],
    }
  }

  createOrder = (order) => {
    console.table('Order created', order)
  }

  removeFromCart = (product) => {
    const cartItems = this.state.cartItems.slice()
    this.setState({ cartItems: cartItems.filter((x) => x._id !== product._id) })
    localStorage.setItem(
      'cartItems',
      JSON.stringify(cartItems.filter((x) => x._id !== product._id))
    )
  }

  addToCart = (product) => {
    const cartItems = this.state.cartItems.slice()
    let inCart = false
    cartItems.forEach((item) => {
      if (item._id === product._id) {
        item.count++
        inCart = true
      }
    })
    if (!inCart) {
      cartItems.push({ ...product, count: 1 })
    }
    this.setState({ cartItems })
    localStorage.setItem('cartItems', JSON.stringify(cartItems))
  }

  render() {
    return (
      <Provider store={store}>
        <div className='grid-container'>
          <header>
            <a href='/'>Ajax27 Shopping</a>
          </header>
          <main>
            <div className='content'>
              <div className='main'>
                <Filter />
                <Products addToCart={this.addToCart} />
              </div>
              <div className='sidebar'>
                <Cart
                  cartItems={this.state.cartItems}
                  removeFromCart={this.removeFromCart}
                  createOrder={this.createOrder}
                />
              </div>
            </div>
          </main>
          <footer>
            <p>&copy; Copyright 2016 - 2021. Ajax27.com All rights reserved</p>
          </footer>
        </div>
      </Provider>
    )
  }
}

export default App
