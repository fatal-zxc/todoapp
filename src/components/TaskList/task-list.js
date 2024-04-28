import React from 'react'
import PropTypes from 'prop-types'

import Task from '../Task'
import './task-list.css'

const TaskList = ({ todos, deleteTask, toggleDone, editTask}) => {

    const tasks = todos.map((taskData) => {
        return (
            <Task {...taskData} key={taskData.id} deleteTask={() => deleteTask(taskData.id)} toggleDone={() => toggleDone(taskData.id)} editTask={editTask}/>
        )
    })

    return (
        <ul className="todo-list">
            {tasks}
        </ul>
    )
}

TaskList.propTypes = {
    todos: PropTypes.arrayOf(PropTypes.object).isRequired,
    deleteTask: PropTypes.func,
    toggleDone: PropTypes.func,
    editTask: PropTypes.func
}

export default TaskList