import  openConnection  from "./connection.js";

interface User{
    username: string,
    password: string,
};

interface NewUser{
    username: string,
    password: string,
    rePassword: string
};

async function createUser(user  : NewUser){
    
    try{

        if(user.password != user.rePassword){
            throw({"en":"Passwords does not match"});
        }

        if(user.username == null || user.password == null || user.rePassword == null){
            throw {"en":"At least one of the inputs is null"}
        }
        let connection = await openConnection()

        if (connection instanceof Error){
            throw connection;
        }
        else if(typeof connection === "undefined"){
            throw {"en":"Failed to open a connection"};
        }
        else{
            const [results, fields] = await connection.execute("SELECT * FROM users WHERE  username = ?",[user.username]);
            if(Array.isArray(results) && results.length !== 0){
                throw {en:"This user already exists"}
            }
            else{
                await connection.execute("INSERT INTO users(username, password) VALUES (?,?)",[user.username, user.password]);    
            }
        }
    }
    catch(e){
        console.log(e);
    }
}

async function getUsers() : Promise<any[]>{
    try{
        let connection = await openConnection();

        if (connection instanceof Error){
            throw connection;
        }
        else if(typeof connection === "undefined"){
            throw {"en":"Failed to open a connection"};
        }
        else{
            const [results, fields] = await connection.execute("SELECT * FROM users");

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
        return Promise.reject([]);
    }
}

async function getUser(user  : User){
    try{
        if(user.username == null){
            console.log("nono");
        }

        let connection = await openConnection();

        if (connection instanceof Error){
            throw connection;
        }
        else if(typeof connection == "undefined"){
            throw "";
        }
        else{
            const [results, fields] = await connection.execute("SELECT * FROM users WHERE  username = ?",[user.username]);
            
            if(Array.isArray(results) && results.length !== 0){
                //DEVOLVER USER
            }
            else{
                //DEVOLVER ERROR
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