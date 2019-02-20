/** @flow */

import React from 'react'
import { connect } from 'react-redux'
import classnames from 'classnames'
import updateTaskAction from '../../../../../../actions/tasksActions/updateTask'
import deleteTaskAction from '../../../../../../actions/tasksActions/deleteTask'

import type { User, Task as TaskType, AcceptsTaskReturnsNothing } from '../../../../../../types'
import './css/Task.css'

type Props = {
  user: User,
  task: TaskType,
  updateTask: (task: TaskType, token: string) => void,
  deleteTask: (taskId: string, token: string) => void,
  setEditState:AcceptsTaskReturnsNothing,
  removeEditState:() => void,
}

const Task = ({
  user,
  task,
  updateTask,
  deleteTask,
  setEditState,
  removeEditState,
}: Props) => {
  const { _id, caption, completed } = task
  const checkBoxToggle = ():void => {
    const toggledTask = {
      _id,
      caption,
      completed: !completed,
    }
    updateTask(toggledTask, user.token)
  }

  const deleteIconHandler = (id) => {
    deleteTask(id, user.token)
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

const mapStateToProps = state => ({
  user: state.user,
})

export default connect(mapStateToProps, {
  updateTask: updateTaskAction,
  deleteTask: deleteTaskAction,
})(Task)
