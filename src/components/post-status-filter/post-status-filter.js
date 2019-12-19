import React from "react";

import "./post-status-filter.css";

const PostStatusFiler = () => {
    return (
        <div className="btn-group">
            <button type='button' className='btn btn-info'>All</button>
            <button type='button' className='btn btn-outline-secondary'>Liked</button>
        </div>
    )
}

export default PostStatusFiler;