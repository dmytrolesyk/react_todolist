import { combineReducers } from 'redux'

import userReducer from './userReducer'
import tasksReducer from './tasksReducer'
import notificationsReducer from './notificationsReducer'
import boardReducer from './boardReducer'

export default combineReducers({
  user: userReducer,
  tasks: tasksReducer,
  currentBoard: boardReducer,
  notifications: notificationsReducer,
})
