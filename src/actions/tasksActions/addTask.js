import { ADD_TASK } from './tasksActionTypes'
import http from '../../utilities/http'

const addTask = (caption, user) => async (dispatch) => {
  const { userId, token } = user
  const newTask = await http.post('http://localhost:3008/tasks/', { caption, userId }, token)
  dispatch({
    type: ADD_TASK,
    payload: newTask,
  })
}

export default addTask
