import React, {Component} from 'react'
import PropTypes from 'prop-types'

import './task-filter.css'

export default class TaskFilter extends Component {

    state = {
        all: 'selected',
        active: '',
        completed: ''
    }

    static propTypes = {
        filterAll: PropTypes.func,
        filterActive: PropTypes.func,
        filterCompleted: PropTypes.func
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

    filterCompletedWrap = () => {
        this.setState(() => {
            return {
                all: '',
                active: '',
                completed: 'selected'
            }
        })
        this.props.filterCompleted()
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
                    <button className={this.state.completed} onClick={this.filterCompletedWrap}>Completed</button>
                </li>
            </ul>
        )
    }
}