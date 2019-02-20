/** @flow */

import {
  SET_USER,
  REMOVE_USER,
} from '../actions/userActionTypes'

import type { User, ActionType } from '../types'


export default function (state:?User = null, action:ActionType):?User {
  switch (action.type) {
    case SET_USER:
      return action.payload
    case REMOVE_USER:
      return null
    default:
      return state
  }
}
