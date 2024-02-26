import openConnection from "../connection.js"

interface NewUser{
    username: string,
    password: string,
    rePassword: string
};

async function createNewUser(user : NewUser){
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

const NewUser = {
    createNewUser
}

export default NewUser;