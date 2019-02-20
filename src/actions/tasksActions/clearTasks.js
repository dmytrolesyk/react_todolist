/** @flow */

import { CLEAR_TASKS } from '../tasksActionTypes'
import http from '../../utilities/http'

import type { DispatchType, User } from '../../types'

const clearTasks = (user:User) => async (dispatch: DispatchType) => {
  const { userId, token } = user
  http.delete(`http://localhost:3008/remove-all-tasks/${userId}`, token)
  dispatch({
    type: CLEAR_TASKS,
  })
}

export default clearTasks
