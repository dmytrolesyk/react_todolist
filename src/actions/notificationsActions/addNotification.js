import uuid from 'uuid'
import removeNotification from './removeNotification'
import { ADD_NOTIFICATION } from '../notificationsActionTypes'

const addNotification = (status, msg) => (dispatch) => {
  const notification = {
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
