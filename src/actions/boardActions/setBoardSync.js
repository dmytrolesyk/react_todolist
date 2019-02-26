import { SET_BOARD } from '../boardActionTypes'

const setBoardSync = (id, name) => ({ type: SET_BOARD, payload: { id, name } })

export default setBoardSync
