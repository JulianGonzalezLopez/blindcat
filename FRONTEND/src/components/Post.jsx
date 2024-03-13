import Comments from "./Comments";
import CommentsSection from "./CommentsSection";
import "./Post.css";

import { useState } from "react";

function Post({title,content, creation_date, setSelectedPost, post_id, token, setRelatedCommets, creator_username, relatedComments}) {


  // function insertAfter(container, i) {
  //   console.log("!!!!!!!!!!!!!!!!!!!!!!");
  //   console.log(i);
  //   container.after(<CommentsSection></CommentsSection>);
  // }
  

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
        <div id={post_id} className="post" onClick={(e)=>{
          setSelectedPost(post_id);
          fetchData(token,post_id);

          // if(screen.width < 800){
          //   const container = document.getElementById(post_id); // Reemplaza 'containerId' con el id del contenedor adecuado
          //   console.log("CONTAINER");
          //   console.log(container);
          //   insertAfter(container, <CommentsSection setRelatedCommets={setRelatedCommets} relatedComments={relatedComments} token={token} post_id={post_id}></CommentsSection>)

          // }

        }}>
            <h3 className="title">{title}</h3>
            <p className="post-content">{content}</p>
            <p className="creator"> {formatedDate} - {creator_username}</p> 
            <CommentsSection setRelatedCommets={setRelatedCommets} relatedComments={relatedComments || []} token={token} post_id={post_id} ></CommentsSection>
    </div>
  )
}

export default Post
