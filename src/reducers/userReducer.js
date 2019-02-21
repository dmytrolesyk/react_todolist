/** @flow */

import { handleActions } from 'redux-actions'

import {
  SET_USER,
  REMOVE_USER,
} from '../actions/userActionTypes'

import type { UserState, UserAction, SetUserAction } from '../types'

export default handleActions<UserState, UserAction>({
  [SET_USER]: (state: UserState, action: SetUserAction):UserState => action.payload,
  [REMOVE_USER]: ():null => null,
}, null)
