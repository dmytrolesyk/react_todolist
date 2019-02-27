/** @flow */

import http from '../../utilities/http'

import config from '../../../config'

import type { Dispatch, ThunkAction } from '../../types'

const clearTasks = (boardId: string, token:string):ThunkAction => async (dispatch: Dispatch) => {
  http.delete(`${config.HOST}:${config.PORT}/remove-all-tasks/${boardId}`, token)
  dispatch({ type: 'CLEAR_TASKS', payload: boardId })
}

export default clearTasks
