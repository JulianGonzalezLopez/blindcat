
import "./Posts.css";
import Post from "./Post";
import { useEffect, useState } from "react";

function Posts({token}) {
  const [focus, setFocus] = useState(false);
  const [lastPosts, setLastPosts] = useState([]);

  useEffect(()=>{
    async function fetchData(){
      console.log("PERO MIRA ESE TOKEN PAPA");
      console.log(token);
      let posts = await fetch("http://localhost:3001/post/all",
      {
        headers: new Headers({
          "Authorization": token
        })
      }
      );
      let postsJSON = await posts.json();
      console.log("MIRA ESTOS POSTEOS PAPA")
      console.log(posts);
      console.log(postsJSON);
      setLastPosts(postsJSON);
    };
    fetchData();

  },[])

  return (
    <>
    {lastPosts.map(post=>
      <Post title={post.title} content={post.content}></Post>
      )}
    </>
  )
}

export default Posts
