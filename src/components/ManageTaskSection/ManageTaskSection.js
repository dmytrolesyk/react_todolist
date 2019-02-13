/** @flow */

import React, { Component } from 'react'
import TitleHolder from '../TitleHolder'
import Button from '../Button'
import TextInputHolder from '../TextInputHolder'
import Tasks from './components/Tasks'

import type { Task, AcceptsTaskReturnsNothing } from '../../types'

import './ManageTaskSection.css'


type Props = {
  tasks: Array<Task>,
  clearTasks: () => void,
  deleteTask: (id: string) => void,
  updateTask: (updatedTask: Task) => void
}

type State = {
  editState: boolean,
  currentTask: ?Task,
  filterInput: string,
  updateInput: string,
}

class ManageTaskSection extends Component<Props, State> {
  constructor(props: Props) {
    super(props)

    this.state = {
      editState: false,
      currentTask: null,
      filterInput: '',
      updateInput: '',
    }
  }

  setEditState: AcceptsTaskReturnsNothing = (task) => {
    this.setState({
      editState: true,
      currentTask: task,
      updateInput: task.caption,
    })
  }

  removeEditState = ():void => {
    this.setState({
      editState: false,
      currentTask: null,
      updateInput: '',
    })
  }

  filterTasks = ():Array<Task> => {
    const { tasks } = this.props
    const { filterInput } = this.state
    return tasks.filter(task => task.caption.toLowerCase().includes(filterInput.toLowerCase()))
  }

  onChangeFilterInput = (e: any):void => {
    this.setState({
      [e.target.name]: e.target.value,
    }, this.filterTasks)
  }

  onChangeUpdateInput = (e:any):void => {
    this.setState({
      [e.target.name]: e.target.value,
    })
  }

  updateTaskBtnClick = ():void => {
    const { updateTask } = this.props
    const { updateInput, currentTask } = this.state
    if (currentTask) {
      const updatedTask = {
        id: currentTask.id,
        caption: updateInput,
        completed: currentTask.completed,
      }
      updateTask(updatedTask)
      this.removeEditState()
    }
  }

  clearTasksBtnClick = ():void => {
    const { clearTasks } = this.props
    clearTasks()
  }

  render() {
    const {
      filterInput,
      updateInput,
      editState,
    } = this.state
    const { deleteTask, updateTask, tasks } = this.props
    const tasksToDisplay: Array<Task> = editState ? tasks : this.filterTasks()
    return (
      <div className="manage-tasks-section">
        <TitleHolder
          title="Manage Tasks"
        />
        {!editState ? (
          <TextInputHolder
            name="filterInput"
            value={filterInput}
            placeholder="Filter Tasks"
            onChange={this.onChangeFilterInput}
          />
        ) : null}
        {editState ? (
          <TextInputHolder
            name="updateInput"
            value={updateInput}
            placeholder="Update Task"
            onChange={this.onChangeUpdateInput}
          />
        ) : null}
        {tasksToDisplay.length ? (
          <Tasks
            tasks={tasksToDisplay}
            deleteTask={deleteTask}
            setEditState={this.setEditState}
            updateTask={updateTask}
            removeEditState={this.removeEditState}
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
        {editState ? (
          <Button
            color="btn-red"
            size="btn-regular"
            text="Cancel Edit"
            optClasses="btn-clear-tasks"
            onClick={this.removeEditState}
          />
        ) : null}
      </div>
    )
  }
}

export default ManageTaskSection
