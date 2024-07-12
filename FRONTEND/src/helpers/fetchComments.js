export default async function fetchComments(token, post_id) {
    try {
      let url = `http://localhost:3001/posts/${post_id}/comments`;
      let relatedCommentsJS = await fetch(url, {
        headers: new Headers({
          "Authorization": token
        })
      });
      let relatedCommentsJSON = await relatedCommentsJS.json();
      return relatedCommentsJSON;
    } catch (error) {
      console.error("Error al obtener los comentarios relacionados:", error);
      throw error;
    }
  }