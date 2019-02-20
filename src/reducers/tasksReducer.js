/** @flow */

import {
  FETCH_TASKS,
  ADD_TASK,
  DELETE_TASK,
  UPDATE_TASK,
  CLEAR_TASKS,
} from '../actions/tasksActionTypes'

import { REMOVE_USER } from '../actions/userActionTypes'

import type { Task as TaskType } from '../types'

type State = Array<TaskType>

type Action = {
  type: string,
  payload: TaskType
}

export default function (state:State = [], action:Action):State {
  switch (action.type) {
    case FETCH_TASKS:
      return [
        ...action.payload,
      ]

    case ADD_TASK:
      return [
        ...state,
        action.payload,
      ]

    case DELETE_TASK:
      return state.filter(task => task._id !== action.payload)

    case UPDATE_TASK:
      return state.map((task) => {
        if (task._id !== action.payload._id) {
          return task
        }
        return action.payload
      })

    case CLEAR_TASKS:
    case REMOVE_USER:
      return []

    default:
      return state
  }
}
