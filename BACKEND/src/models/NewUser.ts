import openConnection from "../connection.js"

interface NewUser{
    username: string,
    password: string,
    rePassword: string
};


//QUIERO PASAR TODO A TRY CATCH Y USAR THROWS, FALTA ACTUALIZAR
async function createNewUser(user : NewUser){
    try{
        if(user.password != user.rePassword){
            return Promise.reject({"en":"Passwords does not match"});
        }
        if(user.username == null || user.password == null || user.rePassword == null){
            return Promise.reject({"en":"At least one of the inputs is null"});
        }

        let connection = await openConnection()

        if (connection instanceof Error || typeof connection === "undefined"){
            return Promise.reject({"en":"Failed to connect"});
        }
        else{
            const [results, fields] = await connection.execute("SELECT * FROM users WHERE  username = ?",[user.username]);
            

            if(Array.isArray(results) && results.length !== 0){
                console.log(results);
                console.log("todo mal");
                connection.end();
                return Promise.reject({"en":"This username is already taken"})
            }
            else{
                console.log("todo bien");
                await connection.execute("INSERT INTO users(username, password) VALUES (?,?)",[user.username, user.password]);  
                connection.end();  
                return Promise.resolve({"en":"The user has been created successfully"})
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