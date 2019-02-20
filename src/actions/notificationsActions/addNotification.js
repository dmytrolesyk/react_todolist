/** @flow */


import uuid from 'uuid'
import removeNotification from './removeNotification'
import { ADD_NOTIFICATION } from '../notificationsActionTypes'

import type { DispatchType } from '../../types'

const addNotification = (status:string, msg:string) => (dispatch: DispatchType) => {
  const notification: {id: string, status: string, msg: string} = {
    id: uuid(),
    status,
    msg,
  }

  dispatch({
    type: ADD_NOTIFICATION,
    payload: notification,
  })

  setTimeout(() => {
    dispatch(removeNotification(notification.id))
  }, 5000)
}

export default addNotification
