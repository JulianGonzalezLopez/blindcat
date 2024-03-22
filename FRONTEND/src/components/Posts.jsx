
import "./Posts.css";
import Post from "./Post";
import { useEffect, useState } from "react";

function Posts({token, page, setPage, setOrder, lastPosts, setSelectedPost, order, setRelatedCommets, setLastPosts, relatedCommets, post_id, nsfw}) {
  const [focus, setFocus] = useState(false);

  return (
    <>
  <div className="posts">
  <div className="orden-btn-container">
        <button className="orden-btn" onClick={()=>{if(order != "new"){setPage(0); setLastPosts([]);} setOrder("new");  }}> Nuevo</button>
        <button className="orden-btn"onClick={()=>{if(order != "top"){setPage(0); setLastPosts([]);} setOrder("top");  }}> Top</button>
  </div>
  {lastPosts?.map(post => {
      return (
        <Post
          title={post.title}
          content={post.content}
          creation_date={post.creation_date}
          key={post.id}
          post_id={post.id}
          likes={post.likes}
          nsfw={nsfw ? false : post.nsfw}
          setSelectedPost={setSelectedPost}
          creator_username={post.username}
          token={token}
          setRelatedCommets={setRelatedCommets}
          relatedCommets={relatedCommets}
        />
      );
  })}
  <button className="button-53" onClick={()=>{setPage(page+1)}}>Leer mas...</button>
</div>
    
    </>
  )
}

export default Posts
