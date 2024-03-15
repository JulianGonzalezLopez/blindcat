import pool from "../pool.js";

interface Comment{
    content: string,
    user_id: number,
    post_id: number
};

async function createNewComment(comment : Comment){
    
    try{
        if(comment.content == null || comment.user_id == null){
            return Promise.reject({"en":"At least one of the inputs is null"});
        }


        if (pool instanceof Error || typeof pool === "undefined"){
            return Promise.reject({"en":"Failed to connect"});
        }
        else{
            const [rows, fields] = await pool.execute("INSERT INTO comments(content, creator_id) VALUES (?,?)",[comment.content, comment.user_id]);    
            //@ts-ignore
            console.log('ID del registro insertado:', rows.insertId);
            //@ts-ignore
            return Promise.resolve(rows.insertId)
        } 
    }
    catch(e){
        return e;
    }
}


async function getComments(comment_id: number){
    
    try{
        if (pool instanceof Error || typeof pool === "undefined"){
            Promise.reject([]);
        }
        else{
            const [results, fields] = await pool.execute("SELECT * from comments where id = ?",[comment_id]);
            pool.end();
            
            if(Array.isArray(results) && results.length !== 0){
                console.log("Informacion del comentario con id: " + comment_id + ":")
                console.log(results);
                return Promise.resolve(results[0]);
            }
            else{
                return Promise.resolve([]);
            }
        }
    }
    catch(e){
        Promise.reject([]);
    }
}

export default {
    createNewComment,
    getComments
};