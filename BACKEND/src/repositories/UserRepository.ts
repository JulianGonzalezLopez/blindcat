import pool from "../pool.js";

export default class UserRepository{

    constructor() {

      }

    async createNewUser(user : User){

        try{
    
            if (pool instanceof Error || typeof pool === "undefined"){
                return Promise.reject({"en":"Failed to connect"});
            }
            else{
                    await pool.execute("INSERT INTO users(username, password, creation_date) VALUES (?,?,?)",[user.username, user.password, user.creation_date]);  
                    return Promise.resolve({"en":"The user has been created successfully"})
            }
        }
        catch(e){
            throw e;
        }
    }

    

    async getUsers(){
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
            throw e;
        }
    }

    async getUser(username: string){
        try{
            if(username == ""){
                Promise.reject({"en":"You forgot to send an username, silly"});
            }
    
            if (pool instanceof Error || typeof pool === "undefined"){
                Promise.reject({"en":"Failed to connect"});
            }
            else{
                const [results, fields] = await pool.execute("SELECT * FROM users WHERE  username = ?",[username]);
                return results
            }
        }
        catch(e){
            console.log(e);
        }
    }

    async getUserById(id: number){
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

    async getUserDataById(id: number){
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

    async getUsernamesById(users_ids: Array<number>){
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

    async matchData(user: User){
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
}
