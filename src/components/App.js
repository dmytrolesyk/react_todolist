/** @flow */

import React, { Component } from 'react'

import { connect } from 'react-redux'

import LoginForm from './LoginForm'
import Toolbar from './Toolbar'
import AddTaskSection from './AddTaskSection/AddTaskSection'
import ManageTaskSection from './ManageTaskSection'
import NotificationPortal from './NotificationPortal'

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

  render() {
    const { notifications, user } = this.props
    return (
      <div className="wrapper">
        <div className="container">
          <div className="row">
            <div className="column">
              <div className="card">
                {!user
                  ? (
                    <LoginForm />
                  ) : null}
                {user ? (
                  <>
                    <Toolbar />
                    <AddTaskSection />
                    <ManageTaskSection />
                  </>
                ) : null}
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

export default connect(mapStateToProps, {
  fetchUserFromLocalStorage: fetchUserFromLocalStorageAction,
})(App)
