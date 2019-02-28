/** @flow */

import http from '../../utilities/http'

import config from '../../../config'

import type {
  Dispatch,
  ThunkAction,
  Board,
  Task,
} from '../../types'

const getPublicBoards = (token:string):ThunkAction => async (dispatch: Dispatch) => {
  const publicBoards = await http.get(`${config.HOST}:${config.PORT}/public-users`, token)
  console.log(publicBoards)
  const pendingBoards:Array<Board> = publicBoards.data.map(async (board) => {
    const tasks:Array<Task> = await http.get(`${config.HOST}:${config.PORT}/tasks/${board.id}`, token)
    return {
      id: board.id,
      name: board.username,
      tasks,
      error: ''
    }
  })

  const boards = await Promise.all(pendingBoards)

  console.log(boards)
  dispatch({
    type: 'GET_PUBLIC_BOARDS',
    payload: boards,
  })
}

export default getPublicBoards