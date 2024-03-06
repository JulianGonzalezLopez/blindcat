import openConnection from "../connection.js";

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

        let connection = await openConnection()

        if (connection instanceof Error || typeof connection === "undefined"){
            return Promise.reject({"en":"Failed to connect"});
        }
        else{
            console.log("en la funcion, llegói al .execute");
            const [rows, fields] = await connection.execute("INSERT INTO comments(content, creator_id) VALUES (?,?)",[comment.content, comment.user_id]);    
            //@ts-ignore
            console.log('ID del registro insertado:', rows.insertId);
            //@ts-ignore
            return Promise.resolve(rows.insertId)
        }
    }
    catch(e){
        console.log(e);
        return e;
    }
}


async function getComments(comment_id: number){
    try{
        let connection = await openConnection();

        if (connection instanceof Error || typeof connection === "undefined"){
            Promise.reject([]);
        }
        else{
            const [results, fields] = await connection.execute("SELECT * from comments where id = ?",[comment_id]);

            if(Array.isArray(results) && results.length !== 0){
                console.log(results);
                return Promise.resolve(results[0]);
            }
            else{
                return Promise.resolve([]);
            }
        }
    }
    catch(e){
        console.log(e);
        Promise.reject([]);
    }
}

export default {
    createNewComment,
    getComments
};