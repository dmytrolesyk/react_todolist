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

export type AcceptsTaskReturnsNothing = (newTask: Task) => void
