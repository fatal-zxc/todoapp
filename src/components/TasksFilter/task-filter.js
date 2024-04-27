import React, {Component} from 'react'

import './task-filter.css'

export default class TaskFilter extends Component {

    state = {
        all: 'selected',
        active: '',
        completed: ''
    }

    filterAllWrap = () => {
        this.setState(() => {
            return {
                all: 'selected',
                active: '',
                completed: ''
            }
        })
        this.props.filterAll()
    }

    filterActiveWrap = () => {
        this.setState(() => {
            return {
                all: '',
                active: 'selected',
                completed: ''
            }
        })
        this.props.filterActive()
    }

    render() {
        return (
            <ul className="filters">
                <li>
                    <button className={this.state.all} onClick={this.filterAllWrap}>All</button>
                </li>
                <li>
                    <button className={this.state.active} onClick={this.filterActiveWrap}>Active</button>
                </li>
                <li>
                    <button className={this.state.completed} >Completed</button>
                </li>
            </ul>
        )
    }
}