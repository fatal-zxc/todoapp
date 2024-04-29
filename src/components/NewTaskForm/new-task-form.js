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
      const { text } = this.state
      const { addTask } = this.props
      if (text.trim() === '') return
      addTask(text)
      this.setState({
        text: '',
      })
    }
  }

  render() {
    const { text } = this.state
    return (
      <form onSubmit={this.submitTask}>
        <input
          className="new-todo"
          placeholder="What needs to be done?"
          value={text}
          onChange={this.changeText}
        />
      </form>
    )
  }
}

NewTaskForm.defaultProps = {
  addTask: () => {},
}

NewTaskForm.propTypes = {
  addTask: PropTypes.func,
}
