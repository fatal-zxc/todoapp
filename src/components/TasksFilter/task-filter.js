import { Component } from 'react'
import PropTypes from 'prop-types'

import './task-filter.css'

export default class TaskFilter extends Component {
  constructor() {
    super()

    this.state = {
      all: 'selected',
      active: '',
      completed: '',
    }

    this.filterAllWrap = () => {
      this.setState(() => {
        return {
          all: 'selected',
          active: '',
          completed: '',
        }
      })
      this.props.filterAll()
    }

    this.filterActiveWrap = () => {
      this.setState(() => {
        return {
          all: '',
          active: 'selected',
          completed: '',
        }
      })
      this.props.filterActive()
    }

    this.filterCompletedWrap = () => {
      this.setState(() => {
        return {
          all: '',
          active: '',
          completed: 'selected',
        }
      })
      this.props.filterCompleted()
    }
  }

  render() {
    return (
      <ul className="filters">
        <li>
          <button className={this.state.all} onClick={this.filterAllWrap}>
            All
          </button>
        </li>
        <li>
          <button className={this.state.active} onClick={this.filterActiveWrap}>
            Active
          </button>
        </li>
        <li>
          <button className={this.state.completed} onClick={this.filterCompletedWrap}>
            Completed
          </button>
        </li>
      </ul>
    )
  }
}

TaskFilter.propTypes = {
  filterAll: PropTypes.func,
  filterActive: PropTypes.func,
  filterCompleted: PropTypes.func,
}
