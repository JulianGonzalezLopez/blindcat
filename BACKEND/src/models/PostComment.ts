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
            connection.end();
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

async function getPostsCommets(post_id: any){

    try{
        if(typeof post_id == "undefined"){
            throw "error";
        }

        let connection = await openConnection();

        if (connection instanceof Error || typeof connection === "undefined"){
            Promise.reject([]);
        }
        else{
            const [results, fields] = await connection.execute("SELECT * from posts_comments where post_id = ?",[post_id]);
            connection.end();

            if(Array.isArray(results) && results.length !== 0){
                console.log(results);
                return Promise.resolve(results);
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

export default{
    createNewPostComment,
    getPostsCommets
}