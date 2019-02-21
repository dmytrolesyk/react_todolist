/** @flow */

import { handleActions } from 'redux-actions'

import {
  FETCH_TASKS,
  ADD_TASK,
  DELETE_TASK,
  UPDATE_TASK,
  CLEAR_TASKS,
} from '../actions/tasksActionTypes'

import { REMOVE_USER } from '../actions/userActionTypes'

import type {
  TasksState,
  TasksAction,
  FetchTasksAction,
  AddTaskAction,
  DeleteTaskAction,
  UpdateTaskAction,
} from '../types'

export default handleActions <TasksState, TasksAction>({
  [FETCH_TASKS]: (
    state: TasksState,
    action: FetchTasksAction,
  ): TasksState => ([...state, ...action.payload]),
  [ADD_TASK]: (
    state: TasksState,
    action: AddTaskAction,
  ): TasksState => [...state, action.payload],
  [DELETE_TASK]: (
    state:TasksState,
    action: DeleteTaskAction,
  ): TasksState => state.filter(task => task._id !== action.payload),
  [UPDATE_TASK]: (
    state:TasksState,
    action: UpdateTaskAction,
  ): TasksState => state.map(task => (task._id !== action.payload._id ? task : action.payload)),
  [CLEAR_TASKS]: (): TasksState => [],
  [REMOVE_USER]: (): TasksState => [],
}, [])
