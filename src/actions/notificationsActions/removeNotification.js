/** @flow */

import type { RemoveNotificationAction } from '../../types'

const removeNotification = (id:string):RemoveNotificationAction => ({ type: 'REMOVE_NOTIFICATION', payload: id })

export default removeNotification
