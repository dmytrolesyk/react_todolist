import { UPDATE_TASK } from './tasksActionTypes'
import http from '../../utilities/http'

const updateTask = (taskToUpdate, token) => async (dispatch) => {
  const updatedTask = await http.put('http://localhost:3008/tasks/', taskToUpdate, token)
  dispatch({
    type: UPDATE_TASK,
    payload: updatedTask,
  })
}

export default updateTask
