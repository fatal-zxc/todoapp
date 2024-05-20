import { useState } from 'react'
import PropTypes from 'prop-types'

import './new-task-form.css'

export default function NewTaskForm({ addTask }) {
  const [text, setText] = useState('')
  const [min, setMin] = useState('')
  const [sec, setSec] = useState('')

  const changeText = (e) => {
    setText(e.target.value)
  }

  const changeMin = (e) => {
    if (Number.isNaN(Number(e.target.value)) || Number(e.target.value) >= 100) return
    setMin(Number(e.target.value))
  }

  const changeSec = (e) => {
    if (Number.isNaN(Number(e.target.value)) || Number(e.target.value) >= 100) return
    setSec(Number(e.target.value))
  }

  const submitTask = (e) => {
    e.preventDefault()
    const timer = Number(min) * 60 + Number(sec)
    if (text.trim() === '') return
    addTask(text, timer)
    setText('')
    setMin('')
    setSec('')
  }

  const keyDown = (e) => {
    if (e.key === 'Enter') {
      submitTask(e)
    }
  }

  return (
    <form
      className="new-todo-form"
      onSubmit={submitTask}
    >
      <input
        type="text"
        className="new-todo"
        placeholder="Task"
        value={text}
        onChange={changeText}
        onKeyDown={keyDown}
      />
      <input
        type="text"
        className="new-todo-form__timer"
        placeholder="Min"
        value={min}
        onChange={changeMin}
        onKeyDown={keyDown}
      />
      <input
        type="text"
        className="new-todo-form__timer"
        placeholder="Sec"
        value={sec}
        onChange={changeSec}
        onKeyDown={keyDown}
      />
    </form>
  )
}

NewTaskForm.propTypes = {
  addTask: PropTypes.func.isRequired,
}
