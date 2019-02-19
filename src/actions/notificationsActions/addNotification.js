import uuid from 'uuid'
import { ADD_NOTIFICATION } from '../notificationsActionTypes'

const addNotification = (status, msg) => {
  const notification = {
    id: uuid(),
    status,
    msg,
  }

  return {
    type: ADD_NOTIFICATION,
    payload: notification,
  }
}

export default addNotification
