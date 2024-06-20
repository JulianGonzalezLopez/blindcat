import pool from "../pool";

export default class UserRepository{

    constructor() {

      }

    async getUsersIds(){
        try{
    
            if (pool instanceof Error || typeof pool === "undefined"){
                throw {statusCode: 500, errorMessage:"Falló la conexión con la base de datos"};
            }
            else{
                    let res = await pool.execute("SELECT ID from users");  
                    console.log(res);
                    return Promise.resolve(res);
            }
        }
        catch(e){
            throw e;
        }
    } 

    async createNewUser(user : User){
        console.log("USER A CREAR");
        console.log(user);
        try{
    
            if (pool instanceof Error || typeof pool === "undefined"){
                throw {statusCode: 500, errorMessage:"Falló la conexión con la base de datos"};
            }
            else{
                    await pool.execute("INSERT INTO users(username, password, cantidad_posts) VALUES (?,?,?)",[user.username, user.password, 0]);  
                    console.log("ACACACACCACACACASDASDASDASDAS");
                    console.log(await pool.execute("SELECT * FROM users"));
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
                throw {statusCode: 500, errorMessage:"Falló la conexión con la base de datos"};
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

            if (pool instanceof Error || typeof pool === "undefined"){
                throw {statusCode: 500, errorMessage:"Falló la conexión con la base de datos"};
            }
            else{
                const [results, fields] = await pool.execute("SELECT * FROM users WHERE  username = ?",[username]);
                if (Array.isArray(results) && results.length !== 0) {
                    //@ts-ignore
                    return results;
                } else {
                    throw {statusCode: 404, errorMessage:"No existe tal usuario"};
                }
            }
        }
        catch(e){
            throw e;
        }
    }

    async getUserById(id: number){
        try {
            // if (id == null) {
            //     throw new Error("You forgot to send an id, silly");
            // } //VALIDACION NIVEL CONTROLLER
    
            if (pool instanceof Error || typeof pool === "undefined") {
                throw {statusCode: 500, errorMessage:"Falló la conexión con la base de datos"};
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
                    throw {statusCode: 404, errorMessage:"No existe tal usuario"};
                }
            }
        } catch (e) {
            throw e;
        }
    }

    async getUserDataById(id: number){
        try {
            // if (id == null) {
            //     throw new Error("You forgot to send an id, silly");
            // } //validacion nivel controlador
    
            if (pool instanceof Error || typeof pool === "undefined") {
                throw {statusCode: 500, errorMessage:"Falló la conexión con la base de datos"};
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
            throw e;
        }
    }

    async getUsernamesById(users_ids: Array<number>){
        try {
            // if (users_ids == null) {
            //     throw new Error("You forgot to send an id, silly");
            // } //validacion nivel controlador  
            if (pool instanceof Error || typeof pool === "undefined") {
                throw {statusCode: 500, errorMessage:"Falló la conexión con la base de datos"};
            } else {
                const [results, fields] = await pool.execute(`SELECT id, username FROM users WHERE  id IN (${users_ids})`);
                if (Array.isArray(results) && results.length !== 0) {
                    //@ts-ignore
                    return results;
                } else {
                    throw {statusCode: 404, errorMessage:"No existen tales usuarios"};
                }
            }
        } catch (e) {
            throw e;
        }
    }

    async matchData(user: User){
        try{
            if(user.username == ""){
                throw "No se envió un username";
            }
    
            if (pool instanceof Error || typeof pool === "undefined"){
                throw {statusCode: 500, errorMessage:"Falló la conexión con la base de datos"};
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
                    //TENGO QUE DIVIDIRLO EN MUCHOS ERRORES!!!!!!!!!!!
                    throw {statusCode: 404, errorMessage:"No existe esa combinacion de usuario y contraseña"};
                }
            }
        }
        catch(e){
            throw e;
        } 
    }
}
