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

    async createNewPostCommentRelationship(cid: number, pid: number){
        if (pool instanceof Error || typeof pool === "undefined"){
            throw {statusCode: 500, errorMessage:"Falló la conexión con la base de datos"};
        }
        else{
            const [rows, fields] = await pool.execute("INSERT INTO posts_comments(post_id, comment_id) VALUES (?,?)",[pid, cid]);    
            //@ts-ignore
            console.log('ID del registro insertado:', rows.insertId);
            //@ts-ignore
            return Promise.resolve(rows.insertId)
        } 
    }
    
    async createNewUserCommentRelationship(cid: number, uid: any){
        if (pool instanceof Error || typeof pool === "undefined"){
            throw {statusCode: 500, errorMessage:"Falló la conexión con la base de datos"};
        }
        else{
            const [rows, fields] = await pool.execute("INSERT INTO users_comments(user_id, comment_id) VALUES (?,?)",[uid, cid]);    
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
                const [results, fields] = await pool.execute("SELECT comments.id as comment_id, comments.content as comment_content, posts.id as original_post_id, posts.title as original_post_title FROM comments JOIN posts_comments ON comments.id = posts_comments.comment_id JOIN posts ON posts_comments.post_id = posts.id WHERE posts_comments.post_id = ?",[pid]);
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

    async confirmCommentOwnership(cid, uid){
        if (pool instanceof Error || typeof pool === "undefined"){
            throw {statusCode: 500, errorMessage:"Falló la conexión con la base de datos"};
        }
        else{
            const [results, fields] = await pool.execute("SELECT COUNT(*) FROM users  JOIN users_comments ON users.id = users_comments.user_id WHERE users.id = ? AND comment_id = ?;",[uid,cid]);
            console.log("Checking comment ownership");
            console.log(results);
            if(Array.isArray(results) && results.length !== 0){
                console.log("pasamos 1");
                if(results[0].hasOwnProperty('COUNT(*)')){
                    //@ts-ignore
                    if(results[0]['COUNT(*)'] == 1){
                        return true;
                    }
                    return false;
                }
            }
            else{
                throw {statusCode: 404, errorMessage:"No se pudo confirmar la propiedad de este comentario"};
            }
        }
    }

    async deleteComment(cid){
        if (pool instanceof Error || typeof pool === "undefined"){
            throw {statusCode: 500, errorMessage:"Falló la conexión con la base de datos"};
        }
        else{
            const [results, fields] = await pool.execute("DELETE FROM comments WHERE id = ?",[cid]);
            console.log("Comment " + cid + " eliminado");
        }
    }
        
    async getCommentsByUID(user_id: number){

            if (pool instanceof Error || typeof pool === "undefined"){
                throw {statusCode: 500, errorMessage:"Falló la conexión con la base de datos"};
            }
            else{
                const [results, fields] = await pool.execute("SELECT comments.id as comment_id, comments.content as comment_content, posts.id as original_post_id, posts.title as original_post_title  FROM comments  JOIN users_comments ON comments.id = users_comments.comment_id  JOIN posts_comments ON comments.id = posts_comments.comment_id JOIN posts ON posts.id = posts_comments.post_id WHERE users_comments.user_id = ?",[user_id]);
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