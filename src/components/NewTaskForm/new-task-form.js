import { Component } from 'react'
import PropTypes from 'prop-types'

import './new-task-form.css'

export default class NewTaskForm extends Component {
  constructor() {
    super()

    this.state = {
      text: '',
    }

    this.changeText = (e) => {
      this.setState({
        text: e.target.value,
      })
    }

    this.submitTask = (e) => {
      e.preventDefault()
      if (this.state.text.trim() === '') return
      this.props.addTask(this.state.text)
      this.setState({
        text: '',
      })
    }
  }

  render() {
    return (
      <form onSubmit={this.submitTask}>
        <input
          className="new-todo"
          placeholder="What needs to be done?"
          value={this.state.text}
          onChange={this.changeText}
          autoFocus
        />
      </form>
    )
  }
}

NewTaskForm.propTypes = {
  addTask: PropTypes.func,
}
