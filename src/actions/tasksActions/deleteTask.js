/** @flow */

import { DELETE_TASK } from '../tasksActionTypes'
import http from '../../utilities/http'

import type { DispatchType } from '../../types'

const deleteTask = (taskId:string, token:string) => async (dispatch: DispatchType) => {
  const deletedTask = await http.delete(`http://localhost:3008/tasks/${taskId}`, token)
  dispatch({
    type: DELETE_TASK,
    payload: deletedTask._id,
  })
}

export default deleteTask
