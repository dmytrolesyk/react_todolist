/** @flow */

import { REMOVE_USER } from '../userActionTypes'

import type { DispatchType } from '../../types'

const logoutAction = () => (dispatch: DispatchType) => {
  localStorage.removeItem('user')
  dispatch({ type: REMOVE_USER })
}

export default logoutAction
