/** @flow */

import React, { Component } from 'react'
import uuid from 'uuid'
import TitleHolder from '../TitleHolder'
import Button from '../Button'
import TextInputHolder from '../TextInputHolder'
import Tasks from './components/Tasks'
import NotificationPortal from '../NotificationPortal'
import Notification from '../NotificationPortal/components/Notification'

import http from '../../utilities/http'
import type { Task, NotificationType, AcceptsTaskReturnsNothing } from '../../types'

import './ManageTaskSection.css'


type Props = {
  tasks: Array<Task>,
  token: string,
  userId: string,
  clearTasks: () => void,
  deleteTask: (id: string) => void,
  updateTask: AcceptsTaskReturnsNothing
}

type State = {
  editState: boolean,
  currentTask: ?Task,
  filterInput: string,
  updateInput: string,
  notifications: Array<{id: string, status: string, msg: string}>,
}

class ManageTaskSection extends Component<Props, State> {
  constructor(props: Props) {
    super(props)

    this.state = {
      editState: false,
      currentTask: null,
      filterInput: '',
      updateInput: '',
      notifications: [],
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

  removeNotification = (id:string) => {
    const { notifications } = this.state
    const newNotifications = notifications.filter(notification => notification.id !== id)
    this.setState({
      notifications: newNotifications,
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
      const notification: NotificationType = {
        id: uuid(),
        status: 'failure',
        msg: 'You need to input updated value',
      }
      this.setState(prevState => ({
        notifications: [
          ...prevState.notifications,
          notification,
        ],
      }))
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
    const { clearTasks, token, userId } = this.props
    http.delete(`http://localhost:3008/remove-all-tasks/${userId}`, `Bearer ${token}`)
    clearTasks()
  }

  render() {
    const {
      filterInput,
      updateInput,
      editState,
      notifications,
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
        {
          notifications.map(notification => (
            <NotificationPortal
              key={notification.id}
              removeNotification={this.removeNotification}
              notificationId={notification.id}
            >
              <Notification
                msg={notification.msg}
                status={notification.status}
              />
            </NotificationPortal>
          ))
        }
      </div>
    )
  }
}

export default ManageTaskSection
