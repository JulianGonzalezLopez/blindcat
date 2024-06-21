import CommentsSection from "./CommentsSection";
import "./Post.css";

import { useState } from "react";

function Post({title,content, creation_date, setSelectedPost, post_id, token, nsfw, setRelatedCommets, creator_username, relatedComments}) {
  const [showComments, setShowComments] = useState(false);

  let aux;

  async function fetchComments(token, post_id, setRelatedCommets) {
    try {
      let url = `http://localhost:3001/post/${post_id}/comments`;
      let relatedCommentsJS = await fetch(url, {
        headers: new Headers({
          "Authorization": token
        })
      });
      let relatedCommentsJSON = await relatedCommentsJS.json();
      console.log("AAAAAAAAAAAAAAAAAA");
      console.log(relatedCommentsJSON);
      setRelatedCommets(relatedCommentsJSON);
    } catch (error) {
      console.error("Error al obtener los comentarios relacionados:", error);
      throw error;
    }
  }


  async function createRelationship(token, post_id) {
    const requestData = {
      post_id: post_id
    };
    try {
      const response = await fetch('http://localhost:3001/post/opened', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization':token
        },
        body: JSON.stringify(requestData)
      });
      let responseJSON = await response.json();
  
    } catch (error) {
      console.error("Error al crear relacion:", error);
      throw error;
    }
  }  


  // async function fetchData(token, post_id) {
  //   try {
  //     let url = `http://localhost:3001/post/${post_id}/comments`;
  //     let relatedComments = await fetch(url, {
  //       headers: new Headers({
  //         "Authorization": token
  //       })
  //     });
  //     let relatedCommentsJSON = await relatedComments.json();
  //     setRelatedCommets(relatedCommentsJSON);
  //     return relatedCommentsJSON;

  //   } catch (error) {
  //     console.error("Error al obtener los comentarios relacionados:", error);
  //     throw error;
  //   }
  // }

  let date =new Date(creation_date);
  date.setHours(date.getHours() - 3);
  const formatedDate = date.toLocaleTimeString('es-AR', {
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit'
  });  
  

  return (
        <div id={post_id} className={nsfw ? "post blurred" : "post"} onClick={ async (e)=>{
          localStorage.setItem("current_post",title);
          createRelationship(token, post_id);
          setSelectedPost(post_id);
          setShowComments(!showComments)
          fetchComments(token,post_id, setRelatedCommets);
        }}>
            <h3 className="title">{title}</h3>
            <p className="post-content">{content}</p>
            <p className="creator"> {formatedDate} - {creator_username}</p> 
            {showComments && screen.width < 800 && <CommentsSection setRelatedCommets={setRelatedCommets} relatedComments={relatedComments} token={token} post_id={post_id} ></CommentsSection>}
    </div>
  )
}

export default Post
