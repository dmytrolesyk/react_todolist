/** @flow */

import http from '../../utilities/http'

import config from '../../../config'

import type { Dispatch, ThunkAction, Task } from '../../types'


const deleteTask = (taskId:string, token:string):ThunkAction => async (dispatch: Dispatch) => {
  const deletedTask:Task = await http.delete(`${config.HOST}:${config.PORT}/tasks/${taskId}`, token)
  dispatch({
    type: 'DELETE_TASK',
    payload: deletedTask,
  })
}

export default deleteTask
