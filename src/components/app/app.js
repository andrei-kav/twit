import React, {Component} from "react";
import nextId from "react-id-generator";

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
                {label: 'Going to learn react', important: true, like: false, id: 1},
                {label: 'That is so good', important: false, like: false, id: 2},
                {label: 'I need a break', important: false, like: false, id: 3}
            ]
        };

        this.onDeleteItem = this.onDeleteItem.bind(this);
        this.addItem = this.addItem.bind(this);
        this.onToggleImportant = this.onToggleImportant.bind(this);
        this.onToggleLike = this.onToggleLike.bind(this);
    }
    _addPostId() {
        return nextId();
    }
    _changePropValue(data, id, prop) {
        const index = data.findIndex(elem => elem.id === id);
        const old = data[index];
        old[prop] = !old[prop];
        // создаеи новый массив с постами newArr
        const newArr = [...data.slice(0, index), old, ...data.slice(index + 1)];
        return newArr;
    }
    onDeleteItem(id) {
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
            like: false,
            id: this._addPostId()
        };
        this.setState(({data}) => {
            const newArr = [newItem, ...data];
            return {
                data: newArr
            }
        })
    }
    onToggleImportant(id) {
        this.setState(({data}) => {
            return {
                data: this._changePropValue(data, id, 'important')
            };
        })
    }
    onToggleLike(id) {
        this.setState(({data}) => {
            return {
                data: this._changePropValue(data, id, 'like')
            }
        })
    }

    render() {
        const {data} = this.state;
        const liked = data.filter(item => item.like).length;
        const allPosts = data.length;
        return (
            <div className="app">
                <AppHeader liked={liked}
                           allPosts={allPosts}/>
                <div className="search-panel d-flex">
                    <SearchPanel />
                    <PostStatusFiler />
                </div>
                <PostList posts={this.state.data}
                          onDelete={this.onDeleteItem}
                          onToggleImportant={this.onToggleImportant}
                          onToggleLike={this.onToggleLike}/>
                <PostAddForm onAdd={this.addItem}/>
            </div>
        )
    }
};
