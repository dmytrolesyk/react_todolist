import React, { Component } from 'react'
import TitleHolder from '../TitleHolder'
import TextInputHolder from '../TextInputHolder'
import Button from '../Button'

import './AddTaskSection.css'

class AddTaskSection extends Component {
  state = {
    task: '',
  }

  onChange = e => this.setState({ [e.target.name]: e.target.value })

  onBtnClick = () => console.log(this.state)

  render() {
    const { task } = this.state
    return (
      <div className="add-task-section">
        <TitleHolder
          title="Add Tasks"
        />
        <TextInputHolder
          name="task"
          value={task}
          placeholder="Input your Task"
          onChange={this.onChange}
        />
        <Button
          color="btn-violet"
          size="btn-regular"
          text="Add Task"
          onClick={this.onBtnClick}
        />
      </div>
    )
  }
}

export default AddTaskSection
