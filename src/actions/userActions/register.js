/** @flow */

import http from '../../utilities/http'
import addNotification from '../notificationsActions/addNotification'

import type { Dispatch, ThunkAction } from '../../types'

const register = (
  username:string, password:string, conirmPassword:string,
):ThunkAction => async (dispatch: Dispatch) => {
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
    user.data.token = `Bearer ${user.data.token}`
    localStorage.setItem('user', JSON.stringify(user.data))
    dispatch({
      type: 'SET_USER',
      payload: user.data,
    })
  } else {
    dispatch(addNotification('failure', 'Username exists'))
  }
}


export default register
