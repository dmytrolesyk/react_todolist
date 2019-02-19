import {
  ADD_NOTIFICATION,
  REMOVE_NOTIFICATION,
} from '../actions/notificationsActionTypes'

export default function (state = [], action) {
  switch (action.type) {
    case ADD_NOTIFICATION:
      return [
        ...state,
        action.payload,
      ]
    case REMOVE_NOTIFICATION:
      return state.filter(n => n.id !== action.payload)
    default:
      return state
  }
}
