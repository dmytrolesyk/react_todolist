import { combineReducers } from 'redux'

import userReducer from './userReducer'
import notificationsReducer from './notificationsReducer'
import boardReducer from './boardReducer'

export default combineReducers({
  user: userReducer,
  boards: boardReducer,
  notifications: notificationsReducer,
})
