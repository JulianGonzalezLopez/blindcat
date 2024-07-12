import "./CommentsSection.css"

import Comment from "./Comment";

import { useEffect, useState } from "react";
import { useContext } from "react";
import { TokenContext } from "../App";

import fetchComments from "../helpers/fetchComments";
import fetchAuthorization from "../helpers/fetchAuthorization";
import { useFetcher } from "react-router-dom";


function CommentsSection({post_id}) {
  const [comment, setComment] = useState(''); 
  const [token, setToken] = useContext(TokenContext);
  const [comments,setComments] = useState([]);

  useEffect(()=>{
    async function auxFunction(){
      setComments(await fetchComments(localStorage.getItem("token"),post_id));
    }

    auxFunction();
  },[]);






  const handleSubmit = async (event, post_id) => {

    const formData = new FormData(event.target);
    const requestData = {
      content: formData.get('content'),
      post_id: post_id
    };

    console.log(requestData);
    console.log(token);

    try {
      const response = await fetch('http://localhost:3001/posts/comment', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization':token
        },
        body: JSON.stringify(requestData)
      });
      if (response.ok) { 
        console.log("QUE ONDA ACA");

      } else {
        console.error('Error al CREAR POST:');
        let responseJSON = await response.json();
        console.log(responseJSON);
        // Aquí puedes manejar el error de registro de alguna manera
      }
    } catch (error) {
      console.error('Error al conectarse al servidor:');
      console.log(error);
      // Aquí puedes manejar errores de conexión de red
    }  
  };

  return (
    <div className="comments-section">
      <form className="comment-form" onSubmit={(event) => { 
        event.preventDefault();
        handleSubmit(event, post_id);
        }}>
        <textarea name="content" id="content" cols="30" rows="10" placeholder="Escribe un comentario" value={comment} onChange={e => setComment(e.target.value)}></textarea>
        <button className="button-53 send-btn" type="submit" value="Enviar">Enviar</button>
        </form>
        <div className="comments">
        {console.log(comments)}
        {
          comments && comments.length > 0 ? (
            comments.map(commentData => (
              <Comment 
                content={commentData.content} 
                username={commentData.username} 
                key={commentData.id} 
              />
            ))
          ) : (<p>Se el primero en comentar</p>)
        }
      </div>
    </div>
  )
}

export default CommentsSection;