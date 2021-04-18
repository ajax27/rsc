// test feature
import React from 'react'
import { Provider } from 'react-redux'
import { BrowserRouter, Route, Link } from 'react-router-dom'
import store from './store'
import AdminScreen from './screens/AdminScreen'
import HomeScreen from './screens/HomeScreen'

class App extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <BrowserRouter>
          <div className='grid-container'>
            <header>
              <Link to='/'>Ajax27 Shopping</Link>
              <Link to='/admin'>Admin</Link>
            </header>
            <main>
              <Route path='/admin' component={AdminScreen} />
              <Route exact path='/' component={HomeScreen} />
            </main>
            <footer>
              <p>
                &copy; Copyright 2016 - 2021. Ajax27.com All rights reserved
              </p>
            </footer>
          </div>
        </BrowserRouter>
      </Provider>
    )
  }
}

export default App
