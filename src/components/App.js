import React, { Component } from 'react'
import './App.css'

class App extends Component {
  state = {
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
    const { tasks } = this.state
    return (
      <div className="wrapper">
        <div className="container">
          <div className="row">
            <div className="column">
              <div className="card">
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default App
