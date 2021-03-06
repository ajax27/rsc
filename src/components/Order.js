import React, { Component } from 'react'
import { connect } from 'react-redux'
import { fetchOrders } from '../actions/orderActions'

class Order extends Component {
  componentDidMount() {
    this.props.fetchOrders()
  }
  render() {
    const { orders } = this.props
    return !orders ? (
      <div>
        <h1>Loading</h1>
      </div>
    ) : (
      <div className='orders'>
        <h2>Orders</h2>
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>DATE</th>
              <th>TOTAL</th>
              <th>NAME</th>
              <th>EMAIL</th>
              <th>ADDRESS</th>
              <th>ITEMS</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order, i) => (
              <tr key={i}>
                <td>{order._id}</td>
                <td>{order.createdAt}</td>
                <td>£{order.total.toFixed(2)}</td>
                <td>{order.name}</td>
                <td>{order.email}</td>
                <td>{order.address}</td>
                <td>
                  {order.cartItems.map((item, i) => (
                    <div key={i}>
                      {item.count} {' x '} {item.title}
                    </div>
                  ))}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    )
  }
}

export default connect((state) => ({ orders: state.order.orders }), {
  fetchOrders,
})(Order)
