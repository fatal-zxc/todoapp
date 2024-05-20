import { useState, useEffect, useRef } from 'react'
import PropTypes from 'prop-types'
import { formatDistanceToNow } from 'date-fns'

import './task.css'

export default function Task({ createTime, description, done, hidden, deleteTask, toggleDone, id, editTask, timer }) {
  const [edit, setEdit] = useState(false)
  const [text, setText] = useState('')
  const [sec, setSec] = useState(timer)
  const [timerOn, setTimerOn] = useState(true)

  const editRef = useRef(null)

  const clickOutside = (e) => {
    if (e.target !== editRef.current) {
      setEdit(false)
      document.removeEventListener('mousedown', clickOutside)
    }
  }

  const editEsc = (e) => {
    if (e.key === 'Escape') {
      setEdit(false)
      document.removeEventListener('mousedown', clickOutside)
    }
  }

  const editClick = () => {
    document.addEventListener('mousedown', clickOutside)
    setEdit(true)
    setText(description)
  }

  const editChange = (e) => {
    setText(e.target.value)
  }

  const editTaskWrap = (e) => {
    e.preventDefault()
    if (text.trim() === '') return
    editTask(id, text)
    setEdit(false)
    setText('')
    document.removeEventListener('mousedown', clickOutside)
  }

  const timerUpdate = () => {
    setSec((prevSec) => prevSec + 1)
  }

  const pause = () => {
    if (!timerOn) return
    setTimerOn(false)
  }

  const play = () => {
    if (timerOn) return
    setTimerOn(true)
  }

  useEffect(() => {
    let timerInterval
    if (timerOn) {
      timerInterval = setInterval(timerUpdate, 1000)
    } else {
      clearInterval(timerInterval)
    }
    return () => clearInterval(timerInterval)
  }, [timerOn, sec])

  let status = ''

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
              onClick={play}
            />
            <button
              type="button"
              aria-label="pause"
              className="icon icon-pause"
              onClick={pause}
            />
            {` ${Math.floor(sec / 60)}:${sec % 60}`}
          </span>
          <span className="description">{formatDistanceToNow(createTime, { includeSeconds: true })}</span>
        </label>
        <button
          type="button"
          className="icon icon-edit"
          onClick={editClick}
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
        <form onSubmit={editTaskWrap}>
          <input
            ref={editRef}
            type="text"
            className="edit"
            onChange={editChange}
            onKeyDown={editEsc}
            value={text}
          />
        </form>
      ) : null}
    </li>
  )
}

Task.propTypes = {
  createTime: PropTypes.number.isRequired,
  description: PropTypes.string.isRequired,
  done: PropTypes.bool.isRequired,
  hidden: PropTypes.bool.isRequired,
  deleteTask: PropTypes.func.isRequired,
  toggleDone: PropTypes.func.isRequired,
  editTask: PropTypes.func.isRequired,
}
