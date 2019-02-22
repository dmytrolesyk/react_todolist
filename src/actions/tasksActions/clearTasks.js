/** @flow */

import http from '../../utilities/http'

import config from '../../../config'

import type { Dispatch, User, ThunkAction } from '../../types'

const clearTasks = (user:User):ThunkAction => async (dispatch: Dispatch) => {
  const { userId, token } = user
  http.delete(`${config.HOST}:${config.PORT}/remove-all-tasks/${userId}`, token)
  dispatch({ type: 'CLEAR_TASKS' })
}

export default clearTasks
