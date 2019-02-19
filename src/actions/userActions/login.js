import { LOG_IN } from '../userActionTypes'
import http from '../../utilities/http'
import addNotification from '../notificationsActions/addNotification'

const login = (username, password) => async (dispatch) => {
  if (!username || !password) {
    dispatch(addNotification('failure', 'Input username and password'))
    return
  }
  const user = await http.post('http://localhost:3008/login', { username, password })
  if (user.success) {
    localStorage.setItem('user', JSON.stringify((user.data)))
    dispatch({
      type: LOG_IN,
      payload: user.data,
    })
  } else {
    dispatch(addNotification('failure', 'Username or password is incorrect'))
  }
}

export default login
