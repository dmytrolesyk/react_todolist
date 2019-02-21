/** @flow */
import http from '../../utilities/http'

import type {
  Dispatch,
  User,
  ThunkAction,
  Task,
} from '../../types'


const fetchTasks = (user:User):ThunkAction => async (dispatch: Dispatch) => {
  const tasks:Array<Task> = await http.get(`http://localhost:3008/tasks/${user.userId}`, user.token)
  dispatch({
    type: 'FETCH_TASKS',
    payload: tasks,
  })
}

export default fetchTasks
