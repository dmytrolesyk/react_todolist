import React, { Component } from 'react'
import Toolbar from './Toolbar'
import './App.css'
import AddTaskSection from './AddTaskSection/AddTaskSection'
import ManageTaskSection from './ManageTaskSection'

class App extends Component {
  state = {
    user: {
      id: 0,
      username: 'kevin',
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

  addNewTask = (newTask) => {
    this.setState(prevState => ({
      tasks: [
        ...prevState.tasks,
        newTask,
      ],
    }), () => console.log(this.state))
  }

  clearTasks = () => this.setState({ tasks: [] })

  updateTask = (updatedTask) => {
    const { tasks } = this.state
    const newTasks = [...tasks]
    const index = newTasks.findIndex(task => task.id === updatedTask.id)
    newTasks[index] = updatedTask
    this.setState({
      tasks: newTasks,
    })
  }

  deleteTask = (id) => {
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
                <AddTaskSection addNewTask={this.addNewTask} />
                <ManageTaskSection
                  tasks={tasks}
                  updateTask={this.updateTask}
                  clearTasks={this.clearTasks}
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
