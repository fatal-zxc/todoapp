import React from "react";
import ReactDOM from 'react-dom/client'

import './index.css'
import Footer from './components/Footer'
import TaskList from './components/TaskList'
import NewTaskForm from './components/NewTaskForm'

const App = () => {
    const data = [
        {status: 'completed', description: 'Completed task', time: 'created 17 seconds ago', id: 0},
        {status: 'editing', description: 'Editing task', time: 'created 5 minutes ago', id: 1},
        {description: 'Active task', time: 'created 5 minutes ago', id: 2},
    ]

    return (
        <section className="todoapp">
            <header className="header">
                <h1>todos</h1>
                <NewTaskForm />
            </header>
            <section className="main">
                <TaskList todos={data}/>
                <Footer />
            </section>
        </section>
    )
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />)
