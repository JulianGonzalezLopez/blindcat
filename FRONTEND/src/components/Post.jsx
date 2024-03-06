import Comments from "./Comments";
import "./Post.css";
import { useState } from "react";

function Post({title,content, likes, setSelectedPost, post_id, token, setRelatedCommets}) {

  async function fetchData(token, postId) {
    try {
      let url = `http://localhost:3001/post/${post_id}/comments`;
      let relatedComments = await fetch(url, {
        headers: new Headers({
          "Authorization": token
        })
      });
      let relatedCommentsJSON = await relatedComments.json();
      console.log(relatedCommentsJSON);
      setRelatedCommets(relatedCommentsJSON);
      return relatedCommentsJSON;

    } catch (error) {
      console.error("Error al obtener los comentarios relacionados:", error);
      throw error;
    }
  }


  return (
        <div id={post_id} className="post" onClick={()=>{
          setSelectedPost(post_id);
          fetchData(token,post_id);
        }}>
            <h3 className="title">{title}</h3>
            <p className="content">{content}</p>
            <p>Likes: {likes}</p>     
    </div>
  )
}

export default Post
