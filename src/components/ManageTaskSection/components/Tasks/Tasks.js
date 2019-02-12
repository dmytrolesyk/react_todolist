import React from 'react'
import PropTypes from 'prop-types'
import Task from './components/Task'

import './Tasks.css'


const Tasks = (props) => {
  const { tasks } = props
  return (
    <ul className="tasks-component">
      {tasks.map(task => <Task key={task.id} task={task} />)}
    </ul>
  )
}

Tasks.propTypes = {
  tasks: PropTypes.arrayOf(PropTypes.object).isRequired,
}

export default Tasks
