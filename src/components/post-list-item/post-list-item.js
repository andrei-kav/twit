import React, {Component} from "react";

import "./post-list-item.sass";

class DateCreating {
    constructor() {
        let date = new Date();
        this._date = [date.getDate(), this._isLessTen(date.getMonth() + 1), date.getFullYear()].join('/');
        this._time = [this._isLessTen(date.getHours()), this._isLessTen(date.getMinutes())].join(':');
    }
    _isLessTen = (arg) => {
        return arg < 10
            ? '0' + arg
            : arg;
    };
    getFullDate() {
        return this._time + ' ' + this._date;
    }
}

export default class PostListItem extends Component {
    constructor(props) {
        super(props);
        this.state = {
            // important: props.important,
            // like: false,
            label: props.label,
            date: new DateCreating().getFullDate()
        };
        this.onEdit = this.onEdit.bind(this);
    }

    onEdit() {
        let editPost = prompt('Add changes', this.state.label);
        if (editPost) {
            this.setState(({label}) => ({
                label: editPost,
                date: new DateCreating().getFullDate()
            }))
        }
    }

    render() {
        const {onDelete, onToggleImportant, onToggleLike, important, liked} = this.props;
        const {label, date} = this.state;
        let classNames = 'app-list-item d-flex justify-content-between';
        if (important) {
            classNames += ' important';
        }
        if (liked) {
            classNames += ' like';
        }
        return (
            <div className={classNames}>
                <div>
                    <span className="app-list-item-label"
                          onClick={onToggleLike}>
                        {label}
                    </span>
                    <span className="time-date">{date}</span>
                </div>
                <div className="d-flex justify-content-center align-items-center">
                    <button type="button"
                            className="btn-star btn-sm"
                            onClick={onToggleImportant}>
                        <i className="fa fa-star"></i>
                    </button>
                    <button type="button"
                            className="btn-wrench btn-sm"
                            onClick={this.onEdit}>
                        <i className="fa fa-wrench"></i>
                    </button>
                    <button type="button"
                            className="btn-trash btn-sm"
                            onClick={onDelete}>
                        <i className="fa fa-trash-o"></i>
                    </button>
                    <i className="fa fa-heart"></i>
                </div>
            </div>
        )
    }
}