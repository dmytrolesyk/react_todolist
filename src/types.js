/** @flow */

export type Task = {|
  _id: string,
  caption: string,
  author?: string,
  completed: boolean,
|}

export type User = {|
  username: string,
  token: string,
  userId: string,
|}

export type NotificationType = {|
  id: string,
  status: string,
  msg: string,
|}

export type ErrorType = {
  id: string,
  message: string,
}

export type Board = {|
  id: string,
  name?: string,
  tasks: Array<Task>,
  error: string,
|}

export type AcceptsTaskReturnsNothing = (newTask: Task) => void

export type FetchTasksAction = {|
  type: 'FETCH_TASKS',
  payload: Array<Task>,
|}

export type AddTaskAction = {|
  type: 'ADD_TASK',
  payload: Task,
|}

export type DeleteTaskAction = {|
  type: 'DELETE_TASK',
  payload: Task,
|}

export type UpdateTaskAction = {|
  type: 'UPDATE_TASK',
  payload: Task,
|}

export type ClearTasksAction = {|
  type: 'CLEAR_TASKS',
  payload: string,
|}

export type SetUserAction = {|
  type: 'SET_USER',
  payload: User,
|}

export type RemoveUserAction = {|
  type: 'REMOVE_USER'
|}

export type AddNotificationAction = {|
  type: 'ADD_NOTIFICATION',
  payload: NotificationType,
|}

export type RemoveNotificationAction = {|
  type: 'REMOVE_NOTIFICATION',
  payload: string,
|}

export type AddBoardAction = {|
  type: 'ADD_BOARD',
  payload: Board,
|}


export type UserAction = SetUserAction | RemoveUserAction

export type NotificationAction = AddNotificationAction | RemoveNotificationAction

export type BoardAction = AddBoardAction | AddTaskAction
| DeleteTaskAction | UpdateTaskAction | ClearTasksAction | RemoveUserAction

export type Action = UserAction | NotificationAction | BoardAction

// export type TasksState = Array<Task>
export type UserState = ?User
export type NotificationsState = Array<NotificationType>
export type BoardState = Array<Board>

export type State = {
  +user: UserState,
  +boards: BoardState,
  +notifications: NotificationsState,
}

type GetState = () => State
type PromiseAction = Promise<Action>
export type ThunkAction = (dispatch: Dispatch, getState: GetState) => any
export type Dispatch = (action: Action | ThunkAction | PromiseAction | Array<Action>) => any
