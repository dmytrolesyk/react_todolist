/** @flow */

import React, { Component } from 'react'
import TitleHolder from '../TitleHolder'
import Button from '../Button'
import TextInputHolder from '../TextInputHolder'
import Tasks from './components/Tasks'

import http from '../../utilities/http'
import type { Task, AcceptsTaskReturnsNothing } from '../../types'

import './ManageTaskSection.css'


type Props = {
  tasks: Array<Task>,
  token: string,
  clearTasks: () => void,
  deleteTask: (id: string) => void,
  updateTask: AcceptsTaskReturnsNothing
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

  updateTaskBtnClick = async ():Promise<any> => {
    const { updateTask, token } = this.props
    const { updateInput, currentTask } = this.state
    if (!updateInput) {
      alert('You need to input some value')
      return
    }
    if (currentTask) {
      const taskToUpdate: Task = {
        _id: currentTask._id,
        caption: updateInput,
        completed: currentTask.completed,
      }
      const updatedTask = await http.put('http://localhost:3008/tasks/', taskToUpdate, `Bearer ${token}`)
      updateTask(updatedTask)
      this.removeEditState()
    }
  }

  clearTasksBtnClick = ():void => {
    const { clearTasks, token } = this.props
    http.delete('http://localhost:3008/remove-all-tasks', `Bearer ${token}`)
    clearTasks()
  }

  render() {
    const {
      filterInput,
      updateInput,
      editState,
    } = this.state
    const {
      deleteTask, updateTask, tasks, token,
    } = this.props
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
            onKeyPress={this.updateTaskBtnClick}
          />
        ) : null}
        {tasksToDisplay.length ? (
          <Tasks
            tasks={tasksToDisplay}
            token={token}
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
