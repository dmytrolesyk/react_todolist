/** @flow */

import React, { Component } from 'react'
import uuid from 'uuid'
import TitleHolder from '../TitleHolder'
import TextInputHolder from '../TextInputHolder'
import Button from '../Button'
import NotificationPortal from '../NotificationPortal'
import Notification from '../NotificationPortal/components/Notification'

import http from '../../utilities/http'

import type { NotificationType, AcceptsTaskReturnsNothing } from '../../types'

import './AddTaskSection.css'

type Props = {
  userId: string,
  token: string,
  addNewTask: AcceptsTaskReturnsNothing
}

type State = {
  taskInput: string,
  notifications: Array<{id: string, status: string, msg: string}>
}

class AddTaskSection extends Component<Props, State> {
  state = {
    taskInput: '',
    notifications: [],
  }

  onChange = (e: any):void => this.setState({ [e.target.name]: e.target.value })

  removeNotification = (id:string) => {
    const { notifications } = this.state
    const newNotifications = notifications.filter(notification => notification.id !== id)
    this.setState({
      notifications: newNotifications,
    })
  }

  addNewTaskHandler = async ():Promise<any> => {
    const { addNewTask, userId, token } = this.props
    const { taskInput } = this.state
    if (!taskInput) {
      const notification: NotificationType = {
        id: uuid(),
        status: 'failure',
        msg: 'You need to input some value',
      }
      this.setState(prevState => ({
        notifications: [
          ...prevState.notifications,
          notification,
        ],
      }))
      return
    }
    const res = await http.post('http://localhost:3008/tasks/', { caption: taskInput, userId }, `Bearer ${token}`)
    addNewTask(res)
    this.setState({
      taskInput: '',
    })
  }

  render() {
    const { taskInput, notifications } = this.state
    return (
      <div className="add-task-section">
        <TitleHolder
          title="Add Tasks"
        />
        <TextInputHolder
          name="taskInput"
          value={taskInput}
          placeholder="Input your Task"
          onChange={this.onChange}
          onKeyPress={this.addNewTaskHandler}
        />
        <Button
          color="btn-violet"
          size="btn-regular"
          text="Add Task"
          onClick={this.addNewTaskHandler}
        />
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

export default AddTaskSection
