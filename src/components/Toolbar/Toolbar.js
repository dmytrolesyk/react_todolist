/** @flow */

import React from 'react'
import { connect } from 'react-redux'
import logoutAction from '../../actions/userActions/logoutAction'

import Button from '../Button'
import './Toolbar.css'

type Props = {
  username: string,
  logout: ()=>void,
}

const Toolbar = (props: Props) => {
  const { username, logout } = props
  const greeting: string = `Hello, ${username}`
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

const mapStateToProps = state => ({
  username: state.user.username,
})

const mapDispatchToProps = {
  logout: logoutAction,
}

export default connect(mapStateToProps, mapDispatchToProps)(Toolbar)
