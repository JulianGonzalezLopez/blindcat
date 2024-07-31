import pool from "../pool";
import generateID from "../helpers/generateIDHelper";

export default class UserRepository{

    constructor() {

      }

    async getUsersIds(){
            if (pool instanceof Error || typeof pool === "undefined"){
                throw {statusCode: 500, errorMessage:"Falló la conexión con la base de datos"};
            }
            else{
                    const res = await pool.execute("SELECT ID from users");  
                    console.log(res);
                    return Promise.resolve(res);
            }
    } 

    async createNewUser(user : User){
            if (pool instanceof Error || typeof pool === "undefined"){
                throw {statusCode: 500, errorMessage:"Falló la conexión con la base de datos"};
            }
            else{
                let uuid;
                let unique = false;
                while(unique == false){
                    uuid = generateID();    
                    const res = await pool.execute("SELECT * FROM  users WHERE id = (?)",[uuid]);
                    //@ts-ignore
                    if(res[0].length == 0){
                        unique = true;  
                    }                    
                }          
                await pool.execute("INSERT INTO users(id, username, password, cantidad_posts) VALUES (?,?,?,?)",[uuid, user.username, user.password, 0]);  
                    console.log("ACACACACCACACACASDASDASDASDAS");
                    console.log(await pool.execute("SELECT * FROM users"));
                    return Promise.resolve({"en":"The user has been created successfully"})
            }
    }

    

    async getUsers(){
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

    async getUser(username: string){
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

    async getUserById(id: string){
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
    }

    async getUserDataById(id: string){
    
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
    }

    async getUsernamesById(users_ids: Array<string>){

            if (pool instanceof Error || typeof pool === "undefined") {
                throw {statusCode: 500, errorMessage:"Falló la conexión con la base de datos"};
            } else {

                console.log("USE IDS: " );
                console.log(users_ids);

                const uuidsString = users_ids.map(uuid => `'${uuid}'`).join(',');
                console.log("uuidsString");
                console.log(uuidsString);


                const [results, fields] = await pool.execute(`SELECT id, username FROM users WHERE  id IN (${uuidsString})`);
                console.log("Result sql:");
                console.log(results);
                if (Array.isArray(results) && results.length !== 0) {
                    console.log(results);
                    //@ts-ignore
                    return results;
                } else {
                    throw {statusCode: 404, errorMessage:"No existen tales usuarios"};
                }
            }
    }

    async matchData(user: User){
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
}
