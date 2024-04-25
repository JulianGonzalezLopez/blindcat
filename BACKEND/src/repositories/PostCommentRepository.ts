import pool from "../pool.js";


export default class PostCommentRepository{

    async createNewPostComment(postComment : PostComment){
        try{
            if(postComment.post_id == null || postComment.comment_id == null){
                return Promise.reject({"en":"At least one of the inputs is null"});
            }
    
            if (pool instanceof Error || typeof pool === "undefined"){
                return Promise.reject({"en":"Failed to connect"});
            }
            else{
                const [rows, fields] = await pool.execute("INSERT INTO posts_comments(post_id, comment_id) VALUES (?,?)",[postComment.post_id, postComment.comment_id]);    
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

    async getPostsCommets(post_id: any){

        try{
            if (pool instanceof Error || typeof pool === "undefined"){
                throw {statusCode: 500, errorMessage:"Falló la conexión con la base de datos"};
            }
            else{
                const [results, fields] = await pool.execute("SELECT * from posts_comments where post_id = ?",[post_id]);
                console.log("!!!!");
                console.log(results);
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
            throw e;
        }
    }










}