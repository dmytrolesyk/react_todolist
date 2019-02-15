/** @flow */

import React from 'react'
import './Notification.css'
import classnames from 'classnames'

type Props = {
  status: string,
  msg: string
}

const Notification = (props: Props) => {
  const { status, msg } = props
  return (
    <div className={classnames('notification', {
      'notification-success': status === 'success',
      'notification-failure': status === 'failure',
    })}
    >
      {msg}
    </div>
  )
}

export default Notification
