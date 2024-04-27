import React from "react";

import './footer.css'
import TaskFilter from "../TasksFilter";

const Footer = ({todoCount, filterAll, filterActive}) => {
    return (
    <footer className="footer">
        <span className="todo-count">{todoCount} items left</span>
        <TaskFilter filterActive={filterActive} filterAll={filterAll}/>
        <button className="clear-completed">Clear completed</button>
    </footer>
    )
}

export default Footer