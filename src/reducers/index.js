import { combineReducers } from 'redux'
import loggedInReducer from './loggedInReducer'
import userReducer from './userReducer'
import tasksReducer from './tasksReducer'
import notificationsReducer from './notificationsReducer'

export default combineReducers({
  loggedIn: loggedInReducer,
  user: userReducer,
  tasks: tasksReducer,
  notifications: notificationsReducer,
})
