import React, { Component } from 'react'
import Toolbar from './Toolbar'
import './App.css'
import AddTaskSection from './AddTaskSection/AddTaskSection'

class App extends Component {
  state = {
    user: {
      id: 0,
      username: 'kevin',
    },
    tasks: [
      {
        id: 0,
        caption: 'task 1',
        completed: false,
      },
      {
        id: 0,
        caption: 'task 1',
        completed: false,
      },
      {
        id: 0,
        caption: 'task 1',
        completed: false,
      },
    ],
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
                <AddTaskSection />
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default App
