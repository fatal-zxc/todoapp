import React, {Component} from "react"
import PropTypes from 'prop-types'

import {formatDistanceToNow} from 'date-fns'

import './task.css'

export default class Task extends Component   {

    static defaultProps = {
        done: false,
        hidden: false
    }

    static propTypes = {
        time: PropTypes.number,
        description: PropTypes.string,
        done: PropTypes.bool,
        hidden: PropTypes.bool,
        deleteTask: PropTypes.func,
        toggleDone: PropTypes.func,
        editTask: PropTypes.func
    }

    state = {
        edit: false,
        text: ''
    }

    editClick = () => {
        this.setState({
            edit: true,
            text: this.props.description
        })
    }

    editChange = (e) => {
        this.setState({
            text: e.target.value
        })
    }

    editTaskWrap = (e) => {
        e.preventDefault()
        if(this.state.text.trim() === '') return
        this.props.editTask(this.props.id, this.state.text)
        this.setState({
            edit: false,
            text: ''
        })
    }

    render(){
        const {time, description, done, hidden, deleteTask, toggleDone} = this.props
        let status = ''
        const {edit} = this.state

        if(done) {
            status = 'completed' 
        }

        if(edit) {
            status = 'editing'
        }

        if(hidden) {
            status += ' hidden'
        }

        return (
        <li className={status}>
            <div className='view'>
                <input className="toggle" type="checkbox" onChange={toggleDone} checked={done}/>
                <label onClick={toggleDone}>
                    <span className="description">{description}</span>
                    <span className="created">{formatDistanceToNow(time)}</span>
                </label>
                <button className="icon icon-edit" onClick={this.editClick}></button>
                <button className="icon icon-destroy" onClick={deleteTask}></button>
            </div>
            {status === 'editing' ? <form onSubmit={this.editTaskWrap}><input type="text" className="edit" onChange={this.editChange} value={this.state.text} /></form> : null}
        </li>
        )
    }
}