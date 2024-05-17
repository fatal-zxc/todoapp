import { Component } from 'react'
import PropTypes from 'prop-types'

import './task-filter.css'

export default class TaskFilter extends Component {
  constructor() {
    super()

    this.state = {
      mode: 'all',
    }

    this.filterAllWrap = () => {
      this.setState({
        mode: 'all',
      })
      const { filterAll } = this.props
      filterAll()
    }

    this.filterActiveWrap = () => {
      this.setState({
        mode: 'active',
      })
      const { filterActive } = this.props
      filterActive()
    }

    this.filterCompletedWrap = () => {
      this.setState({
        mode: 'completed',
      })
      const { filterCompleted } = this.props
      filterCompleted()
    }
  }

  render() {
    const { mode } = this.state
    return (
      <ul className="filters">
        <li>
          <button
            type="button"
            className={mode === 'all' ? 'selected' : null}
            onClick={this.filterAllWrap}
          >
            All
          </button>
        </li>
        <li>
          <button
            type="button"
            className={mode === 'active' ? 'selected' : null}
            onClick={this.filterActiveWrap}
          >
            Active
          </button>
        </li>
        <li>
          <button
            type="button"
            className={mode === 'completed' ? 'selected' : null}
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
