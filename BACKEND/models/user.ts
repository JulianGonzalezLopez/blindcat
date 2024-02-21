import  openConnection  from "./connection.ts";

async function createUser(user){
    
    try{
        if(user.newUsername == null || user.newPassword == null || user.reNewPassword == null){
            throw {"en":"At least one of the inputs is null"}
        }
        let connection = await openConnection()

        if (connection instanceof Error){
            throw connection;
        }
        else{
            const [results, fields] = await connection.execute("SELECT * FROM users WHERE  username = ?",[user.newUsername]);
            if(results.length > 0){
                throw {en:"This user already exists"}
            }
            else{
                await connection.execute("INSERT INTO users(username, password) VALUES (?,?)",[user.newUsername, user.newPassword]);    
            }
        }
    }
    catch(e){
        console.log(e);
    }
}

async function getUsers(user){
    try{
        if(user.newUsername == null){
            console.log("nono");
        }
        let connection = await openConnection();
        const results = await connection.execute("SELECT * FROM users WHERE  username = ?",[user.newUsername]);
        console.log(results);
    }
    catch(e){
        console.log(e);
    }
}

async function getUser(user){
    try{
        if(user.newUsername == null){
            console.log("nono");
        }
        let connection = await openConnection();
        const [results, fields]  = await connection.execute("SELECT * FROM users WHERE  username = ? AND password = ?",[user.username, user.password]);
        console.log(results);
        if(results.length < 1){
            throw {en:"The user does not exists or the password is wrong"}
        }
        else{
            return true;
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