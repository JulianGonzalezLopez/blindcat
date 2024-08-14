export default async function fetchEntry(token, username){
    try{
        console.log(username);
        console.log(token);
        console.log(localStorage.getItem("token"));
        let url = `http://localhost:3001/user/${encodeURIComponent(username)}/interactions`;
        let res = await fetch(url,{
            headers: new Headers({
                "Authorization": localStorage.getItem("token") || token
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