/** @flow */

import React from 'react'
import { Link } from 'react-router-dom'


import Button from '../Button'
import './Toolbar.css'

import type { Board, User, ModalAction } from '../../types'

type Props = {
  user: User,
  logout: ()=>void,
  currentBoard: Board,
  toggleModal: () => ModalAction,
}

const Toolbar = (props: Props) => {
  const {
    user,
    logout,
    currentBoard,
    toggleModal,
  } = props
  if (user) {
    const greeting = <div className="greeting">{`hello, ${user.username}`}</div>
    const board = (currentBoard.name && currentBoard.name !== user.username) ? <div className="board">{`${currentBoard.name}'s board`}</div> : null
    const goHomeLink = currentBoard.id !== user.userId ? <Link to="/board" className="btn-sm btn-blue btn-link btn-home">Go Home</Link> : null
    const settingsIcon = currentBoard.name === user.username ? (
      <span
        className="fas fa-cogs settings-icon"
        role="button"
        onClick={toggleModal}
        tabIndex={0}
        onKeyPress={toggleModal}
      />
    ) : null
    return (
      <div className="toolbar">
        {greeting}
        {board}
        {goHomeLink}
        {settingsIcon}
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
