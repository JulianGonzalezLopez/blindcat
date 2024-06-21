import "./CommentsSection.css"
import Comments from "./Comments";
import { useEffect, useState } from "react";

async function fetchData(token, post_id, setRelatedCommets, relatedComments) {
  try {
    let url = `http://localhost:3001/post/${post_id}/comments`;
    let relatedCommentsJS = await fetch(url, {
      headers: new Headers({
        "Authorization": token
      })
    });
    let relatedCommentsJSON = await relatedCommentsJS.json();
    console.log(post_id);
    console.log(token);
    console.log(relatedCommentsJSON);
    setRelatedCommets(relatedCommentsJSON);
    return relatedCommentsJSON;

  } catch (error) {
    console.error("Error al obtener los comentarios relacionados:", error);
    throw error;
  }
}


const handleSubmit = async (event, token, post_id, setRelatedCommets, setPostContent, openErrorModal, setCurrentError) => {
    event.preventDefault();

    const formData = new FormData(event.target);

    const requestData = {
      content: formData.get('content'),
      post_id: post_id
    };

    try {
      const response = await fetch('http://localhost:3001/post/comment', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization':token
        },
        body: JSON.stringify(requestData)
      });
      if (response.ok) { 
        console.log("creado");
        fetchData(token, post_id, setRelatedCommets);
        setPostContent("");

      } else {
        console.error('Error al CREAR POST:');
        let responseJSON = await response.json();
        console.log(responseJSON);
        setCurrentError(responseJSON.error);
        openErrorModal();
        // Aquí puedes manejar el error de registro de alguna manera
      }
    } catch (error) {
      console.error('Error al conectarse al servidor:');
      console.log(error);
      // Aquí puedes manejar errores de conexión de red
    }  
  };

  const handleClickInside = (event) => {
    event.stopPropagation();
  };


function CommentsSection({token, setRelatedCommets, relatedComments, post_id, openErrorModal, setCurrentError}) {
  const [postContent, setPostContent] = useState(''); 

  useEffect(()=>{
    fetchData(token, post_id, setRelatedCommets, relatedComments);
  }, []);

  return (
    <div className="comments-section">
      {screen.width > 800 && <p>{localStorage.getItem("current_post")}</p>}
      <form className="comment-form" onClick={handleClickInside} onSubmit={(event) => { handleSubmit(event, token, post_id, setRelatedCommets, setPostContent, openErrorModal, setCurrentError) }}>
        <textarea name="content" id="content" cols="30" rows="10" placeholder="Escribe un comentario" value={postContent} onChange={e => setPostContent(e.target.value)}></textarea>
        <button className="button-53 send-btn" type="submit" value="Enviar">Enviar</button>
        </form>
        {console.log("aaaaaaaaaa")}
        {console.log(relatedComments)}
        <Comments relatedComments={relatedComments}></Comments>
    </div>
  )
}

export default CommentsSection;