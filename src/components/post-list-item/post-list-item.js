import React, {Component} from "react";

import "./post-list-item.sass";

class DateCreating {
    constructor() {
        let date = new Date();
        this._date = [date.getDate(), date.getMonth() + 1, date.getFullYear()].join('/');
        let minutes = date.getMinutes();
        if (minutes < 10) minutes = '0' + minutes;
        this._time = [date.getHours(), minutes].join(':');
    }
    getFullDate() {
        return this._time + ' ' + this._date;
    }
}

export default class PostListItem extends Component {
    constructor(props) {
        super(props);
        this.state = {
            important: props.important,
            like: false,
            label: props.label,
            date: new DateCreating().getFullDate()
        };
        // this.date = new DateCreating().getFullDate();
        this.onImportant = this.onImportant.bind(this);
        this.onLike = this.onLike.bind(this);
        this.onEdit = this.onEdit.bind(this);
    }

    onImportant() {
        this.setState(({important}) => ({
            important: !important // меняемм important на противоположное значение
        }))
    }
    onLike() {
        this.setState(({like}) => ({
            like: !like // меняемм important на противоположное значение
        }))
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
        const {onDelete} = this.props;
        const {important, like, label, date} = this.state;
        let classNames = 'app-list-item d-flex justify-content-between';
        if (important) {
            classNames += ' important';
        }
        if (like) {
            classNames += ' like';
        }
        return (
            <div className={classNames}>
                <div>
                    <span className="app-list-item-label"
                          onClick={this.onLike}>
                        {label}
                    </span>
                    <span className="time-date">{date}</span>
                </div>
                <div className="d-flex justify-content-center align-items-center">
                    <button type="button"
                            className="btn-star btn-sm"
                            onClick={this.onImportant}>
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