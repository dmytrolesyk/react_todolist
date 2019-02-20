/** @flow */

import { FETCH_TASKS } from '../tasksActionTypes'
import http from '../../utilities/http'

import type { DispatchType, User } from '../../types'

const fetchTasks = (user:User) => async (dispatch: DispatchType) => {
  const tasks = await http.get(`http://localhost:3008/tasks/${user.userId}`, user.token)
  dispatch({
    type: FETCH_TASKS,
    payload: tasks,
  })
}

export default fetchTasks
