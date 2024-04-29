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
      this.setState({
        all: 'selected',
        active: '',
        completed: '',
      })
      const { filterAll } = this.props
      filterAll()
    }

    this.filterActiveWrap = () => {
      this.setState({
        all: '',
        active: 'selected',
        completed: '',
      })
      const { filterActive } = this.props
      filterActive()
    }

    this.filterCompletedWrap = () => {
      this.setState({
        all: '',
        active: '',
        completed: 'selected',
      })
      const { filterCompleted } = this.props
      filterCompleted()
    }
  }

  render() {
    const { all, active, completed } = this.state
    return (
      <ul className="filters">
        <li>
          <button
            type="button"
            className={all}
            onClick={this.filterAllWrap}
          >
            All
          </button>
        </li>
        <li>
          <button
            type="button"
            className={active}
            onClick={this.filterActiveWrap}
          >
            Active
          </button>
        </li>
        <li>
          <button
            type="button"
            className={completed}
            onClick={this.filterCompletedWrap}
          >
            Completed
          </button>
        </li>
      </ul>
    )
  }
}

TaskFilter.defaultProps = {
  filterAll: () => {},
  filterActive: () => {},
  filterCompleted: () => {},
}

TaskFilter.propTypes = {
  filterAll: PropTypes.func,
  filterActive: PropTypes.func,
  filterCompleted: PropTypes.func,
}
