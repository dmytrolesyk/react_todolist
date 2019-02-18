import { CLEAR_TASKS } from './tasksActionTypes'
import http from '../../utilities/http'

const clearTasks = (userId, token) => async (dispatch) => {
  http.delete(`http://localhost:3008/remove-all-tasks/${userId}`, token)
  dispatch({
    type: CLEAR_TASKS,
  })
}

export default clearTasks
