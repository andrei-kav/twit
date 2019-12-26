import React, {Component} from "react";
// import { Button } from 'reactstrap';

import "./post-status-filter.css";

export default class PostStatusFiler extends Component {
    constructor(props) {
        super(props);
        this.buttons = [
            {name: 'all', label: 'All'},
            {name: 'important', label: 'Important'},
            {name: 'liked', label: 'Liked'}
        ]

    }
    render() {
        const buttons = this.buttons.map(({name, label}) => {
            const {filter, onFilterSelect} = this.props;
            const active = filter === name;
            const clazz = active ? 'btn-info' : 'btn-outline-secondary';
            return (
                <button key={name}
                        type='button'
                        className={`btn ${clazz}`}
                        onClick={() => onFilterSelect(name)}>{label}</button>
            )
        });
        return (
            <div className="btn-group">
                {/*<Button color='info'>All</Button>*/}
                {/*<Button color='outline-secondary'>Liked</Button>*/}
                {buttons}
            </div>
        )
    }
}
