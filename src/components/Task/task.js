import { Component } from 'react'
import PropTypes from 'prop-types'
import { formatDistanceToNow } from 'date-fns'

import './task.css'

export default class Task extends Component {
  constructor() {
    super()

    this.state = {
      edit: false,
      text: '',
    }

    this.editClick = () => {
      const { description } = this.state
      this.setState({
        edit: true,
        text: description,
      })
    }

    this.editChange = (e) => {
      this.setState({
        text: e.target.value,
      })
    }

    this.editTaskWrap = (e) => {
      e.preventDefault()
      const { text } = this.state
      if (text.trim() === '') return
      const { editTask, id } = this.props
      editTask(id, text)
      this.setState({
        edit: false,
        text: '',
      })
    }
  }

  render() {
    const { time, description, done, hidden, deleteTask, toggleDone, id } = this.props
    let status = ''
    const { edit, text } = this.state

    if (done) {
      status = 'completed'
    }

    if (edit) {
      status = 'editing'
    }

    if (hidden) {
      status += ' hidden'
    }

    return (
      <li className={status}>
        <div className="view">
          <input
            id={id}
            className="toggle"
            type="checkbox"
            onChange={toggleDone}
            checked={done}
          />
          <label htmlFor={id}>
            <span className="description">{description}</span>
            <span className="created">{formatDistanceToNow(time, { includeSeconds: true })}</span>
          </label>
          <button
            type="button"
            className="icon icon-edit"
            onClick={this.editClick}
            aria-label="edit"
          />
          <button
            type="button"
            className="icon icon-destroy"
            onClick={deleteTask}
            aria-label="destroy"
          />
        </div>
        {status === 'editing' ? (
          <form onSubmit={this.editTaskWrap}>
            <input
              type="text"
              className="edit"
              onChange={this.editChange}
              value={text}
            />
          </form>
        ) : null}
      </li>
    )
  }
}

Task.defaultProps = {
  done: false,
  hidden: false,
  deleteTask: () => {},
  toggleDone: () => {},
  editTask: () => {},
}

Task.propTypes = {
  time: PropTypes.number.isRequired,
  description: PropTypes.string.isRequired,
  done: PropTypes.bool,
  hidden: PropTypes.bool,
  deleteTask: PropTypes.func,
  toggleDone: PropTypes.func,
  editTask: PropTypes.func,
}
