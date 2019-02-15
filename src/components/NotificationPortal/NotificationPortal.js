/** @flow */

import React, { Component } from 'react'
import ReactDOM from 'react-dom'

import Notification from './components/Notification'

import type { NotificationType } from '../../types'

type Props = {
  notifications: Array<NotificationType>
}

const portal = document.getElementById('portal')

class NotificationPortal extends Component<Props, *> {
  render() {
    const { notifications } = this.props
    return ReactDOM.createPortal(
      <>
        {
          [...notifications].reverse().map(n => (
            <Notification
              key={n.id}
              status={n.status}
              msg={n.msg}
            />
          ))
        }
      </>,
      portal,
    )
  }
}

export default NotificationPortal
