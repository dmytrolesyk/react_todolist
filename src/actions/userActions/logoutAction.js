/** @flow */

import type { Dispatch, ThunkAction } from '../../types'

const logoutAction = ():ThunkAction => (dispatch: Dispatch) => {
  localStorage.removeItem('user')
  dispatch({ type: 'REMOVE_USER' })
}

export default logoutAction
