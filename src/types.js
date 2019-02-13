/** @flow */

export type Task = {
  id: string,
  caption: string,
  completed: boolean,
}

export type User = {
  id: string,
  username: string,
  token: string,
}

export type AcceptsTaskReturnsNothing = (newTask: Task) => void
