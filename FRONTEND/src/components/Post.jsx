import CommentsSection from "./CommentsSection";
import "./Post.css";

import { useState } from "react";

function Post({title,content, creation_date, setSelectedPost, post_id, token, setRelatedCommets, creator_username, relatedComments}) {
  const [showComments, setShowComments] = useState(false);

  let aux;

  async function fetchComments(token, post_id, setRelatedCommets) {
    console.log("!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!");
    console.log(relatedComments);
    try {
      let url = `http://localhost:3001/post/${post_id}/comments`;
      let relatedCommentsJS = await fetch(url, {
        headers: new Headers({
          "Authorization": token
        })
      });
      let relatedCommentsJSON = await relatedCommentsJS.json();
      console.log(relatedCommentsJSON);
      setRelatedCommets(relatedCommentsJSON);
      console.log(relatedComments)
  
    } catch (error) {
      console.error("Error al obtener los comentarios relacionados:", error);
      throw error;
    }
  }

  async function fetchData(token, post_id) {
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

  let date =new Date(creation_date);
  date.setHours(date.getHours() - 3);
  const formatedDate = date.toLocaleTimeString('es-AR', {
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit'
  });  


  return (
        <div id={post_id} className="post" onClick={ async (e)=>{
          setSelectedPost(post_id);
          fetchComments(token,post_id, setRelatedCommets);
          setShowComments(!showComments)
        }}>
            <h3 className="title">{title}</h3>
            <p className="post-content">{content}</p>
            <p className="creator"> {formatedDate} - {creator_username}</p> 
            {console.log(aux)}
            {showComments && screen.width < 800 && <CommentsSection setRelatedCommets={setRelatedCommets} relatedComments={aux} token={token} post_id={post_id} ></CommentsSection>}
    </div>
  )
}

export default Post
