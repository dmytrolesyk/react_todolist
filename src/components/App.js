/** @flow */

import React, { Component } from 'react'
import Toolbar from './Toolbar'

import AddTaskSection from './AddTaskSection/AddTaskSection'
import ManageTaskSection from './ManageTaskSection'

import type { User, Task, AcceptsTaskReturnsNothing } from '../types'

import './App.css'

type State = {
  user: User,
  tasks: Array<Task>,
}

class App extends Component<any, State> {
  state = {
    user: {
      id: '0',
      username: 'kevin',
      token: 'tkn123',
    },
    tasks: [
      {
        id: '0',
        caption: 'task 1',
        completed: true,
      },
      {
        id: '1',
        caption: 'task 2',
        completed: false,
      },
      {
        id: '2',
        caption: 'task 3',
        completed: false,
      },
    ],
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
    const index = newTasks.findIndex(task => task.id === updatedTask.id)
    newTasks[index] = updatedTask
    this.setState({
      tasks: newTasks,
    })
  }

  deleteTask = (id: string):void => {
    const { tasks } = this.state
    const newTasks = tasks.filter(task => task.id !== id)
    this.setState({
      tasks: newTasks,
    })
  }

  render() {
    const { tasks, user } = this.state
    return (
      <div className="wrapper">
        <div className="container">
          <div className="row">
            <div className="column">
              <div className="card">
                <Toolbar
                  username={user.username}
                />
                <AddTaskSection
                  addNewTask={this.addNewTask}
                />
                <ManageTaskSection
                  tasks={tasks}
                  clearTasks={this.clearTasks}
                  deleteTask={this.deleteTask}
                  updateTask={this.updateTask}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default App
