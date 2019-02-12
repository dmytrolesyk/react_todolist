import React, { Component } from 'react'
import PropTypes from 'prop-types'
import uuid from 'uuid'
import TitleHolder from '../TitleHolder'
import TextInputHolder from '../TextInputHolder'
import Button from '../Button'

import './AddTaskSection.css'

class AddTaskSection extends Component {
  state = {
    task: '',
  }

  onChange = e => this.setState({ [e.target.name]: e.target.value })

  onBtnClick = () => {
    const { addNewTask } = this.props
    let { task } = this.state
    const newTask = {
      id: uuid(),
      caption: task,
      completed: false,
    }
    addNewTask(newTask)
    task = ''
  }

  render() {
    const { task } = this.state
    return (
      <div className="add-task-section">
        <TitleHolder
          title="Add Tasks"
        />
        <TextInputHolder
          name="task"
          value={task}
          placeholder="Input your Task"
          onChange={this.onChange}
        />
        <Button
          color="btn-violet"
          size="btn-regular"
          text="Add Task"
          onClick={this.onBtnClick}
        />
      </div>
    )
  }
}

AddTaskSection.propTypes = {
  addNewTask: PropTypes.func.isRequired,
}

export default AddTaskSection
