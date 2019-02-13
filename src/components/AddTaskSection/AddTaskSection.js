/** @flow */

import React, { Component } from 'react'
import uuid from 'uuid'
import TitleHolder from '../TitleHolder'
import TextInputHolder from '../TextInputHolder'
import Button from '../Button'

import type { Task, AcceptsTaskReturnsNothing } from '../../types'

import './AddTaskSection.css'

type Props = {
  addNewTask: AcceptsTaskReturnsNothing
}

type State = {
  taskInput: string,
}

class AddTaskSection extends Component<Props, State> {
  state = {
    taskInput: '',
  }

  onChange = (e: any):void => this.setState({ [e.target.name]: e.target.value })

  addNewTaskHandler = ():void => {
    const { addNewTask } = this.props
    const { taskInput } = this.state
    if (!taskInput) {
      alert('You need to input some value')
      return
    }
    const newTask: Task = {
      id: uuid(),
      caption: taskInput,
      completed: false,
    }
    addNewTask(newTask)
    this.setState({
      taskInput: '',
    })
  }

  render() {
    const { taskInput } = this.state
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
      </div>
    )
  }
}

export default AddTaskSection
