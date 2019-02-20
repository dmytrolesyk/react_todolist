/** @flow */

import { ADD_TASK } from '../tasksActionTypes'
import http from '../../utilities/http'

import type { DispatchType, User } from '../../types'

const addTask = (caption:string, user:User) => async (dispatch: DispatchType) => {
  const { userId, token } = user
  const newTask = await http.post('http://localhost:3008/tasks/', { caption, userId }, token)
  dispatch({
    type: ADD_TASK,
    payload: newTask,
  })
}

export default addTask
