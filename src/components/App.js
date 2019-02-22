/** @flow */

import React, { Component } from 'react'
import { BrowserRouter } from 'react-router-dom'
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
    if (!prevProps.user && this.props.user) {
      this.props.history.push('/')
    }
  }

  // render() {
  //   const { notifications, user } = this.props
  //   console.log(this.props)
  //   return (
  //     <div className="wrapper">
  //       <div className="container">
  //         <div className="row">
  //           <div className="column">
  //             <div className="card">
  //               {!user
  //                 ? (
  //                   <LoginForm />
  //                 ) : <MainApp />}

  //               <NotificationPortal notifications={notifications} />
  //             </div>
  //           </div>
  //         </div>
  //       </div>
  //     </div>
  //   )
  // }

  render() {
    const { user, notifications } = this.props
    console.log(user)
    return (
      <BrowserRouter>
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
      </BrowserRouter>
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

export default connect(mapStateToProps, mapDispatchToProps)(App)
