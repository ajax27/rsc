// test feature
import React from 'react'
import Products from './components/Products'
import data from './data.json'

class App extends React.Component {
  constructor() {
    super()

    this.state = {
      products: data.products,
      size: '',
      sort: '',
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
              <Products products={this.state.products} />
            </div>
            <div className='sidebar'>Cart Items</div>
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
