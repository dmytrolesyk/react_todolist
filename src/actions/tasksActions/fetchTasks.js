import { FETCH_TASKS } from '../tasksActionTypes'
import http from '../../utilities/http'

const fetchTasks = user => async (dispatch) => {
  const tasks = await http.get(`http://localhost:3008/tasks/${user.userId}`, user.token)
  dispatch({
    type: FETCH_TASKS,
    payload: tasks,
  })
}

export default fetchTasks
