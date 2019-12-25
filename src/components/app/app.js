import React, {Component} from "react";

import AppHeader from "../app-header";
import SearchPanel from "../search-panel";
import PostStatusFiler from "../post-status-filter";
import PostList from "../post-list";
import PostAddForm from "../post-add-form";

import "./app.css";

// import styled from 'styled-components';

// const AppBlock = styled.div`
//     margin: 0 auto;
//     max-width: 800px
// `;

// const StyledAppBlock = styled(AppBlock)`
//     background-color: grey;
// `;

export default class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [ // этот массив якобы пришел с сервера
                {label: 'Going to learn react', important: true, id: 1},
                {label: 'That is so good', important: false, id: 2},
                {label: 'I need a break', important: false, id: 3}
            ]
        };
        this.maxId = 4;

        this.deleteItem = this.deleteItem.bind(this);
        this.addItem = this.addItem.bind(this);
    }

    deleteItem(id) {
        const del = window.confirm("Are you sure?");
        if (del) {
            this.setState(({data}) => {
                const index = data.findIndex((elem) => elem.id === id);
                const before = data.slice(0, index);
                const after = data.slice(index + 1);
                const newArr = [...before, ...after];
                return {
                    data: newArr
                }
            });
        }
    }
    addItem(body) {
        const newItem = {
            label: body,
            important: false,
            id: this.maxId++
        };
        this.setState(({data}) => {
            const newArr = [newItem, ...data];
            return {
                data: newArr
            }
        })
    }

    render() {
        return (
            <div className="app">
                <AppHeader />
                <div className="search-panel d-flex">
                    <SearchPanel />
                    <PostStatusFiler />
                </div>
                <PostList posts={this.state.data} onDelete={this.deleteItem}/>
                <PostAddForm onAdd={this.addItem}/>
            </div>
        )
    }
};
