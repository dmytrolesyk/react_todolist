/** @flow */

import http from '../../utilities/http'

import type { Dispatch, User, ThunkAction } from '../../types'


const clearTasks = (user:User):ThunkAction => async (dispatch: Dispatch) => {
  const { userId, token } = user
  http.delete(`http://localhost:3008/remove-all-tasks/${userId}`, token)
  dispatch({ type: 'CLEAR_TASKS' })
}

export default clearTasks
