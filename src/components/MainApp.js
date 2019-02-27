/** @flow */


import React, { Component } from 'react'
import { connect } from 'react-redux'
import Toolbar from './Toolbar'
import AddTaskSection from './AddTaskSection/AddTaskSection'
import ManageTaskSection from './ManageTaskSection'
import logoutAction from '../actions/userActions/logoutAction'
import getBoardDataAction from '../actions/boardActions/getBoardData'
import NotFound from './NotFound'
import Spinner from './Spinner'

import type { User, Board } from '../types'

type Props = {
  user:User,
  logout: ()=>void,
  match: any,
  getBoardData: (boardId: string, token: string)=>void,
  currentBoard: Board,
}

class MainApp extends Component<Props, *> {
  componentDidMount() {
    this.updateBoardData()
  }

  componentDidUpdate() {
    this.updateBoardData()
  }

  updateBoardData = () => {
    const {
      currentBoard,
      getBoardData,
      user,
      match: { params: { boardId } },
    } = this.props
    if (!currentBoard) {
      getBoardData(boardId || user.userId, user.token)
    }
  }

  render() {
    const {
      user,
      logout,
      currentBoard,
    } = this.props
    if (currentBoard) {
      return (
        <>
          <Toolbar user={user} currentBoard={currentBoard} logout={logout} />
          {!currentBoard.error ? (
            <>
              <AddTaskSection user={user} currentBoard={currentBoard} />
              <ManageTaskSection user={user} currentBoard={currentBoard} />
            </>
          ) : <NotFound /> }
        </>
      )
    }
    return (
      <Spinner />
    )
  }
}

const mapStateToProps = (state, ownProps) => ({
  user: state.user,
  currentBoard: state.boards.find(
    board => board.id === (ownProps.match.params.boardId || state.user.userId),
  ),
})

const mapDispatchToProps = {
  getBoardData: getBoardDataAction,
  logout: logoutAction,
}

export default connect(mapStateToProps, mapDispatchToProps)(MainApp)
