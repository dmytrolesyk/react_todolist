/** @flow */

import type { Dispatch, ThunkAction, User } from '../../types'
import http from '../../utilities/http'
import config from '../../../config'

const updateUser = (updatedUser: User):ThunkAction => async (dispatch: Dispatch) => {
  const user = await http.put(`${config.HOST}:${config.PORT}/users`, updatedUser, updatedUser.token)
  dispatch({
    type: 'UPDATE_USER',
    payload: user,
  })
}

export default updateUser
  