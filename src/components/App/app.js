import { Component } from 'react'

import './app.css'
import Footer from '../Footer'
import TaskList from '../TaskList'
import NewTaskForm from '../NewTaskForm'

export default class App extends Component {
  constructor() {
    super()

    this.state = {
      data: [],
      mode: 'all',
    }

    this.idCounter = 0

    this.deleteTask = (id) => {
      this.setState(({ data }) => {
        const idx = data.findIndex((el) => el.id === id)
        return {
          data: [...data.slice(0, idx), ...data.slice(idx + 1)],
        }
      })
    }

    this.addTask = (text, time) => {
      this.setState(({ data }) => {
        const newTask = {
          description: text,
          done: false,
          createTime: Date.now(),
          hidden: false,
          id: this.idCounter,
          timer: time,
        }
        this.idCounter += 1
        return {
          data: [...data, newTask],
        }
      })
    }

    this.editTask = (id, text) => {
      this.setState(({ data }) => {
        const idx = data.findIndex((el) => el.id === id)
        const newTask = { ...data[idx], description: text }
        return {
          data: [...data.slice(0, idx), newTask, ...data.slice(idx + 1)],
        }
      })
    }

    this.toggleDone = (id) => {
      const { mode } = this.state
      this.setState(({ data }) => {
        const idx = data.findIndex((el) => el.id === id)
        const newTask = { ...data[idx], done: !data[idx].done }
        return {
          data: [...data.slice(0, idx), newTask, ...data.slice(idx + 1)],
        }
      })
      if (mode === 'active') {
        this.filterActive()
      }
      if (mode === 'completed') {
        this.filterCompleted()
      }
    }

    this.filterAll = () => {
      this.setState(({ data }) => {
        const newData = []
        data.forEach((el) => newData.push({ ...el, hidden: false }))
        return {
          data: newData,
          mode: 'all',
        }
      })
    }

    this.filterActive = () => {
      this.filterAll()
      this.setState(({ data }) => {
        const newData = []
        data.forEach((el) => {
          if (el.done) {
            newData.push({ ...el, hidden: true })
          } else {
            newData.push({ ...el })
          }
        })
        return {
          data: newData,
          mode: 'active',
        }
      })
    }

    this.filterCompleted = () => {
      this.filterAll()
      this.setState(({ data }) => {
        const newData = []
        data.forEach((el) => {
          if (!el.done) {
            newData.push({ ...el, hidden: true })
          } else {
            newData.push({ ...el })
          }
        })
        return {
          data: newData,
          mode: 'completed',
        }
      })
    }

    this.clearCompleted = () => {
      const { data } = this.state
      data.forEach((task) => {
        if (task.done) {
          this.deleteTask(task.id)
        }
      })
    }
  }

  render() {
    const { data } = this.state
    const todoCount = data.filter((el) => !el.done).length

    return (
      <section className="todoapp">
        <header className="header">
          <h1>todos</h1>
          <NewTaskForm addTask={this.addTask} />
        </header>
        <section className="main">
          <TaskList
            todos={data}
            deleteTask={this.deleteTask}
            toggleDone={this.toggleDone}
            editTask={this.editTask}
          />
          <Footer
            todoCount={todoCount}
            filterAll={this.filterAll}
            filterActive={this.filterActive}
            filterCompleted={this.filterCompleted}
            clearCompleted={this.clearCompleted}
          />
        </section>
      </section>
    )
  }
}
