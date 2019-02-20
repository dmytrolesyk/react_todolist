/** @flow */


import {
  ADD_NOTIFICATION,
  REMOVE_NOTIFICATION,
} from '../actions/notificationsActionTypes'

import type { NotificationType, ActionType } from '../types'

export default function (state:Array<NotificationType> = [], action:ActionType):Array<NotificationType> {
  switch (action.type) {
    case ADD_NOTIFICATION:
      return [
        ...state,
        action.payload,
      ]
    case REMOVE_NOTIFICATION:
      return state.filter(n => n.id !== action.payload)
    default:
      return state
  }
}
