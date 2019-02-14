/** @flow */

import React from 'react'
import classnames from 'classnames'

import type { Task as TaskType, AcceptsTaskReturnsNothing } from '../../../../../../types'
import http from '../../../../../../utilities/http'
import './css/Task.css'

type Props = {
  task: TaskType,
  token: string,
  deleteTask: (id: string)=>void,
  setEditState:AcceptsTaskReturnsNothing,
  updateTask: AcceptsTaskReturnsNothing,
  removeEditState:() => void,
}

const Task = ({
  task,
  token,
  setEditState,
  deleteTask,
  updateTask,
  removeEditState,
}: Props) => {
  const { _id, caption, completed } = task
  const checkBoxToggle = async ():Promise<any> => {
    const toggledTask = {
      _id,
      caption,
      completed: !completed,
    }
    const updatedTask = await http.put('http://localhost:3008/tasks/', toggledTask, `Bearer ${token}`)
    updateTask(updatedTask)
  }

  const deleteIconHandler = async (id) => {
    await http.delete(`http://localhost:3008/tasks/${id}`, `Bearer ${token}`)
    deleteTask(id)
    removeEditState()
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
        onClick={() => deleteIconHandler(_id)}
        onKeyPress={() => deleteIconHandler(_id)}
      >
        &times;
      </span>
      <input
        type="checkbox"
        defaultChecked={completed}
        id={_id}
        onClick={checkBoxToggle}
      />
      <label htmlFor={_id} className="checkbox-label" />
    </li>
  )
}

export default Task
