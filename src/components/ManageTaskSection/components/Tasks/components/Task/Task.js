/** @flow */

import React from 'react'
import classnames from 'classnames'

import type { Task as TaskType, AcceptsTaskReturnsNothing } from '../../../../../../types'

import './css/Task.css'

type Props = {
  task: TaskType,
  deleteTask: (id: string)=>void,
  setEditState:AcceptsTaskReturnsNothing,
  updateTask: AcceptsTaskReturnsNothing,
  removeEditState:() => void,
}

const Task = ({
  task,
  setEditState,
  deleteTask,
  updateTask,
  removeEditState,
}: Props) => {
  const { id, caption, completed } = task
  const checkBoxToggle = ():void => {
    const toggledTask = {
      id,
      caption,
      completed: !completed,
    }
    updateTask(toggledTask)
  }
  return (
    <li
      className={classnames('task-item', { 'task-item-completed': completed })}
    >
      {caption}
      <span
        className="icon-pencil edit-icon"
        role="button"
        tabIndex={0}
        onClick={() => setEditState(task)}
        onKeyPress={() => setEditState(task)}
      />
      <span
        className="delete-item-icon"
        role="button"
        tabIndex={0}
        onClick={() => {
          deleteTask(id)
          removeEditState()
        }}
        onKeyPress={() => {
          deleteTask(id)
          removeEditState()
        }}
      >
        &times;
      </span>
      <input
        type="checkbox"
        defaultChecked={completed}
        id={id}
        onClick={checkBoxToggle}
      />
      <label htmlFor={id} className="checkbox-label" />
    </li>
  )
}

export default Task
