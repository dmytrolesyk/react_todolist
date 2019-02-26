/** @flow */

export type Task = {|
  _id: string,
  caption: string,
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

export type Board = {|
  id: string,
  name: string,
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
  payload: string,
|}

export type UpdateTaskAction = {|
  type: 'UPDATE_TASK',
  payload: Task,
|}

export type ClearTasksAction = {|
  type: 'CLEAR_TASKS'
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

export type SetBoardAction = {|
  type: 'SET_BOARD',
  payload: Board,
|}

export type RemoveBoardAction = {|
  type: 'REMOVE_BOARD'
|}

export type UserAction = SetUserAction | RemoveUserAction

export type TasksAction = FetchTasksAction | AddTaskAction
| DeleteTaskAction | UpdateTaskAction | ClearTasksAction | RemoveUserAction

export type NotificationAction = AddNotificationAction | RemoveNotificationAction

export type BoardAction = SetBoardAction | RemoveBoardAction

export type Action = UserAction | TasksAction | NotificationAction | BoardAction

export type TasksState = Array<Task>
export type UserState = ?User
export type NotificationsState = Array<NotificationType>
export type BoardState = ?Board

export type State = {
  +user: UserState,
  +tasks: TasksState,
  +notifications: NotificationsState,
}

type GetState = () => State
type PromiseAction = Promise<Action>
export type ThunkAction = (dispatch: Dispatch, getState: GetState) => any
export type Dispatch = (action: Action | ThunkAction | PromiseAction | Array<Action>) => any
