/** @flow */

import { SET_USER } from '../userActionTypes'

import type { DispatchType } from '../../types'

const fetchUserFromLocalStorage = () => (dispatch: DispatchType) => {
  if (typeof localStorage.getItem('user') === 'string') {
    dispatch({ type: SET_USER, payload: JSON.parse(localStorage.getItem('user')) })
  }
}

export default fetchUserFromLocalStorage
