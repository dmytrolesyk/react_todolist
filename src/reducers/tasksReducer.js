import {
  FETCH_TASKS,
  ADD_TASK,
  DELETE_TASK,
  UPDATE_TASK,
  CLEAR_TASKS,
} from '../actions/tasksActionTypes'

export default function (state = [], action) {
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
      return []

    default:
      return state
  }
}
