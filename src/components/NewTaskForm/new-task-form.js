import React, {Component} from 'react'

import './new-task-form.css'

export default class NewTaskForm extends Component  {

    state = {
        text: ''
    }

    changeText = (e) => {
        this.setState({
            text: e.target.value
        })
    }

    submitTask = (e) => {
        e.preventDefault()
        this.props.addTask(this.state.text)
        this.setState({
            text: ''
        })
    }

    render() {
        return (
            <form onSubmit={this.submitTask}>
                <input className="new-todo" placeholder="What needs to be done?" value={this.state.text} onChange={this.changeText} autoFocus />
            </form>
        )
}
}