import PropTypes from 'prop-types'

import './footer.css'
import TaskFilter from '../TasksFilter'

function Footer(props) {
  const { todoCount, filterAll, filterActive, filterCompleted, clearCompleted } = props
  return (
    <footer className="footer">
      <span className="todo-count">
        {todoCount}
        items left
      </span>
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

Footer.defaultProps = {
  todoCount: 0,
  filterAll: () => {},
  filterActive: () => {},
  filterCompleted: () => {},
  clearCompleted: () => {},
}

Footer.propTypes = {
  todoCount: PropTypes.number,
  filterAll: PropTypes.func,
  filterActive: PropTypes.func,
  filterCompleted: PropTypes.func,
  clearCompleted: PropTypes.func,
}

export default Footer
