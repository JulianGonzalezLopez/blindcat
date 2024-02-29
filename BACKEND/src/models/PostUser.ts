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
            await connection.execute("INSERT INTO users_posts(title, content) VALUES (?,?)",[usersPost.user_id, usersPost.post_id]);    
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
            const [results, fields] = await connection.execute("SELECT * from user_posts");

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

async function getUserPost(usersPost: UsersPost){
    try{
        let connection = await openConnection();

        if (connection instanceof Error || typeof connection === "undefined"){
            Promise.reject([]);
        }
        else{
            const [results, fields] = await connection.execute("SELECT * from user_posts WHERE user_id = ? AND post_id = ? ",[usersPost.user_id, usersPost.post_id]);

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
    createNewUsersPosts
}