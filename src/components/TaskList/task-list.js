import React from 'react'

import Task from '../Task'
import './task-list.css'

const TaskList = ({ todos }) => {

    const tasks = todos.map((taskData) => {
        const {id, status, ...data} = taskData
        return (
        <li className={status} key={id}>
            <Task {...data}/>
            {status === 'editing' ? <input type="text" className="edit" defaultValue={taskData.description} /> : null}
        </li>
        )
    })

    return (
        <ul className="todo-list">
            {tasks}
        </ul>
    )
}

export default TaskList