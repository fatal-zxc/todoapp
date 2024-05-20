import { useState } from 'react'

import './app.css'
import Footer from '../Footer'
import TaskList from '../TaskList'
import NewTaskForm from '../NewTaskForm'

export default function App() {
  const [data, setData] = useState([])
  const [mode, setMode] = useState('all')
  const [idCounter, setIdCounter] = useState(0)

  const deleteTask = (id) => {
    const idx = data.findIndex((el) => el.id === id)
    setData([...data.slice(0, idx), ...data.slice(idx + 1)])
  }

  const addTask = (text, time) => {
    const newTask = {
      description: text,
      done: false,
      createTime: Date.now(),
      hidden: false,
      id: idCounter,
      timer: time,
    }
    setIdCounter((prevIdCounter) => prevIdCounter + 1)
    setData([...data, newTask])
  }

  const filterAll = () => {
    const newData = []
    data.forEach((el) => newData.push({ ...el, hidden: false }))
    setData(newData)
    setMode('all')
  }

  const filterActive = () => {
    filterAll()
    const newData = []
    data.forEach((el) => {
      if (el.done) {
        newData.push({ ...el, hidden: true })
      } else {
        newData.push({ ...el })
      }
    })
    setData(newData)
    setMode('active')
  }

  const filterCompleted = () => {
    filterAll()
    const newData = []
    data.forEach((el) => {
      if (!el.done) {
        newData.push({ ...el, hidden: true })
      } else {
        newData.push({ ...el })
      }
    })
    setData(newData)
    setMode('completed')
  }

  const editTask = (id, text) => {
    const idx = data.findIndex((el) => el.id === id)
    const newTask = { ...data[idx], description: text }
    setData([...data.slice(0, idx), newTask, ...data.slice(idx + 1)])
  }

  const toggleDone = (id) => {
    const idx = data.findIndex((el) => el.id === id)
    const newTask = { ...data[idx], done: !data[idx].done }
    setData([...data.slice(0, idx), newTask, ...data.slice(idx + 1)])
    if (mode === 'active') {
      filterActive()
    }
    if (mode === 'completed') {
      filterCompleted()
    }
  }

  const clearCompleted = () => {
    const newData = []
    data.forEach((el) => {
      if (!el.done) newData.push(el)
    })
    setData(newData)
  }

  const todoCount = data.filter((el) => !el.done).length

  return (
    <section className="todoapp">
      <header className="header">
        <h1>todos</h1>
        <NewTaskForm addTask={addTask} />
      </header>
      <section className="main">
        <TaskList
          todos={data}
          deleteTask={deleteTask}
          toggleDone={toggleDone}
          editTask={editTask}
        />
        <Footer
          todoCount={todoCount}
          filterAll={filterAll}
          filterActive={filterActive}
          filterCompleted={filterCompleted}
          clearCompleted={clearCompleted}
        />
      </section>
    </section>
  )
}
