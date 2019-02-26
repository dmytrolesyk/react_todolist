/** @flow */

import React from 'react'

import Button from '../Button'
import './Toolbar.css'

type Props = {
  user: ?{ username: string },
  logout: ()=>void,
}

const Toolbar = (props: Props) => {
  const { user, logout, currentBoard } = props
  console.log(currentBoard)
  if (user) {
    const greeting = `hello, ${user.username}`
    const board = `${user.username}'s board`
    return (
      <div className="toolbar">
        <div className="greeting">{greeting}</div>
        <div className="board">{board}</div>
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
