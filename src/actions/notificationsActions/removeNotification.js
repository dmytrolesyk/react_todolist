/** @flow */

import { REMOVE_NOTIFICATION } from '../notificationsActionTypes'

const removeNotification = (id:string) => ({
  type: REMOVE_NOTIFICATION,
  payload: id,
})

export default removeNotification
