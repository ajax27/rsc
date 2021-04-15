// test feature
import React from 'react'
import Cart from './components/Cart'
import Filter from './components/Filter'
import Products from './components/Products'
import data from './data.json'

class App extends React.Component {
  constructor() {
    super()

    this.state = {
      products: data.products,
      size: '',
      sort: '',
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

  sortProducts = (e) => {
    const sort = e.target.value
    this.setState((state) => ({
      sort,
      products: this.state.products
        .slice()
        .sort((a, b) =>
          sort === 'lowest'
            ? a.price > b.price
              ? 1
              : -1
            : sort === 'highest'
            ? a.price < b.price
              ? 1
              : -1
            : a._id < b._id
        ),
    }))
  }

  filterProducts = (e) => {
    if (e.target.value === '') {
      this.setState({ size: e.target.value, products: data.products })
    } else {
      this.setState({
        size: e.target.value,
        products: data.products.filter(
          (product) => product.availableSizes.indexOf(e.target.value) >= 0
        ),
      })
    }
  }

  render() {
    return (
      <div className='grid-container'>
        <header>
          <a href='/'>Ajax27 Shopping</a>
        </header>
        <main>
          <div className='content'>
            <div className='main'>
              <Filter
                count={this.state.products.length}
                size={this.state.size}
                sort={this.state.sort}
                filterProducts={this.filterProducts}
                sortProducts={this.sortProducts}
              />
              <Products
                products={this.state.products}
                addToCart={this.addToCart}
              />
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
    )
  }
}

export default App
