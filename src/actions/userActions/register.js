import { REGISTER } from '../userActionTypes'

import http from '../../utilities/http'
import addNotification from '../notificationsActions/addNotification'

const register = (username, password, conirmPassword) => async (dispatch) => {
  if (!username || !password) {
    dispatch(addNotification('failure', 'Input username and password'))
    return
  }
  if (password !== conirmPassword) {
    dispatch(addNotification('failure', 'Make sure the password matches the confirmation!'))
    return
  }
  const user = await http.post('http://localhost:3008/register', { username, password })
  if (user.success) {
    localStorage.setItem('user', JSON.stringify((user.data)))
    dispatch({
      type: REGISTER,
      payload: user.data,
    })
  } else {
    dispatch(addNotification('failure', 'Username exists'))
  }
}


export default register
