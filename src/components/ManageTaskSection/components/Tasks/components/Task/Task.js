import React from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'

import './css/Task.css'

const Task = ({ task }) => {
  const { id, caption, completed } = task
  return (
    <li
      className={classnames('task-item', { 'task-item-completed': completed })}
    >
      {caption}
      <span className="icon-pencil edit-icon" />
      <span className="delete-item-icon">&times;</span>
      <input
        type="checkbox"
        checked={completed}
      />
      <label className="checkbox-label" />
    </li>
  )
}

Task.propTypes = {
  task: PropTypes.shape({ id: PropTypes.string, caption: PropTypes.string, completed: PropTypes.bool }).isRequired,
}

export default Task
