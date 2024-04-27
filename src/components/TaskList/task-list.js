import React from 'react'
import PropTypes from 'prop-types'

import Task from '../Task'
import './task-list.css'

const TaskList = ({ todos, deleteTask, toggleDone}) => {

    const tasks = todos.map((taskData) => {
        const {id, ...data} = taskData
        return (
            <Task {...data} key={id} deleteTask={() => deleteTask(id)} toggleDone={() => toggleDone(id)}/>
        )
    })

    return (
        <ul className="todo-list">
            {tasks}
        </ul>
    )
}

TaskList.propTypes = {
    todos: PropTypes.arrayOf(PropTypes.object),
    deleteTask: PropTypes.func,
    toggleDone: PropTypes.func
}

export default TaskList