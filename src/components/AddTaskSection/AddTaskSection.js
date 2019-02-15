/** @flow */

import React, { Component } from 'react'

import TitleHolder from '../TitleHolder'
import TextInputHolder from '../TextInputHolder'
import Button from '../Button'

import http from '../../utilities/http'

import type { AcceptsTaskReturnsNothing } from '../../types'

import './AddTaskSection.css'

type Props = {
  userId: string,
  token: string,
  addNewTask: AcceptsTaskReturnsNothing,
  addNotification: (status: string, msg: string) => void,
}

type State = {
  taskInput: string,
}

class AddTaskSection extends Component<Props, State> {
  state = {
    taskInput: '',
  }

  onChange = (e: any):void => this.setState({ [e.target.name]: e.target.value })

  addNewTaskHandler = async ():Promise<any> => {
    const {
      addNewTask, userId, token, addNotification,
    } = this.props
    const { taskInput } = this.state
    if (!taskInput) {
      addNotification('failure', 'You need to input some value')
      return
    }
    const res = await http.post('http://localhost:3008/tasks/', { caption: taskInput, userId }, `Bearer ${token}`)
    addNewTask(res)
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
