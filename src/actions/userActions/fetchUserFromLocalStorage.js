/** @flow */

import type { Dispatch, ThunkAction } from '../../types'

const fetchUserFromLocalStorage = ():ThunkAction => (dispatch: Dispatch) => {
  const userFromLocalStorage:?string = localStorage.getItem('user')
  if (typeof userFromLocalStorage === 'string') {
    dispatch({
      type: 'SET_USER',
      payload: JSON.parse(userFromLocalStorage),
    })
  }
}

export default fetchUserFromLocalStorage
