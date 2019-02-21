/** @flow */

import uuid from 'uuid'
import removeNotification from './removeNotification'

import type { Dispatch, NotificationType, ThunkAction } from '../../types'

const addNotification = (status:string, msg:string):ThunkAction => (dispatch: Dispatch) => {
  const notification:NotificationType = {
    id: uuid(),
    status,
    msg,
  }

  if (notification) {
    dispatch({
      type: 'ADD_NOTIFICATION',
      payload: notification,
    })
  }

  setTimeout(() => {
    dispatch(removeNotification(notification.id))
  }, 5000)
}

export default addNotification
