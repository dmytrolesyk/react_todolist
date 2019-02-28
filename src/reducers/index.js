import { combineReducers } from 'redux'

import userReducer from './userReducer'
import notificationsReducer from './notificationsReducer'
import boardReducer from './boardReducer'
import modalReducer from './modalReducer'

export default combineReducers({
  user: userReducer,
  boards: boardReducer,
  notifications: notificationsReducer,
  showModal: modalReducer,
})
