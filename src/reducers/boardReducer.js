/** @flow */

import { handleActions } from 'redux-actions'

import {
  GET_PUBLIC_BOARDS,
  ADD_BOARD,
  ADD_TASK,
  DELETE_TASK,
  UPDATE_TASK,
  CLEAR_TASKS,
} from '../actions/boardActionTypes'

import { REMOVE_USER } from '../actions/userActionTypes'

import type {
  BoardState,
  BoardAction,
  AddBoardAction,
  AddTaskAction,
  DeleteTaskAction,
  ClearTasksAction,
  UpdateTaskAction,
  GetPublicBoardsAction,
} from '../types'

export default handleActions <BoardState, BoardAction>({
  [ADD_BOARD]: (
    state: BoardState,
    action: AddBoardAction,
  ): BoardState => [...state, action.payload],
  [GET_PUBLIC_BOARDS]: (
    state: BoardState,
    action: GetPublicBoardsAction,
  ):BoardState => action.payload,
  [ADD_TASK]: (
    state: BoardState,
    action: AddTaskAction,
  ): BoardState => state.map(
    board => (
      board.id !== action.payload.author ? board : {
        ...board,
        tasks: [...board.tasks, action.payload],
      }
    ),
  ),
  [DELETE_TASK]: (
    state:BoardState,
    action: DeleteTaskAction,
  ): BoardState => state.map(
    board => (
      board.id !== action.payload.author ? board : {
        ...board,
        tasks: board.tasks.filter(task => task._id !== action.payload._id),
      }
    ),
  ),
  [UPDATE_TASK]: (
    state:BoardState,
    action: UpdateTaskAction,
  ): BoardState => state.map(
    board => (
      board.id !== action.payload.author ? board : {
        ...board,
        tasks: board.tasks.map(task => (task._id !== action.payload._id ? task : action.payload)),
      }
    ),
  ),
  [CLEAR_TASKS]: (
    state:BoardState,
    action: ClearTasksAction,
  ): BoardState => state.map(
    board => (
      board.id !== action.payload ? board : {
        ...board,
        tasks: [],
      }
    ),
  ),
  [REMOVE_USER]: (): BoardState => [],
}, [])
