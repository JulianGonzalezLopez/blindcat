export default async function fetchEntry(token, post_id){
    try{
        let url = `http://localhost:3001/entry/?post_id=${encodeURIComponent(post_id)}`;
        let res = await fetch(url,{
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
        console.error("Error al obtener la entrada/entry:", error);
        throw error;
    }
}