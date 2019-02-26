import { SET_BOARD } from '../boardActionTypes'
import config from '../../../config'
import http from '../../utilities/http'

const setBoardAsync = (boardId, token) => async (dispatch) => {
  const user = await http.get(`${config.HOST}:${config.PORT}/users/${boardId}`, token)
  const board = {
    id: user._id,
    name: user.username,
  }
  localStorage.setItem('currentBoard', JSON.stringify(board))
  dispatch({
    type: SET_BOARD,
    payload: board,
  })
}

export default setBoardAsync
