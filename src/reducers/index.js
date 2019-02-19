import { combineReducers } from 'redux'

import userReducer from './userReducer'
import tasksReducer from './tasksReducer'
import notificationsReducer from './notificationsReducer'

export default combineReducers({
  user: userReducer,
  tasks: tasksReducer,
  notifications: notificationsReducer,
})
