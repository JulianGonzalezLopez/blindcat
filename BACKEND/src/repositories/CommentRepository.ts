import pool from "../pool";

export class CommentRepository{

    async createNewComment(content: string){  
            if (pool instanceof Error || typeof pool === "undefined"){
                throw {statusCode: 500, errorMessage:"Falló la conexión con la base de datos"};
            }
            else{
                const [rows, fields] = await pool.execute("INSERT INTO comments(content) VALUES (?)",[content]);    
                //@ts-ignore
                console.log('ID del registro insertado:', rows.insertId);
                //@ts-ignore
                return rows.insertId;
            } 
    }

    async createNewCommentRelationship(cid: number, pid: number, uid: string){
        if (pool instanceof Error || typeof pool === "undefined"){
            throw {statusCode: 500, errorMessage:"Falló la conexión con la base de datos"};
        }
        else{
            const [rows, fields] = await pool.execute("INSERT INTO comments_posts_users(comment_id, post_id, user_id) VALUES (?,?,?)",[cid, pid, uid]);    
            //@ts-ignore
            console.log('ID del registro insertado:', rows.insertId);
            //@ts-ignore
            return Promise.resolve(rows.insertId)
        } 
    }
    
    async getCommentsByPID(pid: number){
            if (pool instanceof Error || typeof pool === "undefined"){
                throw {statusCode: 500, errorMessage:"Falló la conexión con la base de datos"};
            }
            else{
                const [results, fields] = await pool.execute("SELECT comments_posts_users.comment_id, comments.content FROM comments JOIN comments_posts_users ON comments.id = comments_posts_users.comment_id WHERE comments_posts_users.post_id = ?",[pid]);
                console.log("Comentarios asociados al PID: " + pid);
                console.log(results);
                if(Array.isArray(results) && results.length !== 0){
                    return results;
                }
                else{
                    return Promise.resolve([]);
                }
            }
    }
        
    async getCommentsByUID(user_id: number){

            if (pool instanceof Error || typeof pool === "undefined"){
                throw {statusCode: 500, errorMessage:"Falló la conexión con la base de datos"};
            }
            else{
                const [results, fields] = await pool.execute("SELECT * from comments where creator_id = ?",[user_id]);
                console.log("WAOS");
                console.log(results);
                if(Array.isArray(results) && results.length !== 0){
                    console.log("Informacion del comentario con id: " + user_id + ":")
                    console.log(results);
                    return results;
                }
                else{
                    return Promise.resolve([]);
                }
            }
    }





}