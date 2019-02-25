/** @flow */

import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import { compose } from 'redux'

import NotificationPortal from './NotificationPortal'
import GuestRoutes from './GuestRoutes'
import SecureRoutes from './SecureRoutes'

import fetchUserFromLocalStorageAction from '../actions/userActions/fetchUserFromLocalStorage'

import type { Task } from '../types'

import './App.css'

type State = {
  tasks: Array<Task>,
}

class App extends Component<any, State> {
  componentDidMount() {
    const { fetchUserFromLocalStorage } = this.props
    fetchUserFromLocalStorage()
  }

  componentDidUpdate(prevProps) {
    const { user, history } = this.props
    if (!prevProps.user && user) {
      history.push('/')
    }
  }

  render() {
    const { user, notifications } = this.props
    return (
      <div className="wrapper">
        <div className="container">
          <div className="row">
            <div className="column">
              <div className="card">
                {user ? <SecureRoutes /> : <GuestRoutes />}
                <NotificationPortal notifications={notifications} />
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  user: state.user,
  notifications: state.notifications,
})

const mapDispatchToProps = {
  fetchUserFromLocalStorage: fetchUserFromLocalStorageAction,
}

export default compose(
  withRouter,
  connect(mapStateToProps, mapDispatchToProps),
)(App)
