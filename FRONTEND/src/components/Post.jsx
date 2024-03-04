import Comments from "./Comments";
import "./Post.css";
import { useState } from "react";

function Post({title,content, likes, setSelectedPost}) {

  return (
        <div className="post" onClick={()=>{setSelectedPost(1)}}>
            <h3 className="title">{title}</h3>
            <p className="content">{content}</p>
            <p>Likes: {likes}</p>     
    </div>
  )
}

export default Post
