import { DELETE_TASK } from './tasksActionTypes'
import http from '../../utilities/http'

const deleteTask = (taskId, token) => async (dispatch) => {
  const deletedTask = await http.delete(`http://localhost:3008/tasks/${taskId}`, token)
  dispatch({
    type: DELETE_TASK,
    payload: deletedTask._id,
  })
}

export default deleteTask
