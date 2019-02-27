/** @flow */

import http from '../../utilities/http'

import config from '../../../config'

import type {
  Dispatch,
  ThunkAction,
  Board,
  Task,
} from '../../types'

const getBoardData = (boardId:string, token:string):ThunkAction => async (dispatch: Dispatch) => {
  const board = await http.get(`${config.HOST}:${config.PORT}/users/${boardId}`, token)
  let payload:Board
  if (board.success) {
    const tasks:Array<Task> = await http.get(`${config.HOST}:${config.PORT}/tasks/${board.data.id}`, token)
    payload = {
      id: board.data.id,
      name: board.data.name,
      tasks,
      error: '',
    }
  } else {
    payload = {
      id: boardId,
      error: 'Not found',
      tasks: [],
    }
  }
  dispatch({
    type: 'ADD_BOARD',
    payload,
  })
}

export default getBoardData
