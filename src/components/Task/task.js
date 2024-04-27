import React, {Component} from "react"

import './task.css'

export default class Task extends Component   {

    state = {
        edit: false
    }

    editClick = () => {
        this.setState(({edit}) => {
            return {
                edit: !edit
            }
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
                <input className="toggle" type="checkbox" onChange={toggleDone}/>
                <label  >
                    <span className="description">{description}</span>
                    <span className="created">{time}</span>
                </label>
                <button className="icon icon-edit" onClick={this.editClick}></button>
                <button className="icon icon-destroy" onClick={deleteTask}></button>
            </div>
            {status === 'editing' ? <input type="text" className="edit" defaultValue={description} /> : null}
        </li>
        )
    }
}