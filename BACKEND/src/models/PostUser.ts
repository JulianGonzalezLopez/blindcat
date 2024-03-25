import pool from "../pool.js"

interface UsersPost{
    id?: number,
    user_id: number,
    post_id: number,
};

async function createNewUsersPosts(usersPost : UsersPost){
    console.log("ENTRA?????????????");
    try{
        if(usersPost.user_id == null || usersPost.post_id == null){
            return Promise.reject({"en":"At least one of the inputs is null"});
        }


        if (pool instanceof Error || typeof pool === "undefined"){
            return Promise.reject({"en":"Failed to connect"});
        }
        else{
            console.log("SIGUEEEEEEEEEEE");
            await pool.execute("INSERT INTO users_posts(user_id, post_id) VALUES (?,?)",[usersPost.user_id, usersPost.post_id]);    
            return Promise.resolve({"en":"The usersPost has been created successfully"})
        }
    }
    catch(e){
        console.log("ACÁ SE ROMPIÓ");
        console.log(e);
        return e;
    }
}

async function getUsersPosts(){
    
    try{

        if (pool instanceof Error || typeof pool === "undefined"){
            Promise.reject([]);
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
        console.log(e);
        Promise.reject([]);
    }
}

async function getPostUser(post_id: number) {
    
    try {

        if (pool instanceof Error || typeof pool === "undefined") {
            throw new Error("Failed to connect");
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
        console.error(e);
        throw e; // Re-lanzamos el error para que la función que llama a 'getPostUser' pueda manejarlo
    }
}

async function getPostsUsers(posts_ids: Array<number>) {

    try {
        if (pool instanceof Error || typeof pool === "undefined") {
            throw new Error("Failed to connect");
        

        } else {
            if (!posts_ids){
                throw new Error("NO IDS");
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
        throw e; // Re-lanzamos el error para que la función que llama a 'getPostUser' pueda manejarlo
    }
}


async function getUserPost(usersPost: UsersPost){
    
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

async function createOpenedPost(usersPost : UsersPost){
    console.log("ENTRA?????????????");
    try{
        if(usersPost.user_id == null || usersPost.post_id == null){
            return Promise.reject({"en":"At least one of the inputs is null"});
        }


        if (pool instanceof Error || typeof pool === "undefined"){
            return Promise.reject({"en":"Failed to connect"});
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
        console.log("ACÁ SE ROMPIÓ");
        console.log(e);
        return e;
    }
}


async function getOpenedPostsCount(post_id: number){
    
    try{

        if (pool instanceof Error || typeof pool === "undefined"){
            Promise.reject([]);
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
        console.log(e);
        Promise.reject([]);
    }
}


export default{
    getUserPost,
    getUsersPosts,
    getPostUser,
    createNewUsersPosts,
    getPostsUsers,
    createOpenedPost,
    getOpenedPostsCount
}