/** @flow */

import { handleActions } from 'redux-actions'

import {
  ADD_NOTIFICATION,
  REMOVE_NOTIFICATION,
} from '../actions/notificationsActionTypes'

import type {
  NotificationsState,
  NotificationAction,
  AddNotificationAction,
  RemoveNotificationAction,
} from '../types'

export default handleActions<NotificationsState, NotificationAction>({
  [ADD_NOTIFICATION]: (
    state: NotificationsState,
    action: AddNotificationAction,
  ):NotificationsState => [...state, action.payload],
  [REMOVE_NOTIFICATION]: (
    state: NotificationsState,
    action: RemoveNotificationAction,
  ):NotificationsState => state.filter(n => n.id !== action.payload),
}, [])
