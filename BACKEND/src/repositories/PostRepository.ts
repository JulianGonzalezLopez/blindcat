import pool from "../pool.js";

export default class PostRepository{

    async createPost(post: Post){
        try{

    
            if (pool instanceof Error || typeof pool === "undefined"){
                throw {statusCode: 500, errorMessage:"Falló la conexión con la base de datos"};
            }
            else{
                const [rows, fields] = await pool.execute("INSERT INTO posts(title, content, nsfw, creation_date) VALUES (?,?,?,?)",[post.title, post.content, post.nsfw, post.creation_date]);    
                //@ts-ignore
                console.log('ID del registro insertado:', rows.insertId);
                //@ts-ignore
                return Promise.resolve(rows.insertId)
            }
        }
        catch(e){
            throw e;
        }
    }

    async getPosts(){
        try{
            if (pool instanceof Error || typeof pool === "undefined"){
                throw {statusCode: 500, errorMessage:"Falló la conexión con la base de datos"};
            }
            else{
                const [results, fields] = await pool.execute("SELECT * from posts");
    
                if(Array.isArray(results) && results.length !== 0){
                    return Promise.resolve(results);
                }
                else{
                    return Promise.resolve([]);
                }
            }
        }
        catch(e){;
            Promise.reject([]);
        }
    }

    async getPostsPaged(page: string, order: string){
        const PAGE_SIZE = 5;

        let OFFSET;
    
        Number.parseInt(page) == 0 ? OFFSET = 0 : OFFSET = (Number.parseInt(page)) * PAGE_SIZE;
    
        try{
            if (pool instanceof Error || typeof pool === "undefined"){
                throw {statusCode: 500, errorMessage:"Falló la conexión con la base de datos"};
            }
            else{
    
                const totalPostsQuery = "SELECT COUNT(*) AS totalPosts FROM posts";
                const [totalPostsRows,asd] = await pool.execute(totalPostsQuery);               
                
                let query = order == "new" ? "SELECT * from posts ORDER BY creation_date DESC LIMIT ? OFFSET ?" : "SELECT * from posts ORDER BY opened DESC LIMIT ? OFFSET ? "
    
                const [results, fields] = await pool.execute(query, [PAGE_SIZE.toString(), OFFSET.toString()]);
                if(Array.isArray(results) && results.length !== 0){
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