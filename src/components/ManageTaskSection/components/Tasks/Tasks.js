/** @flow */

import React from 'react'
import Task from './components/Task'

import type { Task as TaskType, AcceptsTaskReturnsNothing } from '../../../../types'

import './Tasks.css'

type Props = {
  tasks: Array<TaskType>,
  setEditState:AcceptsTaskReturnsNothing,
  removeEditState:() => void,
}

const Tasks = (props: Props) => {
  const {
    tasks,
    setEditState,
    removeEditState,
  } = props
  return (
    <ul className="tasks-component">
      {tasks.map(task => (
        <Task
          key={task._id}
          task={task}
          setEditState={setEditState}
          removeEditState={removeEditState}
        />
      ))}
    </ul>
  )
}

export default Tasks
