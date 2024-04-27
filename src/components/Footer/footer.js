import React from "react";
import PropTypes from 'prop-types'

import './footer.css'
import TaskFilter from "../TasksFilter";

const Footer = ({todoCount, filterAll, filterActive, filterCompleted, clearCompleted}) => {
    return (
    <footer className="footer">
        <span className="todo-count">{todoCount} items left</span>
        <TaskFilter filterActive={filterActive} filterAll={filterAll} filterCompleted={filterCompleted}/>
        <button className="clear-completed" onClick={clearCompleted}>Clear completed</button>
    </footer>
    )
}

Footer.propTypes = {
    todoCount: PropTypes.number,
    filterAll: PropTypes.func,
    filterActive: PropTypes.func,
    filterCompleted: PropTypes.func,
    clearCompleted: PropTypes.func
}

export default Footer