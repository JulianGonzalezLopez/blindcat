
import "./Posts.css";
import Post from "./Post";
import { useEffect, useState } from "react";

function Posts({token, lastPosts, setSelectedPost, setRelatedCommets}) {
  const [focus, setFocus] = useState(false);
  console.log("ACACACACACACA");
  console.log(lastPosts);
  

  return (
    <>
    <div className="posts">
      {lastPosts.map(post=>
        <Post title={post.title} content={post.content} key={post.id} post_id={post.id} likes={post.likes} setSelectedPost={setSelectedPost} token={token} setRelatedCommets={setRelatedCommets}></Post>
      )}
    </div>
    
    </>
  )
}

export default Posts
