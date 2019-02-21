/** @flow */

import React, { Component } from 'react'

import { connect } from 'react-redux'

import addNotificationAction from '../../actions/notificationsActions/addNotification'
import updateTaskAction from '../../actions/tasksActions/updateTask'
import fetchTasksAction from '../../actions/tasksActions/fetchTasks'
import clearTasksAction from '../../actions/tasksActions/clearTasks'


import TitleHolder from '../TitleHolder'
import Button from '../Button'
import TextInputHolder from '../TextInputHolder'
import Tasks from './components/Tasks'

import type { Task, User, AcceptsTaskReturnsNothing } from '../../types'

import './ManageTaskSection.css'


type Props = {
  tasks: Array<Task>,
  user: User,
  fetchTasks: (user: User)=>void,
  clearTasks: (user: User) => void,
  updateTask: (task: Task, token: string) => void,
  addNotification: (status: string, msg: string) => void,
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

  componentDidMount() {
    const { fetchTasks, user } = this.props
    fetchTasks(user)
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
    const { updateTask, user, addNotification } = this.props
    const { updateInput, currentTask } = this.state
    if (!updateInput) {
      addNotification('failure', 'You need to input some updated value')
      return
    }
    if (currentTask) {
      const taskToUpdate: Task = {
        _id: currentTask._id,
        caption: updateInput,
        completed: currentTask.completed,
      }
      updateTask(taskToUpdate, user.token)
      this.removeEditState()
    }
  }

  render() {
    const {
      filterInput,
      updateInput,
      editState,
    } = this.state
    const {
      tasks, user, clearTasks,
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
            setEditState={this.setEditState}
            removeEditState={this.removeEditState}
          />
        ) : null}
        {!editState ? (
          <Button
            color="btn-black"
            size="btn-regular"
            text="Clear Tasks"
            optClasses="btn-clear-tasks"
            onClick={() => clearTasks(user)}
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

const mapStateToProps = state => ({
  tasks: state.tasks,
  user: state.user,
})

const mapDispatchToProps = {
  addNotification: addNotificationAction,
  updateTask: updateTaskAction,
  fetchTasks: fetchTasksAction,
  clearTasks: clearTasksAction,
}

export default connect(mapStateToProps, mapDispatchToProps)(ManageTaskSection)
