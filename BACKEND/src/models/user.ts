import openConnection from "../connection.js"

interface User{
    username: string,
    password?: string,
    cantidad_posts?: number,
    karma?: number,
};

async function getUsers(){
    try{
        let connection = await openConnection();

        if (connection instanceof Error || typeof connection === "undefined"){
            Promise.reject([]);
        }
        else{
            const [results, fields] = await connection.execute("SELECT username, cantidad_posts, karma FROM users");

            if(Array.isArray(results) && results.length !== 0){
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

async function getUser(username : string){
    try{
        if(username == ""){
            Promise.reject({"en":"You forgot to send an username, silly"});
        }

        let connection = await openConnection();

        if (connection instanceof Error || typeof connection === "undefined"){
            Promise.reject({"en":"Failed to connect"});
        }
        else{
            const [results, fields] = await connection.execute("SELECT * FROM users WHERE  username = ?",[username]);
            
            if(Array.isArray(results) && results.length !== 0){
                Promise.resolve(results);
            }
            else{
                Promise.reject("The user does not exist");
            }
        }
    }
    catch(e){
        console.log(e);
    }
}

async function getUserById(id: number) {
    try {
        if (id == null) {
            throw new Error("You forgot to send an id, silly");
        }

        let connection = await openConnection();

        if (connection instanceof Error || typeof connection === "undefined") {
            throw new Error("Failed to connect");
        } else {
            const [results, fields] = await connection.execute("SELECT * FROM users WHERE  id = ?", [id]);
            console.log("------------------------------");
            //@ts-ignore
            console.log(results[0].username);
            console.log("------------------------------");
            if (Array.isArray(results) && results.length !== 0) {
                //@ts-ignore
                return results[0].username;
            } else {
                throw new Error("The user does not exist");
            }
        }
    } catch (e) {
        console.error(e);
        throw e; // Re-lanzamos el error para que la función que llama a getUserById pueda manejarlo
    }
}

async function matchData(user: User){
    try{
        if(user.username == ""){
            throw {"en":"You forgot to send an username, silly"};
        }

        let connection = await openConnection();

        if (connection instanceof Error || typeof connection === "undefined"){
            throw {"en":"Failed to connect"};
        }
        else{
            const [results, fields] = await connection.execute("SELECT * FROM users WHERE  username = ? AND password = ?",[user.username, user.password]);
            connection.end();

            if(Array.isArray(results) && results.length !== 0){
                return {
                    status:true,
                    //@ts-ignore
                    user_id:results[0].id
                };
            }
            else{
                throw {"en":"That combination does not exist"};
            }
        }
    }
    catch(e){
        throw e;
    }
}

const User = {
    getUser,
    getUsers,
    matchData,
    getUserById
}

export default User;