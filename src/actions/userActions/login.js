/** @flow */

import http from '../../utilities/http'
import addNotification from '../notificationsActions/addNotification'

import type { Dispatch, ThunkAction } from '../../types'


const login = (username:string, password:string):ThunkAction => async (dispatch: Dispatch) => {
  if (!username || !password) {
    dispatch(addNotification('failure', 'Input username and password'))
    return
  }
  const user = await http.post('http://localhost:3008/login', { username, password })
  if (user.success) {
    user.data.token = `Bearer ${user.data.token}`
    localStorage.setItem('user', JSON.stringify(user.data))
    dispatch({
      type: 'SET_USER',
      payload: user.data,
    })
  } else {
    dispatch(addNotification('failure', 'Username or password is incorrect'))
  }
}

export default login
