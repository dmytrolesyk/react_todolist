/** @flow */

import React from 'react'
import { connect } from 'react-redux'
import logoutAction from '../../actions/userActions/logoutAction'

import Button from '../Button'
import './Toolbar.css'

type Props = {
  user: ?{ username: string },
  logout: ()=>void,
}

const Toolbar = (props: Props) => {
  const { user, logout } = props
  if (user) {
    const greeting = `Hello, ${user.username}`
    return (
      <div className="toolbar">
        <div className="greeting">{greeting}</div>
        <Button
          color="btn-violet"
          size="btn-sm"
          text="Log out"
          optClasses="btn-logout"
          onClick={logout}
        />
      </div>
    )
  }

  return null
}

export default Toolbar
