import openConnection from "../connection.js";

interface Comment{
    content: string,
    user_id: number
};

async function createNewComent(comment : Comment){
    try{
        if(comment.content == null || comment.user_id == null){
            return Promise.reject({"en":"At least one of the inputs is null"});
        }

        let connection = await openConnection()

        if (connection instanceof Error || typeof connection === "undefined"){
            return Promise.reject({"en":"Failed to connect"});
        }
        else{
            const [rows, fields] = await connection.execute("INSERT INTO comments(content, user_id) VALUES (?,?)",[comment.content, comment.user_id]);    
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