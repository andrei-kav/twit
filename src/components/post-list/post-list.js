import React from "react";
// import { ListGroup } from 'reactstrap';
// в return вместо ul пишем <ListGroup>


import "./post-list.css";

import PostListItem from "../post-list-item";

const PostList = ({posts, onDelete, onToggleImportant, onToggleLike}) => {
    if (typeof posts === 'string') {
        return <div>{posts}</div>
    }
    const elements = posts.map((item) => {
        if (typeof item === 'object') {
            const {id, ...itemProps} = item;
            return (
                <li key={id} className="list-group-item">
                    <PostListItem {...itemProps}
                                  onDelete={() => onDelete(id)}
                                  onToggleImportant={() => onToggleImportant(id)}
                                  onToggleLike={() => onToggleLike(id)}/>
                </li>
            )
        }
    });

    return (
        <ul className="app-list list-group">
            {elements}
        </ul>
    )
}

export default PostList;