/** @flow */

import http from '../../utilities/http'

import config from '../../../config'

import type {
  Dispatch,
  ThunkAction,
  Task,
} from '../../types'

const addTask = (
  caption:string,
  boardId: string,
  token: string,
):ThunkAction => async (dispatch: Dispatch) => {
  const newTask:Task = await http.post(`${config.HOST}:${config.PORT}/tasks/`, { caption, boardId }, token)
  dispatch({
    type: 'ADD_TASK',
    payload: newTask,
  })
}

export default addTask
