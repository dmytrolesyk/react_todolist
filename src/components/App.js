/** @flow */

import React, { Component } from 'react'
import uuid from 'uuid'

import LoginForm from './LoginForm'
import Toolbar from './Toolbar'
import AddTaskSection from './AddTaskSection/AddTaskSection'
import ManageTaskSection from './ManageTaskSection'

import NotificationPortal from './NotificationPortal'

import http from '../utilities/http'

import type {
  NotificationType, User, Task, AcceptsTaskReturnsNothing,
} from '../types'

import './App.css'

type State = {
  loggedIn: boolean,
  user: User | {},
  tasks: Array<Task>,
  notifications: Array<NotificationType>
}

class App extends Component<any, State> {
  state = {
    loggedIn: false,
    user: {},
    tasks: [],
    notifications: [],
  }

  async componentDidMount() {
    if (localStorage.getItem('user')) {
      const user = JSON.parse(localStorage.getItem('user') || '{}')
      const tasks = await http.get(`http://localhost:3008/tasks/${user.userId}`, `Bearer ${user.token}`)
      this.setState({
        loggedIn: true,
        user,
        tasks,
      })
    }
  }

  logOut = () => {
    localStorage.removeItem('user')
    this.setState({
      loggedIn: false,
      user: {},
      tasks: [],
    })
  }

  uponLogin = async (user: User) => {
    localStorage.setItem('user', JSON.stringify(user))
    const tasks = await http.get(`http://localhost:3008/tasks/${user.userId}`, `Bearer ${user.token}`)
    this.setState({
      loggedIn: true,
      user,
      tasks,
    })
  }

  addNewTask: AcceptsTaskReturnsNothing = (newTask) => {
    this.setState(prevState => ({
      tasks: [
        ...prevState.tasks,
        newTask,
      ],
    }))
  }

  clearTasks = () => this.setState({ tasks: [] })


  updateTask: AcceptsTaskReturnsNothing = (updatedTask) => {
    const { tasks } = this.state
    const newTasks = tasks.map((task) => {
      if (task._id !== updatedTask._id) {
        return task
      }
      return updatedTask
    })
    this.setState({
      tasks: newTasks,
    })
  }

  deleteTask = (id: string): void => {
    const { tasks } = this.state
    const newTasks = tasks.filter(task => task._id !== id)

    this.setState({
      tasks: newTasks,
    })
  }

  removeNotification = (id:string) => {
    const { notifications } = this.state
    const newNotifications = notifications.filter(notification => notification.id !== id)
    this.setState({
      notifications: newNotifications,
    })
  }

  addNotification = (status:string, msg:string) => {
    const notification: NotificationType = {
      id: uuid(),
      status,
      msg,
    }
    this.setState(prevState => ({
      notifications: [
        ...prevState.notifications,
        notification,
      ],
    }))

    setTimeout(() => this.removeNotification(notification.id), 5000)
  }

  render() {
    const {
      loggedIn, tasks, user, notifications,
    } = this.state
    return (
      <div className="wrapper">
        <div className="container">
          <div className="row">
            <div className="column">
              <div className="card">
                {!loggedIn
                  ? (
                    <LoginForm
                      uponLogin={this.uponLogin}
                      addNotification={this.addNotification}
                    />
                  ) : null}
                {loggedIn && (typeof user.userId === 'string') && (typeof user.username === 'string') && (typeof user.token === 'string') ? (
                  <>
                    <Toolbar
                      username={user.username}
                      logOut={this.logOut}
                    />
                    <AddTaskSection
                      userId={user.userId}
                      token={user.token}
                      addNewTask={this.addNewTask}
                      addNotification={this.addNotification}
                    />
                    <ManageTaskSection
                      tasks={tasks}
                      token={user.token}
                      userId={user.userId}
                      clearTasks={this.clearTasks}
                      deleteTask={this.deleteTask}
                      updateTask={this.updateTask}
                      addNotification={this.addNotification}
                    />
                  </>
                ) : null}
                <NotificationPortal notifications={notifications} />
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default App
