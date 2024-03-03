
import "./Posts.css";
import Post from "./Post";
import { useEffect, useState } from "react";

function Posts({token, lastPosts}) {
  const [focus, setFocus] = useState(false);
  console.log("ACACACACACACA");
  console.log(lastPosts);
  

  return (
    <>
    {lastPosts.map(post=>
      <Post title={post.title} content={post.content} likes={post.likes}></Post>
      )}
    </>
  )
}

export default Posts
