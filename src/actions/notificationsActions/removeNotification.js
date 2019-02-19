import { REMOVE_NOTIFICATION } from '../notificationsActionTypes'

const removeNotification = id => ({
  type: REMOVE_NOTIFICATION,
  payload: id,
})

export default removeNotification
