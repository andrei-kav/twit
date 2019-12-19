import React, {Component} from "react";

import "./post-list-item.css";

class DateCreating {
    constructor() {
        let date = new Date();
        this._date = [date.getDate(), date.getMonth() + 1, date.getFullYear()];
        this._time = [date.getHours(), date.getMinutes()];
    }
    _getDate() {
        return this._date.join('/');
    }
    _getTime() {
        return this._time.join(':');
    }
    getFullDate() {
        return this._getTime() + ' ' + this._getDate();
    }
}
let date = new DateCreating();

export default class PostListItem extends Component {
    constructor(props) {
        super(props);
        this.state = {
            important: false,
            like: false,
            label: props.label
        };
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
                label: editPost
            }))
        }
    }

    render() {
        // const {label} = this.props;
        const {important, like, label} = this.state;
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
                    <span className="time-date">{date.getFullDate()}</span>
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
                    <button type="button" className="btn-trash btn-sm">
                        <i className="fa fa-trash-o"></i>
                    </button>
                    <i className="fa fa-heart"></i>
                </div>
            </div>
        )
    }
}