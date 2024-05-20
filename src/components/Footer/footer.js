import PropTypes from 'prop-types'

import './footer.css'
import TaskFilter from '../TasksFilter'

export default function Footer({ todoCount, filterAll, filterActive, filterCompleted, clearCompleted }) {
  return (
    <footer className="footer">
      <span className="todo-count">{todoCount} items left</span>
      <TaskFilter
        filterActive={filterActive}
        filterAll={filterAll}
        filterCompleted={filterCompleted}
      />
      <button
        type="button"
        className="clear-completed"
        onClick={clearCompleted}
      >
        Clear completed
      </button>
    </footer>
  )
}

Footer.propTypes = {
  todoCount: PropTypes.number.isRequired,
  filterAll: PropTypes.func.isRequired,
  filterActive: PropTypes.func.isRequired,
  filterCompleted: PropTypes.func.isRequired,
  clearCompleted: PropTypes.func.isRequired,
}
