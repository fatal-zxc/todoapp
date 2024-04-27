import React from 'react'

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

export default TaskList