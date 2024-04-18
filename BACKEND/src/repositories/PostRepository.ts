import pool from "../pool.js";

export default class PostRepository{

    async createPost(post: Post){
        try{
            // if(post.title == null || post.content == null){
            //     return Promise.reject({"en":"At least one of the inputs is null"});
            // } VALIDACIONES CONTROLLER
    
            // let nsfw: boolean;
            // //@ts-ignore HAY QUE VER QUE ONDA ESTO
            // if (post.nsfw == "on"){ 
            //     nsfw = true
            // }
            // else{
            //     nsfw = false;
            // }  VALIDACIONES CONTROLLER
    
            if (pool instanceof Error || typeof pool === "undefined"){
                return Promise.reject({"en":"Failed to connect"});
            }
            else{
                const [rows, fields] = await pool.execute("INSERT INTO posts(title, content, nsfw, creation_date) VALUES (?,?,?,?)",[post.title, post.content, nsfw, post.creation_date]);    
                //@ts-ignore
                console.log('ID del registro insertado:', rows.insertId);
                //@ts-ignore
                return Promise.resolve(rows.insertId)
            }
        }
        catch(e){
            console.log(e);
            throw e;
        }
    }

    async getPosts(){
        try{
            if (pool instanceof Error || typeof pool === "undefined"){
                Promise.reject([]);
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
                Promise.reject([]);
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