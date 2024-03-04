import openConnection from "../connection.js";

interface PostComment{
    post_id: number,
    comment_id: number
}


async function createNewPostComment(postComment : PostComment){
    try{
        if(postComment.post_id == null || postComment.comment_id == null){
            return Promise.reject({"en":"At least one of the inputs is null"});
        }

        let connection = await openConnection()

        if (connection instanceof Error || typeof connection === "undefined"){
            return Promise.reject({"en":"Failed to connect"});
        }
        else{
            const [rows, fields] = await connection.execute("INSERT INTO posts_comments(post_id, comment_id) VALUES (?,?)",[postComment.post_id, postComment.comment_id]);    
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

export default{
    createNewPostComment
}