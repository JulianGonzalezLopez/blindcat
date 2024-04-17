import pool from "../pool.js";

interface User{
    username: string,
    password?: string,
    cantidad_posts?: number,
    karma?: number,
};

async function getUsers(){
    try{

        if (pool instanceof Error || typeof pool === "undefined"){
            Promise.reject([]);
        }
        else{
            const [results, fields] = await pool.execute("SELECT username, cantidad_posts, karma FROM users");

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
        if (pool instanceof Error || typeof pool === "undefined"){
            Promise.reject({"en":"Failed to connect"});
        }
        else{
            const [results, fields] = await pool.execute("SELECT * FROM users WHERE  username = ?",[username]);
            
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

        if (pool instanceof Error || typeof pool === "undefined") {
            throw new Error("Failed to connect");
        } else {
            const [results, fields] = await pool.execute("SELECT * FROM users WHERE  id = ?", [id]);
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
        return []; // Re-lanzamos el error para que la función que llama a getUserById pueda manejarlo
    }
}

async function getUserDataById(id: number) {

    try {
        if (id == null) {
            throw new Error("You forgot to send an id, silly");
        }

        if (pool instanceof Error || typeof pool === "undefined") {
            throw new Error("Failed to connect");
        } else {
            const [results, fields] = await pool.execute("SELECT * FROM users WHERE  id = ?", [id]);
            console.log("------------------------------");
            //@ts-ignore
            console.log(results[0].username);
            console.log("------------------------------");
            if (Array.isArray(results) && results.length !== 0) {
                //@ts-ignore
                return results[0];
            } else {
                throw new Error("The user does not exist");
            }
        }
    } catch (e) {
        console.error(e);
        return []; // Re-lanzamos el error para que la función que llama a getUserById pueda manejarlo
    }
}


async function getUsernamesById(users_ids: Array<number>) {

    try {
        if (users_ids == null) {
            throw new Error("You forgot to send an id, silly");
        }


        if (pool instanceof Error || typeof pool === "undefined") {
            throw new Error("Failed to connect");
        } else {
            const [results, fields] = await pool.execute(`SELECT id, username FROM users WHERE  id IN (${users_ids})`);
            if (Array.isArray(results) && results.length !== 0) {
                //@ts-ignore
                return results;
            } else {
                throw new Error("The user does not exist");
            }
        }
    } catch (e) {
        console.error(e);
        return []; // Re-lanzamos el error para que la función que llama a getUserById pueda manejarlo
    }
}


async function matchData(user: User){

    try{
        if(user.username == ""){
            throw "No se envió un username";
        }

        if (pool instanceof Error || typeof pool === "undefined"){
            throw "Fallo al conectarse con la DB";
        }
        else{
            const [results, fields] = await pool.execute("SELECT * FROM users WHERE  username = ? AND password = ?",[user.username, user.password]);

            if(Array.isArray(results) && results.length !== 0){
                return {
                    status:true,
                    //@ts-ignore
                    user_id:results[0].id
                };
            }
            else{
                throw "No existe esa combinación (usuario + contraseña)";
            }
        }
    }
    catch(e){
        //antes era return e
        throw e;
    }
}

const User = {
    getUser,
    getUsers,
    matchData,
    getUserById,
    getUsernamesById,
    getUserDataById
}

export default User;