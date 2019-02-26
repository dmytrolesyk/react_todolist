/** @flow */


import React, { Component } from 'react'
import { connect } from 'react-redux'
import Toolbar from './Toolbar'
import AddTaskSection from './AddTaskSection/AddTaskSection'
import ManageTaskSection from './ManageTaskSection'
import logoutAction from '../actions/userActions/logoutAction'
import setBoardAsyncAction from '../actions/boardActions/setBoardAsync'
import setBoardSyncAction from '../actions/boardActions/setBoardSync'

import type { User, Board } from '../types'

type Props = {
  user:User,
  logout: ()=>void,
  match: any,
  setBoardAsync: (boardId:string, token:string)=>void,
  setBoardSync: (boardId:string, boardName:string)=>void,
  currentBoard: Board,
}

class MainApp extends Component<Props, *> {
  componentDidMount() {
    // const {
    //   user,
    //   setBoardAsync,
    //   setBoardSync,
    //   match: { params: { boardId } },
    // } = this.props
    // if (typeof boardId === 'undefined' || boardId === user.userId) {
    //   setBoardSync(user.userId, user.username)
    // } else {
    //   setBoardAsync(boardId, user.token)
    // }
    const {
      currentBoard,
    } = this.props
    if (!currentBoard) {
      // getBoardData(id)
    }
  }

  render() {
    const {
      user,
      logout,
      currentBoard,
    } = this.props

    return (
      <div>
        <Toolbar user={user} boardName={currentBoard} logout={logout} />
        <AddTaskSection />
        <ManageTaskSection />
      </div>
    )
  }
}

const mapStateToProps = (state, ownProps) => ({
  user: state.user,
  // currentBoard: state.currentBoard,
  currentBoard: state.boards.find(
    board => board.id === (ownProps.match.params.boardId || state.user.userId),
  ),
})

const mapDispatchToProps = {
  logout: logoutAction,
  setBoardAsync: setBoardAsyncAction,
  setBoardSync: setBoardSyncAction,

}

export default connect(mapStateToProps, mapDispatchToProps)(MainApp)
