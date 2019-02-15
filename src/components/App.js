/** @flow */

import React, { Component } from 'react'

import LoginForm from './LoginForm'
import Toolbar from './Toolbar'
import AddTaskSection from './AddTaskSection/AddTaskSection'
import ManageTaskSection from './ManageTaskSection'

import http from '../utilities/http'

import type { User, Task, AcceptsTaskReturnsNothing } from '../types'

import './App.css'

type State = {
  loggedIn: boolean,
  user: User | {},
  tasks: Array<Task>,
}

class App extends Component<any, State> {
  state = {
    loggedIn: false,
    user: {},
    tasks: [],
  }

  async componentDidMount() {
    if (localStorage.getItem('user')) {
      const user = JSON.parse(localStorage.getItem('user') || '{}')
      const tasks = await http.get(`http://localhost:3008/tasks/${user.userId}`, `Bearer ${user.token}`)
      this.setState({
        loggedIn: true,
        user,
        tasks,
      }, () => console.log(this.state))
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
    const newTasks = [...tasks]
    const index = newTasks.findIndex(task => task._id === updatedTask._id)
    newTasks[index] = updatedTask
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

  render() {
    const { loggedIn, tasks, user } = this.state
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
                    />
                  ) : null}
                {loggedIn && (typeof user.userId === 'string') && (typeof user.username === 'string') && (typeof user.token === 'string') ? (
                  <React.Fragment>
                    <Toolbar
                      username={user.username}
                      logOut={this.logOut}
                    />
                    <AddTaskSection
                      userId={user.userId}
                      token={user.token}
                      addNewTask={this.addNewTask}
                    />
                    <ManageTaskSection
                      tasks={tasks}
                      token={user.token}
                      userId={user.userId}
                      clearTasks={this.clearTasks}
                      deleteTask={this.deleteTask}
                      updateTask={this.updateTask}
                    />
                  </React.Fragment>
                ) : null}
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default App
