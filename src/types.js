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

export type AcceptsTaskReturnsNothing = (newTask: Task) => void

export type ActionType = { type: string, payload?: * }

type ThunkAction = (dispatch: DispatchType) => any;

export type DispatchType = (action: ActionType | ThunkAction) => any
