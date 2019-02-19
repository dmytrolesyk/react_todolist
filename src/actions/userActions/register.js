import { REGISTER } from '../userActionTypes'
import http from '../../utilities/http'

const register = (username, password) => async (dispatch) => {
  const user = await http.post('http://localhost:3008/register', { username, password })
  dispatch({
    type: REGISTER,
    payload: user,
  })
}

export default register
