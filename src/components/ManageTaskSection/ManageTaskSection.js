import React, { Component } from 'react'
import PropTypes from 'prop-types'
import TitleHolder from '../TitleHolder'
import Button from '../Button'
import TextInputHolder from '../TextInputHolder'
import Tasks from './components/Tasks'

import './ManageTaskSection.css'


class ManageTaskSection extends Component {
  constructor(props) {
    super(props)

    const { tasks } = this.props

    this.state = {
      editState: false,
      currentTask: null,
      input: '',
      tasksToDisplay: [...tasks],
    }
  }

  setEditState = (task) => {
    this.setState({
      editState: true,
      currentTask: task.id,
      input: task.caption,
    })
  }

  removeEditState = () => {
    this.setState({
      editState: false,
      currentTask: null,
      input: '',
    })
  }

  filterTasks = () => {
    const { tasks } = this.props
    const { input } = this.state
    const tasksToDisplay = tasks
      .filter(task => (parseInt(task.caption.toLowerCase().indexOf(input), 10) !== -1))
    this.setState({
      tasksToDisplay,
    })
  }

  onChange = (e) => {
    const { editState } = this.state
    this.setState({
      [e.target.name]: e.target.value,
    }, !editState ? this.filterTasks : undefined)
  }

  updateTaskBtnClick = () => {
    const { updateTask } = this.props
    const { input, currentTask } = this.state
    const caption = input
    const id = currentTask
    updateTask(id, caption)
    this.removeEditState()
  }

  clearTasksBtnClick = () => {
    const { clearTasks } = this.props
    clearTasks()
  }

  render() {
    const { input, tasksToDisplay, editState } = this.state
    return (
      <div className="manage-tasks-section">
        <TitleHolder
          title="Manage Tasks"
        />
        <TextInputHolder
          name="input"
          value={input}
          placeholder="Filter Tasks"
          onChange={this.onChange}
        />
        {tasksToDisplay.length ? (
          <Tasks
            tasks={tasksToDisplay}
          />
        ) : null}
        {!editState ? (
          <Button
            color="btn-black"
            size="btn-regular"
            text="Clear Tasks"
            optClasses="btn-clear-tasks"
            onClick={this.clearTasksBtnClick}
          />
        ) : null}
        {editState ? (
          <Button
            color="btn-green"
            size="btn-regular"
            text="Update Task"
            optClasses="btn-clear-tasks"
            onClick={this.updateTaskBtnClick}
          />
        ) : null}
      </div>
    )
  }
}

ManageTaskSection.propTypes = {
  clearTasks: PropTypes.func.isRequired,
  updateTask: PropTypes.func.isRequired,
  tasks: PropTypes.arrayOf(PropTypes.object).isRequired,
}

export default ManageTaskSection
