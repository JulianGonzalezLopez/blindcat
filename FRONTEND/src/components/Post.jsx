import Comments from "./Comments";
import "./Post.css";
import { useState } from "react";

function Post({title,content, likes}) {
  const [focus, setFocus] = useState(false);

  return (
    <div className="post-container">
        <div className="post" onClick={()=> setFocus(!focus)}>
            <h3 className="title">{title}</h3>
            <p className="content">{content}</p>
            <p>Likes: {likes}</p>
        </div>
        {focus && <Comments></Comments>}
        
    </div>
  )
}

export default Post
