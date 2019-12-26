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
                {label: 'Going to learn react', important: true, liked: false, id: 1},
                {label: 'That is so good', important: false, liked: false, id: 2},
                {label: 'I need a break', important: false, liked: false, id: 3}
            ],
            // в term будет записываться строка из формы поиска постов
            term: '',
            // в filter будет хранится значение как именно фильтровать посты (все или только понравившиеся)
            filter: 'all'
        };

        this.onDeleteItem = this.onDeleteItem.bind(this);
        this.addItem = this.addItem.bind(this);
        this.onToggleImportant = this.onToggleImportant.bind(this);
        this.onToggleLike = this.onToggleLike.bind(this);
        this.onUpdateSearch = this.onUpdateSearch.bind(this);
        this.onFilterSelect = this.onFilterSelect.bind(this);
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
    _helpToFilter(items, prop) {
        console.log(prop);
        const newItems = items.filter(item => item[prop]);
        if (newItems.length === 0) {
            return `There is no ${prop} posts`
        }
        return newItems;
    }
    _searchPost(items, term) {
        // поиск хотя бы по двум буквам
        const newTerm = term.toLowerCase().split(' ').filter((item) => {
            return item.length > 1;
        });

        if (newTerm.length === 0) {
            return items;
        }

        const newItems = items.filter((item) => {
            // indexOf(term) возвратит -1 если ничего не найдет
            for (let i = 0; i < newTerm.length; i++) {
                if (item.label.toLowerCase().indexOf(newTerm[i]) > -1) return true;
            }
        });

        if (newItems.length === 0) {
            return `There is no posts with "${term}"`;
        } else {
            return newItems;
        }
    }
    _filterPosts(items, filter) {
        if (typeof items === 'string') {
            return items;
        }
        switch (filter) {
            case 'all':
                return items;
            case 'important':
                return this._helpToFilter(items, filter);
                break;
            case 'liked':
                return this._helpToFilter(items, filter);
                break;
            default:
                return `Unknown filter "${filter}"`;
        }
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
            liked: false,
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
                data: this._changePropValue(data, id, 'liked')
            }
        })
    }
    onUpdateSearch(term) {
        this.setState({term: term})
    }
    onFilterSelect(filter) {
        this.setState({filter: filter})
    }

    render() {
        const {data, term, filter} = this.state;
        const visiblePosts = this._filterPosts(this._searchPost(data, term), filter);

        const allPosts = data.length;
        const important = data.filter(item => item.important).length;
        const liked = data.filter(item => item.liked).length;

        return (
            <div className="app">
                <AppHeader allPosts={allPosts}
                           important={important}
                           liked={liked}/>
                <div className="search-panel d-flex">
                    <SearchPanel onUpdateSearch={this.onUpdateSearch}/>
                    <PostStatusFiler filter={filter}
                                     onFilterSelect={this.onFilterSelect}/>
                </div>
                <PostList posts={visiblePosts}
                          onDelete={this.onDeleteItem}
                          onToggleImportant={this.onToggleImportant}
                          onToggleLike={this.onToggleLike}/>
                <PostAddForm onAdd={this.addItem}/>
            </div>
        )
    }
};
