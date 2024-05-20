import PropTypes from 'prop-types'

import Task from '../Task'
import './task-list.css'

function TaskList({ todos, deleteTask, toggleDone, editTask }) {
  const tasks = todos.map((taskData) => (
    <Task
      description={taskData.description}
      done={taskData.done}
      createTime={taskData.createTime}
      hidden={taskData.hidden}
      id={taskData.id}
      key={taskData.id}
      timer={taskData.timer}
      deleteTask={() => deleteTask(taskData.id)}
      toggleDone={() => toggleDone(taskData.id)}
      editTask={editTask}
    />
  ))

  return <ul className="todo-list">{tasks}</ul>
}

TaskList.propTypes = {
  todos: PropTypes.arrayOf(PropTypes.objectOf).isRequired,
  deleteTask: PropTypes.func.isRequired,
  toggleDone: PropTypes.func.isRequired,
  editTask: PropTypes.func.isRequired,
}

export default TaskList
