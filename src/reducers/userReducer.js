import {
  LOG_IN,
  REGISTER,
  LOG_OUT,
} from '../actions/userActionTypes'

export default function (state = null, action) {
  switch (action.type) {
    case LOG_IN:
    case REGISTER:
      return action.payload
    case LOG_OUT:
      return null
    default:
      return state
  }
}
