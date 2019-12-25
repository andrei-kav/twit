import React from "react";

import "./post-add-form.css";

const PostAddForm = ({onAdd}) => {
    return (
        <div action="" className="bottom-panel d-flex">
            <input type="text"
                   placeholder="What are you thinking now about?"
                   className="form-control new-post-label"
            />
            <button type="submit"
                    className="btn btn-outline-secondary"
                    onClick={() => onAdd('Hello')}
            >
                Add post
            </button>
        </div>
    )
}

export default PostAddForm;