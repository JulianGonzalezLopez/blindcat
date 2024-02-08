import Comments from "./Comments";
import "./Post.css";
import { useState } from "react";

function Post() {
  const [focus, setFocus] = useState(false);

  return (
    <div className="post-container">
        <div className="post" onClick={()=> setFocus(!focus)}>
            <h3>TITULO POST</h3>
            <img src="#" alt="IMG POST"/>
            <p>TEXT</p>
        </div>
        {focus && <Comments></Comments>}
        
    </div>
  )
}

export default Post
