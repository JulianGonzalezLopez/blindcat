import openConnection from "../connection.js";

interface Comment{
    content: string,
    user_id: number,
    post_id: number
};

async function createNewComment(comment : Comment){
    
    let connection;

    try{
        if(comment.content == null || comment.user_id == null){
            return Promise.reject({"en":"At least one of the inputs is null"});
        }

        connection = await openConnection();

        if (connection instanceof Error || typeof connection === "undefined"){
            return Promise.reject({"en":"Failed to connect"});
        }
        else{
            const [rows, fields] = await connection.execute("INSERT INTO comments(content, creator_id) VALUES (?,?)",[comment.content, comment.user_id]);    
            connection.end();
            //@ts-ignore
            console.log('ID del registro insertado:', rows.insertId);
            //@ts-ignore
            return Promise.resolve(rows.insertId)
        } 
    }
    catch(e){
        if(connection){
            connection.end();
        }
        return e;
    }
}


async function getComments(comment_id: number){
    
    let connection;
    
    try{
        connection = await openConnection();

        if (connection instanceof Error || typeof connection === "undefined"){
            Promise.reject([]);
        }
        else{
            const [results, fields] = await connection.execute("SELECT * from comments where id = ?",[comment_id]);
            connection.end();
            
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
        if(connection){
            connection.end();
        }
        Promise.reject([]);
    }
}

export default {
    createNewComment,
    getComments
};