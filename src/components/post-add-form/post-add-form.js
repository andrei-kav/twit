import React, {Component} from "react";

import "./post-add-form.css";

export default class q extends Component {
    constructor(props) {
        super(props);
        this.state = {
            text: ''
        };
        this.onValueChange = this.onValueChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }
    onValueChange(e) {
        this.setState({
            text: e.target.value
        })
    }
    onSubmit(e) {
        e.preventDefault();
        if (this.state.text) {
            this.props.onAdd(this.state.text);
            this.setState({
                text: ''
            })
        } else {
            alert('The form is empty. Write a post');
        }
    }
    render() {
        return (
            <form className="bottom-panel d-flex"
                  onSubmit={this.onSubmit}>
                <input type="text"
                       placeholder="What are you thinking now about?"
                       className="form-control new-post-label"
                       onChange={this.onValueChange}
                       value={this.state.text}
                />
                <button type="submit"
                        className="btn btn-outline-secondary"
                >
                    Add post
                </button>
            </form>
        )
    }
}
