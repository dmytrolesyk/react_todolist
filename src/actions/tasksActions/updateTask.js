/** @flow */

import http from '../../utilities/http'

import config from '../../../config'

import type { Dispatch, Task, ThunkAction } from '../../types'

const updateTask = (taskToUpdate: Task, token:string):ThunkAction => async (dispatch: Dispatch) => {
  const updatedTask:Task = await http.put(`${config.HOST}:${config.PORT}/tasks/`, taskToUpdate, token)
  dispatch({
    type: 'UPDATE_TASK',
    payload: updatedTask,
  })
}

export default updateTask
