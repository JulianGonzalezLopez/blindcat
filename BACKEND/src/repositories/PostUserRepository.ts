import pool from "../pool";

export default class PostUserRepository{

    async createNewUsersPosts(usersPost : UserPost){
        console.log("ENTRA?????????????");
        try{
            // if(usersPost.user_id == null || usersPost.post_id == null){
            //     return Promise.reject({"en":"At least one of the inputs is null"});
            // } VALIDACION DE TIPOS - CONTROLLER
    
    
            if (pool instanceof Error || typeof pool === "undefined"){
                throw {statusCode: 500, errorMessage:"Falló la conexión con la base de datos"};
            }
            else{
                console.log("SIGUEEEEEEEEEEE");
                await pool.execute("INSERT INTO users_posts(user_id, post_id) VALUES (?,?)",[usersPost.user_id, usersPost.post_id]);    
                return Promise.resolve({"en":"The usersPost has been created successfully"})
            }
        }
        catch(e){
            throw e;
        }
    }
    
    async getUsersPosts(){
        
        try{
    
            if (pool instanceof Error || typeof pool === "undefined"){
                throw {statusCode: 500, errorMessage:"Falló la conexión con la base de datos"};
            }
            else{
                const [results, fields] = await pool.execute("SELECT * from users_posts");
    
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
    
    async getPostUser(post_id: number) {
        
        try {
    
            if (pool instanceof Error || typeof pool === "undefined") {
                throw {statusCode: 500, errorMessage:"Falló la conexión con la base de datos"};
            } else {
                const [results, fields] = await pool.execute("SELECT * from users_posts where post_id = ?", [post_id]);
                console.log("QUE CARAJO ESTÁ PASANDO");
                console.log(results);
                if (Array.isArray(results) && results.length !== 0) {
                    console.log("ESTO LO VAMOS A DEOLVER AHORA");
                    console.log(results);
                    return results[0]; // No es necesario usar Promise.resolve, ya que 'results[0]' ya es el valor que queremos devolver
                } else {
                    return []; // No es necesario usar Promise.resolve, ya que estamos devolviendo un valor estático
                }
            }
        } catch (e) {
            throw e; 
        }
    }
    
    async getPostsUsers(posts_ids: Array<number>) {
        try {
            if (pool instanceof Error || typeof pool === "undefined") {
                throw {statusCode: 500, errorMessage:"Falló la conexión con la base de datos"};
            
    
            } else {
                if (!posts_ids){
                    throw {statusCode: 400, errorMessage:"No llegó un id valido de post"};
                }
                //ESTÁ MAL, YA LO SE, PERO NO FUNCIONA EL COMANDO COMO DEBERIA SINO
                const [results, fields] = await pool.execute(`SELECT * from users_posts where post_id IN (${posts_ids})`);
    
                if (Array.isArray(results) && results.length !== 0) {
                    return results; // No es necesario usar Promise.resolve, ya que 'results[0]' ya es el valor que queremos devolver
                } else {
                    return []; // No es necesario usar Promise.resolve, ya que estamos devolviendo un valor estático
                }
            }
        } catch (e) {
            throw e;
        }
    }
    
    
    async getUserPost(usersPost: UserPost){
        
        try{
    
            if (pool instanceof Error || typeof pool === "undefined"){
                Promise.reject([]);
            }
            else{
                const [results, fields] = await pool.execute("SELECT * from users_posts WHERE user_id = ? AND post_id = ? ",[usersPost.user_id, usersPost.post_id]);
    
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
    
    async createOpenedPost(usersPost : UserPost){
        console.log("ENTRA?????????????");
        try{
            // if(usersPost.user_id == null || usersPost.post_id == null){
            //     return Promise.reject({"en":"At least one of the inputs is null"});
            // } //VALIDACION NIVEL CONTROLLER
    
    
            if (pool instanceof Error || typeof pool === "undefined"){
                throw {statusCode: 500, errorMessage:"Falló la conexión con la base de datos"};
            }
            else{
                let [results,rows] = await pool.execute("SELECT * FROM opened_posts WHERE post_id = ? AND user_id = ?",[usersPost.post_id, usersPost.user_id])
                if(results != undefined && Array.isArray(results) && results.length !== 0){
                    console.log("Ya existe esta relación");
                    return null;
                }
    
                console.log("SIGUEEEEEEEEEEE");
                await pool.execute("INSERT INTO opened_posts(user_id, post_id) VALUES (?,?)",[usersPost.user_id, usersPost.post_id]);    
    
                await pool.execute("UPDATE posts AS p SET p.opened = (SELECT COUNT(op.post_id) FROM opened_posts AS op WHERE op.post_id = p.id) WHERE p.id = ?", [usersPost.post_id]);
    
    
                return Promise.resolve({"en":"The opened_posts relationship has been created successfully"})
            }
        }
        catch(e){
            throw e;
        }
    }
    
    
    async getOpenedPostsCount(post_id: number){
        
        try{
    
            if (pool instanceof Error || typeof pool === "undefined"){
                throw {statusCode: 500, errorMessage:"Falló la conexión con la base de datos"};
            }
            else{
                const [results, fields] = await pool.execute("SELECT COUNT(*) AS opened_by FROM opened_posts WHERE post_id = ?",[post_id]);
    
                if(results != undefined){
                    console.log(results);
                    //@ts-ignore
                    console.log("La cantidad de aperturas que tuvo la publicación: " + post_id + ": " + results[0].opened_by);
                    return Promise.resolve(results);
                }
                else{
                    return Promise.resolve(null);
                }
            }
        }
        catch(e){
            throw e;
        }
    }
    
}