
import "./Posts.css";
import Post from "./Post";
import { useEffect, useState } from "react";

function Posts({token, lastPosts}) {
  const [focus, setFocus] = useState(false);

  

  return (
    <>
    {lastPosts.map(post=>
      <Post title={post.title} content={post.content}></Post>
      )}
    </>
  )
}

export default Posts
