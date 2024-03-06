import "./CommentsSection.css"
import Comments from "./Comments";

const handleSubmit = async (event, token, post_id) => {
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
      } else {
        console.error('Error al CREAR POST:');
        // Aquí puedes manejar el error de registro de alguna manera
      }
    } catch (error) {
      console.error('Error al conectarse al servidor:');
      console.log(error);
      // Aquí puedes manejar errores de conexión de red
    }  
  };



function CommentsSection({token, relatedComments, post_id}) {
  return (
    <div className="comments-section">
      <form className="comment-form" onSubmit={(event) => { handleSubmit(event, token, post_id) }}>
        <textarea name="content" id="content" cols="30" rows="10" placeholder="Escribe un comentario" ></textarea>
        <input  className="send-btn" type="submit" value="Enviar" />
        </form>
        <Comments relatedComments={relatedComments}></Comments>
    </div>
  )
}

export default CommentsSection;