/** @flow */

import { handleActions } from 'redux-actions'

import TOGGLE_MODAL from '../actions/modalActionTypes'

import type { ModalAction } from '../types'

export default handleActions<boolean, ModalAction>({
  [TOGGLE_MODAL]: (state: boolean):boolean => !state,
}, false)
