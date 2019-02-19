/** @flow */

import React, { Component } from 'react'

import { connect } from 'react-redux'

import LoginForm from './LoginForm'
import Toolbar from './Toolbar'
import AddTaskSection from './AddTaskSection/AddTaskSection'
import ManageTaskSection from './ManageTaskSection'
import NotificationPortal from './NotificationPortal'

import type {
  NotificationType, User, Task, AcceptsTaskReturnsNothing,
} from '../types'

import './App.css'

type State = {
  tasks: Array<Task>,
}

class App extends Component<any, State> {
  state = {
    tasks: [],
  }

  componentDidMount() {
    const { dispatch } = this.props
    if (localStorage.getItem('user')) {
      dispatch({ type: 'LOG_IN', payload: JSON.parse(localStorage.getItem('user')) })
    }
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

  render() {
    const {
      tasks,
    } = this.state
    const { notifications, user } = this.props
    console.log(user)
    return (
      <div className="wrapper">
        <div className="container">
          <div className="row">
            <div className="column">
              <div className="card">
                {!user
                  ? (
                    <LoginForm />
                  ) : null}
                {user ? (
                  <>
                    <Toolbar />
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

const mapStateToProps = state => ({
  user: state.user,
  notifications: state.notifications,
})

export default connect(mapStateToProps, null)(App)
