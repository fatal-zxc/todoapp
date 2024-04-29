import PropTypes from 'prop-types'

import Task from '../Task'
import './task-list.css'

function TaskList(props) {
  const { todos, deleteTask, toggleDone, editTask } = props
  const tasks = todos.map((taskData) => (
    <Task
      description={taskData.description}
      done={taskData.done}
      time={taskData.time}
      hidden={taskData.hidden}
      id={taskData.id}
      key={taskData.id}
      deleteTask={() => deleteTask(taskData.id)}
      toggleDone={() => toggleDone(taskData.id)}
      editTask={editTask}
    />
  ))

  return <ul className="todo-list">{tasks}</ul>
}

TaskList.defaultProps = {
  deleteTask: () => {},
  toggleDone: () => {},
  editTask: () => {},
}

TaskList.propTypes = {
  todos: PropTypes.arrayOf(PropTypes.objectOf).isRequired,
  deleteTask: PropTypes.func,
  toggleDone: PropTypes.func,
  editTask: PropTypes.func,
}

export default TaskList
