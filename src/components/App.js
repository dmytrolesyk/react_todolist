/** @flow */

import React from 'react'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import { compose } from 'redux'

import NotificationPortal from './NotificationPortal'
import GuestRoutes from './GuestRoutes'
import SecureRoutes from './SecureRoutes'

import type { User, NotificationType } from '../types'

import './App.css'

type Props = {
  user: User,
  notifications: Array<NotificationType>,
}

const App = (props: Props) => {
  const { user, notifications } = props
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

const mapStateToProps = state => ({
  user: state.user,
  notifications: state.notifications,
})

export default compose(
  withRouter,
  connect(mapStateToProps),
)(App)
