/** @flow */

import http from '../../utilities/http'


import type {
  Dispatch,
  User,
  ThunkAction,
  Task,
} from '../../types'

const addTask = (caption:string, user:User):ThunkAction => async (dispatch: Dispatch) => {
  const { userId, token } = user
  const newTask:Task = await http.post('http://localhost:3008/tasks/', { caption, userId }, token)
  dispatch({
    type: 'ADD_TASK',
    payload: newTask,
  })
}

export default addTask
