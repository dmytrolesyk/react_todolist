/** @flow */

import http from '../../utilities/http'

import type { Dispatch, ThunkAction, Task } from '../../types'


const deleteTask = (taskId:string, token:string):ThunkAction => async (dispatch: Dispatch) => {
  const deletedTask:Task = await http.delete(`http://localhost:3008/tasks/${taskId}`, token)
  dispatch({
    type: 'DELETE_TASK',
    payload: deletedTask._id,
  })
}

export default deleteTask
