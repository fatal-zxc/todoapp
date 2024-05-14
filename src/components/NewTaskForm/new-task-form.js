import { Component } from 'react'
import PropTypes from 'prop-types'

import './new-task-form.css'

export default class NewTaskForm extends Component {
  constructor() {
    super()

    this.state = {
      text: '',
      min: '',
      sec: '',
    }

    this.changeText = (e) => {
      this.setState({
        text: e.target.value,
      })
    }

    this.changeMin = (e) => {
      if (Number.isNaN(Number(e.target.value)) || Number(e.target.value) >= 100) return
      this.setState({
        min: Number(e.target.value),
      })
    }

    this.changeSec = (e) => {
      if (Number.isNaN(Number(e.target.value)) || Number(e.target.value) >= 100) return
      this.setState({
        sec: Number(e.target.value),
      })
    }

    this.keyDown = (e) => {
      if (e.key === 'Enter') {
        this.submitTask(e)
      }
    }

    this.submitTask = (e) => {
      e.preventDefault()
      const { text, min, sec } = this.state
      const { addTask } = this.props
      const timer = Number(min) * 60 + Number(sec)
      if (text.trim() === '') return
      addTask(text, timer)
      this.setState({
        text: '',
        min: '',
        sec: '',
      })
    }
  }

  render() {
    const { text, min, sec } = this.state
    return (
      <form
        className="new-todo-form"
        onSubmit={this.submitTask}
      >
        <input
          type="text"
          className="new-todo"
          placeholder="Task"
          value={text}
          onChange={this.changeText}
          onKeyDown={this.keyDown}
        />
        <input
          type="text"
          className="new-todo-form__timer"
          placeholder="Min"
          value={min}
          onChange={this.changeMin}
          onKeyDown={this.keyDown}
        />
        <input
          type="text"
          className="new-todo-form__timer"
          placeholder="Sec"
          value={sec}
          onChange={this.changeSec}
          onKeyDown={this.keyDown}
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
