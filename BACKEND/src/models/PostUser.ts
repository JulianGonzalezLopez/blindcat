import openConnection from "../connection.js"

interface UsersPost{
    id?: number,
    user_id: number,
    post_id: number,
};

async function createNewUsersPosts(usersPost : UsersPost){
    try{
        if(usersPost.user_id == null || usersPost.post_id == null){
            return Promise.reject({"en":"At least one of the inputs is null"});
        }

        let connection = await openConnection()

        if (connection instanceof Error || typeof connection === "undefined"){
            return Promise.reject({"en":"Failed to connect"});
        }
        else{
            await connection.execute("INSERT INTO users_posts(user_id, post_id) VALUES (?,?)",[usersPost.user_id, usersPost.post_id]);    
            connection.end();
            return Promise.resolve({"en":"The usersPost has been created successfully"})
        }
    }
    catch(e){
        console.log(e);
        return e;
    }
}

async function getUsersPosts(){
    try{
        let connection = await openConnection();

        if (connection instanceof Error || typeof connection === "undefined"){
            Promise.reject([]);
        }
        else{
            const [results, fields] = await connection.execute("SELECT * from users_posts");
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

async function getPostUser(post_id: number) {
    try {
        let connection = await openConnection();

        if (connection instanceof Error || typeof connection === "undefined") {
            throw new Error("Failed to connect");
        } else {
            const [results, fields] = await connection.execute("SELECT * from users_posts where post_id = ?", [post_id]);
            connection.end();

            if (Array.isArray(results) && results.length !== 0) {
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

async function getUserPost(usersPost: UsersPost){
    try{
        let connection = await openConnection();

        if (connection instanceof Error || typeof connection === "undefined"){
            Promise.reject([]);
        }
        else{
            const [results, fields] = await connection.execute("SELECT * from users_posts WHERE user_id = ? AND post_id = ? ",[usersPost.user_id, usersPost.post_id]);
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
    getUserPost,
    getUsersPosts,
    getPostUser,
    createNewUsersPosts
}