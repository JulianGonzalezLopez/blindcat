export default async function deleteComment(token, comment_id){
    try{
        let url = `http://localhost:3001/entry/comment/${encodeURIComponent(comment_id)}`;
        let res = await fetch(url,{
            method:"DELETE",
            headers: new Headers({
                "Authorization": token
              })
            });
        if(res.ok){
            let resJSON = await res.json();
            return resJSON;
        }
        else{
            throw "errasdasdsa";
        }
    } catch (error) {
        console.error("Error al obtener el comentario:", error);
        throw error;
    }
}