import { useState } from 'react'
import PropTypes from 'prop-types'

import './task-filter.css'

export default function TaskFilter({ filterActive, filterAll, filterCompleted }) {
  const [mode, setMode] = useState('all')

  const filterAllWrap = () => {
    setMode('all')
    filterAll()
  }

  const filterActiveWrap = () => {
    setMode('active')
    filterActive()
  }

  const filterCompletedWrap = () => {
    setMode('completed')
    filterCompleted()
  }

  return (
    <ul className="filters">
      <li>
        <button
          type="button"
          className={mode === 'all' ? 'selected' : null}
          onClick={filterAllWrap}
        >
          All
        </button>
      </li>
      <li>
        <button
          type="button"
          className={mode === 'active' ? 'selected' : null}
          onClick={filterActiveWrap}
        >
          Active
        </button>
      </li>
      <li>
        <button
          type="button"
          className={mode === 'completed' ? 'selected' : null}
          onClick={filterCompletedWrap}
        >
          Completed
        </button>
      </li>
    </ul>
  )
}

TaskFilter.propTypes = {
  filterAll: PropTypes.func.isRequired,
  filterActive: PropTypes.func.isRequired,
  filterCompleted: PropTypes.func.isRequired,
}
