import { LOG_IN } from '../userActionTypes'
import http from '../../utilities/http'

const login = (username, password) => async (dispatch) => {
  const user = await http.post('http://localhost:3008/login', { username, password })
  dispatch({
    type: LOG_IN,
    payload: user,
  })
}

export default login
