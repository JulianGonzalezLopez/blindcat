import pool from "../pool";

export class CommentRepository{

    async createNewComment(comment : Comment){  
            if (pool instanceof Error || typeof pool === "undefined"){
                throw {statusCode: 500, errorMessage:"Falló la conexión con la base de datos"};
            }
            else{
                const [rows, fields] = await pool.execute("INSERT INTO comments(content, creator_id) VALUES (?,?)",[comment.content, comment.creator_id]);    
                //@ts-ignore
                console.log('ID del registro insertado:', rows.insertId);
                //@ts-ignore
                return Promise.resolve(rows.insertId)
            } 
    }
    
    
    async getComments(comment_id: number){
            if (pool instanceof Error || typeof pool === "undefined"){
                throw {statusCode: 500, errorMessage:"Falló la conexión con la base de datos"};
            }
            else{
                const [results, fields] = await pool.execute("SELECT * from comments where id = ?",[comment_id]);
                
                if(Array.isArray(results) && results.length !== 0){
                    console.log("Informacion del comentario con id: " + comment_id + ":")
                    console.log(results);
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