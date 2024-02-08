
import "./Posts.css";
import Post from "./Post";
import { useState } from "react";

function Posts() {
  const [focus, setFocus] = useState(false);

  return (
    <>
        <Post></Post>
        <Post></Post>
        <Post></Post>
    </>
  )
}

export default Posts
