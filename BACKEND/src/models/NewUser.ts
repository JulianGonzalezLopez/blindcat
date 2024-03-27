import pool from "../pool.js"

interface NewUser{
    username: string,
    password: string,
    rePassword: string,
    creation_date: Date
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

        if (pool instanceof Error || typeof pool === "undefined"){
            return Promise.reject({"en":"Failed to connect"});
        }
        else{
            const [results, fields] = await pool.execute("SELECT * FROM users WHERE  username = ?",[user.username]);
            console.log("!1!!1!1!11111111");
            console.log(results);

            if(Array.isArray(results) && results.length !== 0){
                console.log(results);
                console.log("todo mal");
                return Promise.reject("Este usuario ya está en uso")
            }
            else{
                console.log("todo bien");

                await pool.execute("INSERT INTO users(username, password, creation_date) VALUES (?,?,?)",[user.username, user.password, user.creation_date]);  
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