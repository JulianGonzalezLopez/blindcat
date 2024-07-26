import pool from "../pool";

export default class PostRepository{

    async createPost(post: Post){
        try{

    
            if (pool instanceof Error || typeof pool === "undefined"){
                throw {statusCode: 500, errorMessage:"Falló la conexión con la base de datos"};
            }
            else{
                const [rows, fields] = await pool.execute("INSERT INTO posts(title, content, nsfw) VALUES (?,?,?)",[post.title, post.content, post.nsfw]);    
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

    
    async getPost(post_id: number | string){
        try{
            if (pool instanceof Error || typeof pool === "undefined"){
                throw {statusCode: 500, errorMessage:"Falló la conexión con la base de datos"};
            }
            else{
                const [results, fields] = await pool.execute("SELECT * from posts WHERE id = ?",[post_id]);
                console.log(results);
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
    
        
    async getPostsByID(posts_ids: String[] | Number[]){
        try{
            console.log("25/7");
            console.log(posts_ids)
            if (pool instanceof Error || typeof pool === "undefined"){
                throw {statusCode: 500, errorMessage:"Falló la conexión con la base de datos"};
            }
            else{
                const [results, fields] = await pool.execute(`SELECT * FROM posteos WHERE id IN (?)`, [posts_ids]);
                console.log(results);
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

    async getPostsByCategoryPaged(tag: string, page: string, order: string){
        const PAGE_SIZE = 5;
        console.log("AHORA POR ACÁ 1");
        let OFFSET;
        Number.parseInt(page) == 0 ? OFFSET = 0 : OFFSET = (Number.parseInt(page)) * PAGE_SIZE;

        console.log("AHORA POR ACÁ 2");
        try{
            if (pool instanceof Error || typeof pool === "undefined"){
                throw {statusCode: 500, errorMessage:"Falló la conexión con la base de datos"};
            }
            else{
    
                const [posts_ids,fieldss] = await pool.execute("SELECT post_id FROM posts_categories WHERE category_tag = ?", [tag]);
                console.log("UYUYUYUYUYUYUYUYUYUYUY");
                console.log("------------------------");
                console.log(posts_ids);
                console.log("------------------------");
                //@ts-ignore
                const posts_ids_halfway = posts_ids.map(item => item.post_id);
                if(posts_ids_halfway.length == 0){
                    return Promise.resolve([]);
                }
                const posts_ids_flattened = posts_ids_halfway.join(",");
                console.log(posts_ids_flattened);       
                //Se que está mal, pero weno, no me andaba
                let query = (order == "new") ?
                `SELECT * FROM posts WHERE id IN (${posts_ids_flattened}) ORDER BY creation_date DESC LIMIT ${PAGE_SIZE} OFFSET ${OFFSET}` :
                `SELECT * FROM posts WHERE id IN (${posts_ids_flattened}) ORDER BY opened DESC LIMIT ${PAGE_SIZE} OFFSET ${OFFSET}`;

                const [results, fields] = await pool.execute(query);

                // let query = "SELECT * FROM posts WHERE id IN (?)";

                // const [results, fields] = await pool.execute(query, posts_ids_flattened);

                console.log("------------------------");
                console.log(results);
                console.log("------------------------");
                console.log("UYUYUYUYUYUYUYUYUYUYUY");
                if(Array.isArray(results) && results.length !== 0){
                    console.log("------------------------");
                    console.log(results);
                    console.log("------------------------");
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