import openConnection from "./connection.js";
import NewUser from "../models/NewUser.js";
import User from "../models/user.js";

async function createUser(user : NewUser){
    
    try{
        if(user.password != user.rePassword){
            Promise.reject({"en":"Passwords does not match"});
        }
        if(user.username == null || user.password == null || user.rePassword == null){
            Promise.reject({"en":"At least one of the inputs is null"});
        }

        let connection = await openConnection()

        if (connection instanceof Error || typeof connection === "undefined"){
            Promise.reject({"en":"Failed to connect"});
        }
        else{
            const [results, fields] = await connection.execute("SELECT * FROM users WHERE  username = ?",[user.username]);
            if(Array.isArray(results) && results.length !== 0){
                Promise.reject({"en":"This username is already taken"})
            }
            else{
                await connection.execute("INSERT INTO users(username, password) VALUES (?,?)",[user.username, user.password]);    
                Promise.resolve({"en":"The user has been created successfully"})
            }
        }
    }
    catch(e){
        console.log(e);
    }
}

async function getUsers(){
    try{
        let connection = await openConnection();

        if (connection instanceof Error || typeof connection === "undefined"){
            Promise.reject([]);
        }
        else{
            const [results, fields] = await connection.execute("SELECT username, cantidad_posts, karma FROM users");

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

export default {
    createUser,
    getUsers,
    getUser
};