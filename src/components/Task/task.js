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
      sec: 0,
      timerOn: false,
    }

    this.clickOutside = (e) => {
      if (e.target !== this.editRef) {
        this.setState({
          edit: false,
        })
        document.removeEventListener('mousedown', this.clickOutside)
      }
    }

    this.editEsc = (e) => {
      if (e.key === 'Escape') {
        this.setState({
          edit: false,
        })
        document.removeEventListener('mousedown', this.clickOutside)
      }
    }

    this.editClick = () => {
      const { description } = this.props
      document.addEventListener('mousedown', this.clickOutside)
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
      document.removeEventListener('mousedown', this.clickOutside)
    }

    this.timerUpdate = () => {
      const { sec } = this.state
      this.setState({
        sec: sec + 1,
      })
    }

    this.pause = () => {
      const { timerOn } = this.state
      if (!timerOn) return
      this.setState({
        timerOn: false,
      })
      clearInterval(this.timerInterval)
    }

    this.play = () => {
      const { timerOn } = this.state
      if (timerOn) return
      this.setState({
        timerOn: true,
      })
      this.timerInterval = setInterval(this.timerUpdate, 1000)
    }
  }

  componentDidMount() {
    const { timer } = this.props
    this.setState({
      sec: timer,
      timerOn: true,
    })
    this.timerInterval = setInterval(this.timerUpdate, 1000)
  }

  componentWillUnmount() {
    clearInterval(this.timerInterval)
  }

  render() {
    const { createTime, description, done, hidden, deleteTask, toggleDone, id } = this.props
    let status = ''
    const { edit, text, sec } = this.state

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
            <span className="title">{description}</span>
            <span className="description">
              <button
                type="button"
                aria-label="play"
                className="icon icon-play"
                onClick={this.play}
              />
              <button
                type="button"
                aria-label="pause"
                className="icon icon-pause"
                onClick={this.pause}
              />
              {` ${Math.floor(sec / 60)}:${sec % 60}`}
            </span>
            <span className="description">{formatDistanceToNow(createTime, { includeSeconds: true })}</span>
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
              ref={(editRef) => {
                this.editRef = editRef
              }}
              type="text"
              className="edit"
              onChange={this.editChange}
              onKeyDown={this.editEsc}
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
  createTime: PropTypes.number.isRequired,
  description: PropTypes.string.isRequired,
  done: PropTypes.bool,
  hidden: PropTypes.bool,
  deleteTask: PropTypes.func,
  toggleDone: PropTypes.func,
  editTask: PropTypes.func,
}
