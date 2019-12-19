import React from "react";

import AppHeader from "../app-header";
import SearchPanel from "../search-panel";
import PostStatusFiler from "../post-status-filter";
import PostList from "../post-list";
import PostAddForm from "../post-add-form";

import "./app.css";

const App = () => {

    const data = [ // этот массив якобы пришел с сервера
        {label: 'Going to learn react', important: true, id: 'asdgfkb'},
        {label: 'That is so good', important: false, id: 'bvwetrw'},
        {label: 'I need a break', important: false, id: 'iueyrnt'}
    ];

    return (
        <div className="app">
            <AppHeader />
            <div className="search-panel d-flex">
                <SearchPanel />
                <PostStatusFiler />
            </div>
            <PostList posts={data} />
            <PostAddForm />
        </div>
    );
};

export default App;