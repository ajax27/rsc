// test feature
import React from 'react'
import { Provider } from 'react-redux'
import store from './store'
import Cart from './components/Cart'
import Filter from './components/Filter'
import Products from './components/Products'

class App extends React.Component {
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
                <Products />
              </div>
              <div className='sidebar'>
                <Cart />
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
