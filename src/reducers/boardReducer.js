/** @flow */

import { handleActions } from 'redux-actions'

import {
  SET_BOARD,
  REMOVE_BOARD,
} from '../actions/boardActionTypes'

import type { BoardState, BoardAction, SetBoardAction } from '../types'

export default handleActions<BoardState, BoardAction>({
  [SET_BOARD]: (state: BoardState, action: SetBoardAction):BoardState => action.payload,
  [REMOVE_BOARD]: ():null => null,
}, null)
