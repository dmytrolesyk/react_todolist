/** @flow */

import React from 'react'
import Task from './components/Task'

import type { Task as TaskType, AcceptsTaskReturnsNothing } from '../../../../types'

import './Tasks.css'

type Props = {
  tasks: Array<TaskType>,
  deleteTask:(id: string) => void,
  setEditState:AcceptsTaskReturnsNothing,
  updateTask: AcceptsTaskReturnsNothing,
  removeEditState:() => void,
}

const Tasks = (props: Props) => {
  const {
    tasks,
    setEditState,
    deleteTask,
    updateTask,
    removeEditState,
  } = props
  return (
    <ul className="tasks-component">
      {tasks.map(task => (
        <Task
          key={task.id}
          task={task}
          deleteTask={deleteTask}
          setEditState={setEditState}
          updateTask={updateTask}
          removeEditState={removeEditState}
        />
      ))}
    </ul>
  )
}

export default Tasks
