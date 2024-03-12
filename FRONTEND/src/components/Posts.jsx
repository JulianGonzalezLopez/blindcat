
import "./Posts.css";
import Post from "./Post";
import { useEffect, useState } from "react";

function Posts({token, page, setPage , lastPosts, setSelectedPost, setRelatedCommets, nsfw}) {
  const [focus, setFocus] = useState(false);
  console.log("ACACACACACACA");
  console.log(lastPosts);
  

  return (
    <>
<div className="posts">
  {lastPosts.map(post => {
    if (nsfw === true || post.nsfw === 0) {
      return (
        <Post
          title={post.title}
          content={post.content}
          creation_date={post.creation_date}
          key={post.id}
          post_id={post.id}
          likes={post.likes}
          setSelectedPost={setSelectedPost}
          creator_username={post.username}
          token={token}
          setRelatedCommets={setRelatedCommets}
        />
      );
    }
    return null;
  })}
  <button className="button-53" onClick={()=>{setPage(page+1)}}>Leer mas...</button>
</div>
    
    </>
  )
}

export default Posts
