/** @flow */

import React, { Component } from 'react'

import { connect } from 'react-redux'
import addNotificationAction from '../../actions/notificationsActions/addNotification'
import addTaskAction from '../../actions/boardActions/addTask'

import TitleHolder from '../TitleHolder'
import TextInputHolder from '../TextInputHolder'
import Button from '../Button'

import type { User, Board } from '../../types'

import './AddTaskSection.css'

type Props = {
  addTask: (caption: string, boardId: string, token: string) => any,
  user: User,
  addNotification: (status: string, msg: string) => any,
  currentBoard: Board,
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
    const {
      addTask,
      user,
      addNotification,
      currentBoard,
    } = this.props
    const { taskInput } = this.state
    if (!taskInput) {
      addNotification('failure', 'You need to input some value')
      return
    }
    addTask(taskInput, currentBoard.id, user.token)

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

const mapDispatchToProps = {
  addNotification: addNotificationAction,
  addTask: addTaskAction,
}

export default connect(null, mapDispatchToProps)(AddTaskSection)
