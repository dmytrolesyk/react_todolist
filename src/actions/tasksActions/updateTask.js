/** @flow */

import { UPDATE_TASK } from '../tasksActionTypes'
import http from '../../utilities/http'

import type { DispatchType, Task } from '../../types'

const updateTask = (taskToUpdate: Task, token:string) => async (dispatch: DispatchType) => {
  const updatedTask = await http.put('http://localhost:3008/tasks/', taskToUpdate, token)
  dispatch({
    type: UPDATE_TASK,
    payload: updatedTask,
  })
}

export default updateTask
