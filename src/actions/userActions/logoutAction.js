import { LOG_OUT } from '../userActionTypes'

const logoutAction = () => {
  localStorage.removeItem('user')
  return { type: LOG_OUT }
}

export default logoutAction
