
import "./Posts.css";
import Post from "./Post";
import { useEffect, useState } from "react";

function Posts({token, lastPosts, setSelectedPost}) {
  const [focus, setFocus] = useState(false);
  console.log("ACACACACACACA");
  console.log(lastPosts);
  

  return (
    <>
    <div className="posts">
      {lastPosts.map(post=>
        <Post title={post.title} content={post.content} likes={post.likes} setSelectedPost={setSelectedPost} ></Post>
      )}
    </div>
    
    </>
  )
}

export default Posts
